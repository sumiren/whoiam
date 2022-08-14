// MIT License
//
// Copyright (c) 2021 Ivan Galiatin
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
import { Mutable, PartialDeep } from "type-fest";

class MockedIntersectionObserver implements IntersectionObserver {
  nodes: HTMLElement[] = [];
  nodeStates: IntersectionObserverEntry[] = [];
  callback: IntersectionObserverCallback;
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px 0px 0px 0px";
  readonly thresholds: ReadonlyArray<number> = [0];
  timeOrigin = 0;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit | undefined
  ) {
    this.callback = callback;

    if (options) {
      if (typeof options.root !== "undefined") {
        this.root = options.root;
      }

      if (typeof options.rootMargin !== "undefined") {
        this.rootMargin = options.rootMargin;
      }

      if (typeof options.threshold !== "undefined") {
        this.thresholds = Array.isArray(options.threshold)
          ? options.threshold
          : [options.threshold];
      }
    }

    this.timeOrigin = performance.now();

    state.observers.push(this);
  }

  observe(node: HTMLElement) {
    this.nodes.push(node);
    this.nodeStates.push({
      isIntersecting: false,
      target: node,
      time: performance.now() - this.timeOrigin,
      rootBounds: new DOMRectReadOnly(),
      intersectionRect: new DOMRectReadOnly(),
      intersectionRatio: 0,
      boundingClientRect: new DOMRectReadOnly(),
    });
  }

  unobserve(node: HTMLElement) {
    const index = this.nodes.findIndex((value) => value.isSameNode(node));

    this.nodes.splice(index, 1);
    this.nodeStates.splice(index, 1);
  }

  disconnect() {
    this.nodes = [];
    this.nodeStates = [];
  }

  triggerNode(node: HTMLElement, desc: IntersectionDescription) {
    const index = findNodeIndex(this.nodes, node);
    const nodeState = this.nodeStates[index];

    this.nodeStates[index] = {
      ...nodeState,
      time: performance.now() - this.timeOrigin,
      ...desc,
    } as IntersectionObserverEntry;

    this.callback([this.nodeStates[index]], this);
  }

  triggerNodes(nodeDescriptions: NodeIntersectionDescription[]) {
    const nodeIndexes = nodeDescriptions.map(({ node }) =>
      findNodeIndex(this.nodes, node)
    );

    const nodeStates = nodeDescriptions.map(({ desc }, index) => {
      const newState = {
        ...this.nodeStates[nodeIndexes[index]],
        time: performance.now() - this.timeOrigin,
        ...desc,
      } as IntersectionObserverEntry;

      this.nodeStates[nodeIndexes[index]] = newState;

      return newState;
    });

    this.callback(nodeStates, this);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

export function mockIntersectionObserver() {
  const savedImplementation = window.IntersectionObserver;

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockedIntersectionObserver,
  });

  // afterAll(() => {
  //   window.IntersectionObserver = savedImplementation;
  // });

  return {
    enterAll: (desc?: IntersectionDescription) => {
      state.observers.forEach((observer) => {
        const nodeDescriptions = observer.nodes.map((node) => ({
          node,
          desc: {
            intersectionRatio: 1,
            ...desc,
            isIntersecting: true,
          },
        }));

        observer.triggerNodes(nodeDescriptions);
      });
    },
    enterNode: (node: HTMLElement, desc?: IntersectionDescription) => {
      const observers = getObserversByNode(node);

      observers.forEach((observer) => {
        observer.triggerNode(node, {
          intersectionRatio: 1,
          ...desc,
          isIntersecting: true,
        });
      });
    },
    enterNodes: (
      nodeDescriptions: (NodeIntersectionDescription | HTMLElement)[]
    ) => {
      const normalizedNodeDescriptions =
        normalizeNodeDescriptions(nodeDescriptions);
      const observerNodes = getNodeDescriptionsByObserver(
        normalizedNodeDescriptions
      );

      observerNodes.forEach(({ observer, nodeDescriptions }) => {
        observer.triggerNodes(
          nodeDescriptions.map(({ node, desc }) => ({
            node,
            desc: { intersectionRatio: 1, ...desc, isIntersecting: true },
          }))
        );
      });
    },
    leaveAll: (desc?: IntersectionDescription) => {
      state.observers.forEach((observer) => {
        const nodeDescriptions = observer.nodes.map((node) => ({
          node,
          desc: {
            intersectionRatio: 0,
            ...desc,
            isIntersecting: false,
          },
        }));

        observer.triggerNodes(nodeDescriptions);
      });
    },
    leaveNode: (node: HTMLElement, desc?: IntersectionDescription) => {
      const observers = getObserversByNode(node);

      observers.forEach((observer) => {
        observer.triggerNode(node, {
          intersectionRatio: 0,
          ...desc,
          isIntersecting: false,
        });
      });
    },
    triggerNodes: (
      nodeDescriptions: (NodeIntersectionDescription | HTMLElement)[]
    ) => {
      const normalizedNodeDescriptions =
        normalizeNodeDescriptions(nodeDescriptions);

      const observerNodes = getNodeDescriptionsByObserver(
        normalizedNodeDescriptions
      );

      observerNodes.forEach(({ observer, nodeDescriptions }) => {
        observer.triggerNodes(nodeDescriptions);
      });
    },
    leaveNodes: (
      nodeDescriptions: (NodeIntersectionDescription | HTMLElement)[]
    ) => {
      const normalizedNodeDescriptions =
        normalizeNodeDescriptions(nodeDescriptions);

      const observerNodes = getNodeDescriptionsByObserver(
        normalizedNodeDescriptions
      );

      observerNodes.forEach(({ observer, nodeDescriptions }) => {
        observer.triggerNodes(
          nodeDescriptions.map(({ node, desc }) => ({
            node,
            desc: { intersectionRatio: 0, ...desc, isIntersecting: false },
          }))
        );
      });
    },
    cleanup: () => {
      window.IntersectionObserver = savedImplementation;

      state.observers = [];
    },
  };
}

type State = {
  observers: MockedIntersectionObserver[];
};

const defaultState: State = {
  observers: [],
};

const state = { ...defaultState };

function findNodeIndex(nodes: HTMLElement[], node: HTMLElement) {
  const index = nodes.findIndex((nodeInArray) => node.isSameNode(nodeInArray));

  if (index === -1) {
    throw new Error("IntersectionObserver mock: node not found");
  }

  return index;
}

function getNodeDescriptionsByObserver(
  nodeDescriptions: NodeIntersectionDescription[]
) {
  const observerNodes: {
    observer: MockedIntersectionObserver;
    nodeDescriptions: NodeIntersectionDescription[];
  }[] = [];

  nodeDescriptions.forEach(({ node, desc }) => {
    const observers = getObserversByNode(node);

    observers.forEach((observer) => {
      const observerNode = observerNodes.find(
        ({ observer: obs }) => obs === observer
      );

      if (observerNode) {
        observerNode.nodeDescriptions.push({ node, desc });
      } else {
        observerNodes.push({
          observer,
          nodeDescriptions: [{ node, desc }],
        });
      }
    });
  });

  return observerNodes;
}

export type NodeIntersectionDescription = {
  node: HTMLElement;
  desc?: IntersectionDescription;
};

export type IntersectionDescription = Omit<
  PartialDeep<Mutable<IntersectionObserverEntry>>,
  "target"
> & {
  target?: Element;
};

function getObserversByNode(node: HTMLElement) {
  return state.observers.filter((observer) => observer.nodes.includes(node));
}

function normalizeNodeDescriptions(
  nodeDescriptions: (NodeIntersectionDescription | HTMLElement)[]
): NodeIntersectionDescription[] {
  return nodeDescriptions.map((nodeDesc) => {
    if (isElement(nodeDesc)) {
      return { node: nodeDesc };
    }

    return nodeDesc;
  });
}

function isElement(tested: unknown): tested is HTMLElement {
  return typeof HTMLElement === "object"
    ? tested instanceof HTMLElement // DOM2
    : Boolean(tested) &&
        typeof tested === "object" &&
        tested !== null &&
        (tested as HTMLElement).nodeType === 1 &&
        typeof (tested as HTMLElement).nodeName === "string";
}

class MockedDOMRectReadOnly implements DOMRectReadOnly {
  readonly bottom: number = 0;
  readonly height: number = 0;
  readonly left: number = 0;
  readonly right: number = 0;
  readonly top: number = 0;
  readonly width: number = 0;
  readonly x: number = 0;
  readonly y: number = 0;

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toJSON() {
    return {
      bottom: this.bottom,
      height: this.height,
      left: this.left,
      right: this.right,
      top: this.top,
      width: this.width,
      x: this.x,
      y: this.y,
    };
  }
}

if (typeof DOMRectReadOnly === "undefined") {
  Object.defineProperty(window, "DOMRectReadOnly", {
    writable: true,
    configurable: true,
    value: MockedDOMRectReadOnly,
  });
}

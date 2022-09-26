import { gql, GraphQLClient } from "graphql-request";

export const fetchRepositories: () => Promise<
  GitHubRepository[]
> = async () => {
  const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      authorization: "Bearer " + process.env.GITHUB_ACCESS_TOKEN,
    },
  });
  const query = gql`
    query {
      search(type: REPOSITORY, query: "user:Sumiren is:public", last: 100) {
        repositoryCount
        nodes {
          ... on Repository {
            id
            url
            name
            description
            createdAt
            stargazerCount
            forkCount
            languages(first: 100) {
              totalSize
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await graphQLClient.request<GitHubAPIResponse>(query);
  return result.search.nodes.map((node) => ({
    name: node.name,
    description: node.description,
    forks: node.forkCount,
    stars: node.stargazerCount,
    techRatio: calculateTechRatio(node.languages),
  }));
};

const calculateTechRatio = ({
  totalSize,
  edges,
}: GitHubRepositoryLanguagesRecords) => {
  if (!edges) {
    return [];
  }
  const techRatio = edges
    .map((lang, index) => {
      const isLast = index + 1 === edges.length;
      return {
        tech: lang.node.name,
        color: lang.node.color,
        // 最後の要素は100からそれ以外の合計割合を引く
        percentage: isLast
          ? 100 -
            edges
              .slice(0, edges.length - 1)
              .map((l) => Math.floor((l.size / totalSize) * 100))
              .reduce((a, b) => a + b, 0)
          : Math.floor((lang.size / totalSize) * 100),
      };
    })
    .filter((pie) => pie.percentage !== 0);

  if (techRatio.length < 4) {
    return techRatio;
  }

  // 4つ以上要素がある場合、3つ目以降はサマリしてotherとする
  return [
    ...techRatio.slice(0, 2),
    {
      tech: "other",
      color: "#555",
      percentage: techRatio
        .slice(2)
        .map((pie) => pie.percentage)
        .reduce((a, b) => a + b, 0),
    },
  ];
};

type GitHubAPIResponse = {
  search: {
    nodes: GitHubRepositoryRecord[];
  };
};

type GitHubRepositoryRecord = {
  id: string;
  name: string;
  description: string;
  forkCount: number;
  stargazerCount: number;
  languages: GitHubRepositoryLanguagesRecords;
};

type GitHubRepositoryLanguagesRecords = {
  totalSize: number;
  edges: {
    size: number;
    node: {
      name: string;
      color: string;
    };
  }[];
};

export interface GitHubRepository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  techRatio: TechPie[];
}

export interface TechPie {
  tech: string;
  percentage: number;
  color: string;
}

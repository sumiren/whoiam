import { Portfolio } from "../types/portfolio";

export const dummyPortfolios: Portfolio[] = [...Array(7)].map((_) => ({
  thumbnailUrl: "/portfolio-thumbnail.png",
  title: "sumiren ブログ",
  description:
    "技術ブログをやっています。フルスタックエンジニアの浅く広めの技術発信が中心です。月に4本くらい発信します",
  period: "2022.05 -",
}));

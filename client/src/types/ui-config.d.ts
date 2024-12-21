declare interface ConfigBlockData {
  _id: string;
  name: string;
  tags: string[];
  active: boolean;
  count: number;
}

interface QuadBlockConfig {
  enabled: boolean;
  layout: QuadBlockLayout;
  articles: Article[];
}

declare type QuadBlockLayout = "quad-list" | "quad-grid" | "carousel" | "grid";

declare interface DynamicPageConfig {
  _id: string;
  name: string;
  tags: string[];
  layout: string;
  active: boolean;
  count: number;
  heroConfig: QuadBlockConfig;
}

declare interface DashConfig {
  nav: DynamicPageConfig[];
  carouselItems: Article[];
  tracks: ConfigBlockData[];
}

declare type IconProps = {
  size: number;
  color?: string;
};
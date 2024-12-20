declare interface ConfigBlockData {
  _id: string
  name: string;
  tags: string[];
  active:boolean;
  count: number;
}

declare interface DynamicPageConfig {
  _id: string;
  name: string;
  tags: string[];
  layout: string;
  active: boolean;
  count: number;
}

declare interface DashConfig {  
  nav: DynamicPageConfig[];
  carouselItems: Article[];
  tracks: ConfigBlockData[];
}
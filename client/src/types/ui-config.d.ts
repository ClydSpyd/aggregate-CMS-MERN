declare interface ConfigBlockData {
  _id: string
  name: string;
  tags: string[];
  active:boolean;
  count: number;
}

declare interface NavItemConfig {
  _id: string;
  name: string;
  tags: string[];
  layout: string;
  active: boolean;
  count: number;
}

declare interface DashConfig {  
  nav: NavItemConfig[];
  carouselItems: Article[];
  tracks: ConfigBlockData[];
}
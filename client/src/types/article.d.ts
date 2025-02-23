declare type ArticleType = "standard" | "list" | "slides";
declare interface RssSource {
  name: string;
  url: string;
  imgUrl: string;
  jsonResponse?: boolean;
}

declare interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  "media:content"?: { $: { url: string } }[];
  "media:thumbnail"?: { $: { url: string } }[];
  "content:encoded"?: string[];
}

declare interface JsonItem {
  title: string;
  content_text: string;
  url: string;
  image: string;
}

declare interface FeedItem {
  id: string;
  name: string;
  url: string;
  imgUrl: string;
  articleSrc: "RSS" | "custom";
}

interface ListItemData {
  imgUrl: string;
  title: string;
  textContent: string;
}

interface SlideItem {
  type: 'image' | 'video';
  title: string;
  textContent: string;
  src: string;
}

declare interface Article {
  _id: string;
  type: ArticleType;
  title: string;
  caption: string;
  content: string;
  imgUrl: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  rawContent: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  highlight: string[];
  listItems?: ListItem[];
  slideItems?: SlideItem[];
  author: {
    _id:string;
    username: string;
    avatarUrl: string;
  };
}

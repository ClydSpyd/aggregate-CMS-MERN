export interface ArticleDrawerProps {
  articleData: Article;
}

export interface ArticleViewProps {
  articleData: Article;
  setArticleData: React.Dispatch<React.SetStateAction<Article>>;
}

export interface EditData {
  title: boolean;
  caption: boolean;
  content: boolean;
}

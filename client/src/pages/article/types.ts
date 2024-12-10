export interface ArticleDrawerProps {
  articleData: Article;
  handleTags: (value: string[]) => void;
}

export interface ArticleViewProps {
    articleData: Article;
    setArticleData: React.Dispatch<React.SetStateAction<Article>>;
};
export interface ArticleDrawerProps {
  articleData: Article;
  titleRef: React.RefObject<HTMLInputElement>;
  captionRef: React.RefObject<HTMLInputElement>;
  handleInputChange: (value: string, key: keyof Article) => void;
  handleTags: (value: string[]) => void;
}

export interface ArticlePreviewProps {
    articleData: Article;
    focusTitle: () => void;
    focusCaption: () => void;
};
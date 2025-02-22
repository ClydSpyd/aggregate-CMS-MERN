import { LocalFields } from "./types";

export function hasEmptyFields(fields: LocalFields): boolean {
  return (
    !fields.title.trim() ||
    !fields.caption.trim() ||
    fields.tags.length === 0 ||
    !fields.sourceUrl.trim() ||
    !fields.imgUrl.trim()
  );
}

export const buildArticlePayload = (fields: Partial<Article>): Article =>
  ({
    title: "",
    type: "standard",
    caption: "",
    content: "",
    imgUrl:
      "https://aggregate-imgs.s3.eu-north-1.amazonaws.com/uploads/logo_white_bg.png",
    tags: [],
    source: "cms",
    sourceUrl: "",
    rawContent: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: false,
    ...fields,
  } as Article);

export const isPublishable = (article: Partial<Article>): boolean => {
  console.log({ article });
  const requiredKeys: Array<keyof Article> = ["title", "caption", "imgUrl", "createdAt"];
  const textFieldsCompleted = requiredKeys.every(
    (key) => !!article[key]?.toString().length
  );
  const hasContent = !!article.content?.replaceAll("<p><br></p>", "").trim();
  return textFieldsCompleted && hasContent && !!article.tags?.length;
};

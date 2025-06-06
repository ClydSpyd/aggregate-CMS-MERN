/* eslint-disable react-hooks/exhaustive-deps */
import { useQueue } from "../../../contexts/queue-context";
import { useEffect, useState } from "react";
import { LocalFields, defaultValues } from "../types";
import API from "../../../api";
import { hasEmptyFields } from "../helpers";
import { useAuth } from "../../../contexts/auth-context";

export default function useCreate() {
  const { queuedItems = [], removeItemFromQueue, updateQueueItem } = useQueue();
  const { user } = useAuth();
  const [submitData, setSubmitData] = useState<{
    msg: string | null;
    error: boolean;
  }>({ msg: null, error: false });
  const [confirmSaved, setConfirmSaved] = useState<boolean>(false);
  const [formFilled, setFormFilled] = useState<boolean>(false);
  const [localFields, setLocalFields] = useState<LocalFields>(defaultValues);
  const [selectedArticle, setSelectedArticle] = useState<FeedItem | null>(
    queuedItems[0]
  );

  useEffect(() => {
    setLocalFields({
      title: selectedArticle?.name ?? "",
      caption: "",
      tags: [],
      sourceUrl: selectedArticle?.url ?? "",
      imgUrl: selectedArticle?.imgUrl ?? "",
    });
    console.log({selectedArticle});
  }, [selectedArticle]);

  useEffect(() => {
    setFormFilled(!hasEmptyFields(localFields));
    console.log({localFields});
  }, [localFields]);

  useEffect(() => {
    if (!queuedItems.find((item) => item.id === selectedArticle?.id)) {
      setSelectedArticle(queuedItems[0]);
    }
  }, [queuedItems]);

  const saveCallback = async (raw: string, html: string) => {
    const payload: Partial<Article> = {
      ...localFields,
      source: "web",
      content: html,
      rawContent: raw,
      type: "standard",
    };
    console.log({payload});
    const { data, error } = await API.article.createArticle(
      payload,
      user?._id ?? ""
    );
    if (data) {
      setConfirmSaved(true);
    } else if (error) {
      setSubmitData({ msg: "failed to save article", error: true });
    }
  };

  const handleImage = (imgUrl:string) => {
    updateQueueItem(selectedArticle!.id, { imgUrl })
    setLocalFields((prev: LocalFields) => ({
      ...prev,
      imgUrl,
    }));
  }

  const handleDismiss = () => {
    setSelectedArticle(null);
    setLocalFields(defaultValues);
    removeItemFromQueue(selectedArticle?.id ?? "");
    setTimeout(() => {
      const next: FeedItem = queuedItems.filter((item) => item.id !== selectedArticle?.id)[0];
      setSelectedArticle(next);
      setConfirmSaved(false);
    }, 200);
  };

  const handleInputChange = (value: string, key: keyof typeof localFields) => {
    setLocalFields((prev: LocalFields) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTags = (tags: string[]) => {
    setLocalFields((prev: LocalFields) => ({
      ...prev,
      tags,
    }));
  };

  return {
    submitData,
    confirmSaved,
    formFilled,
    setFormFilled,
    saveCallback,
    handleDismiss,
    handleInputChange,
    handleTags,
    selectedArticle,
    setSelectedArticle,
    localFields,
    setLocalFields,
    handleImage,
  };
}

import { MdAddBox } from "react-icons/md";
import { useDashboard } from "../../../../../contexts/dash-contenxt";
import { useState } from "react";
import AddarticleModal from "./add-article-modal";
import ArticleCard from "../../../../../components/article-card";
import API from "../../../../../api";

export default function CarouselConfig() {
  const [modalOpen, setModalOpen] = useState(false);
  const { config, setConfig } = useDashboard();

  const handleDelete = async (articleId: string) => {
    const { data, error } = await API.config.removeCarouselItem(articleId);
    if (data && config) {
      setConfig({
        ...config,
        carouselItems: data,
      });
    } else if (error) {
      console.error(`Error deleting carousel item:`, error);
    }
  };

  return (
    <>
      <div className="w-full rounded-lg bg-slate-100/50 border shadow-md p-4 py-3 flex flex-col gap-3">
        <div className="flex w-full items-center gap-4">
          <p className="text-indigo-500 font-semibold">
            Primary Carousel Items
          </p>
        </div>
        <div className="w-full flex gap-4 flex-wrap items-stretch">
          {config?.carouselItems?.map((item, index) => (
            <ArticleCard
              item={item}
              key={item._id}
              handleDelete={() => handleDelete(item._id)}
            />
          ))}
          <div
            onClick={() => setModalOpen(true)}
            className="min-h-[180px] cursor-pointer flex flex-col items-center justify-center w-[23%] text-center gap-2 rounded-lg p-2 pb-4 border-2 border-indigo-500 text-indigo-500 shadow-sm transition-all duration-300 ease-out hover:bg-indigo-100/50"
          >
            <MdAddBox size={40} />
            <h1 className="font-semibold">ADD ITEM</h1>
          </div>
        </div>
      </div>
      <AddarticleModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

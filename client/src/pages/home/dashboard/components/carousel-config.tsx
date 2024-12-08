import { useState } from "react";
import { dummyHighlights } from "../dummy-data";
import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";


export default function CarouselConfig() {
  const [items] = useState<Article[]>(dummyHighlights);

  return (
    <div className="w-full rounded-lg bg-slate-100/50 border shadow-md p-4 py-3 flex flex-col gap-3">
      <div className="flex w-full items-center gap-4">
        <p className="text-indigo-500 font-semibold">Primary carousel items</p>
      </div>
      <div className="w-full flex gap-4 flex-wrap">
        {items.map((item, index) => (
          <Link
            to={`/article/${item._id}`}
            key={index}
            className="flex flex-col w-[32%] items-center text-center gap-2 rounded-lg p-2 pb-4 transition-all duration-300 ease-out bg-white border shadow-sm hover:border-indigo-500 hover:shadow-sm"
          >
            <img
              src={item.imgUrl}
              alt={item.title}
              className="w-full h-[150px] object-cover rounded-lg"
            />
            <p className="text-sm font-semibold text-indigo-500">
              {item.title}
            </p>
          </Link>
        ))}
        <div className="cursor-pointer flex flex-col items-center justify-center w-[32%] text-center gap-2 rounded-lg p-2 pb-4 border-2 border-indigo-500 text-indigo-500 shadow-sm">
          <MdAddBox size={40} />
          <h1 className="font-semibold">ADD ITEM</h1>
        </div>
      </div>
    </div>
  );
}

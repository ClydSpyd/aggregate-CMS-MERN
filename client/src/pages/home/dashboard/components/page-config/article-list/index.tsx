import ModuleTitle from "../../../../../../components/utility-comps/module-title";
import { usePageConfig } from "../../../../../../contexts/page-config-context";
import CarouselConfigBlock from "../../carousel-config/carousel-config-block";

export default function ArticleList() {
    const {articles} = usePageConfig();
    return (
      <div className="w-full flex flex-col gap-2 border rounded-lg p-2">
        <ModuleTitle title={"Articles"} />
        <div className="w-full flex gap-4 flex-wrap items-stretch">
          {articles.map((item) => (
            <CarouselConfigBlock item={item} key={item._id} />
          ))}
        </div>
      </div>
    );
}
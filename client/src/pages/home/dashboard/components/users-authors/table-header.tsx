export default function TableHeader() {
  return (
    <section className="bg-gray-100 border-b">
      <div className="w-full flex justify-evenly">
        <div className="w-[120px] px-4 py-2 text-left font-medium text-gray-600"></div>
        <div className="flex grow">
          <div className="flex justify-center w-1/3 grow px-4 py-2 font-medium text-gray-600">
            name
          </div>
          <div className="flex justify-center w-1/3 grow px-4 py-2 font-medium text-gray-600">
            location
          </div>
          <div className="flex justify-center items-center w-1/3  font-medium text-gray-600">
            articles
          </div>
        </div>
        <div className="h-full w-[50px] flex items-center justify-center" />
      </div>
    </section>
  );
}

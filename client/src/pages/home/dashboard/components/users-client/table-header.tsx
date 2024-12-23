export default function TableHeader() {
  return (
    <section className="bg-gray-100 border-b">
      <div className="w-full flex justify-evenly">
        <div className="w-[80px] px-4 py-2 text-left font-medium text-gray-600"></div>
        <div className="flex justify-center w-1/6 grow px-4 py-2 font-medium text-gray-600">
          username
        </div>
        <div className="flex justify-center w-1/5 grow px-4 py-2 font-medium text-gray-600">
          email
        </div>
        <div className="w-[120px] flex items-center justify-center px-4 py-2 font-medium text-gray-600">
          user since
        </div>
        <div className="w-[120px] flex items-center justify-center px-4 py-2 font-medium text-gray-600">
          last login
        </div>
        <div className="h-full bg-red-500 w-[50px] border flex items-center justify-center" />
      </div>
    </section>
  );
}

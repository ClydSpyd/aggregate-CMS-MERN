// import { Link } from "react-router";
import { useAuth } from "../../contexts/auth-context";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-2xl font-semibold text-indigo-500">
        Welcome, {user?.username}
      </h2>
      <h4 className="px-4 py-2 rounded-[20px] border-2 border-indigo-500 bg-indigo-500 text-white">
        DASHBOARD COMING SOON
      </h4>
      {/* <Link to="/discover">
        <button className="w-[170px] h-[45px] border rounded-md font-semibold hover:text-white hover:bg-indigo-500 transition-all duration-200">
          discover
        </button>
      </Link>
      <Link to="/create">
        <button className="w-[170px] h-[45px] border rounded-md font-semibold hover:text-white hover:bg-indigo-500 transition-all duration-200">
          create
        </button>
      </Link>
      <Link to="/browse">
        <button className="w-[170px] h-[45px] border rounded-md font-semibold hover:text-white hover:bg-indigo-500 transition-all duration-200">
          browse
        </button>
      </Link> */}
    </div>
  );
}

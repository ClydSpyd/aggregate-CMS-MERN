// import Image from "next/image";
import { useAuth } from "../../contexts/auth-context";
import { MdExitToApp } from "react-icons/md";
import { Link, NavLink } from "react-router";

const NavItem = ({ text, route }: { text: string; route: string }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-indigo-600"
          : "border-b border-b-transparent hover:border-b-indigo-700"
      }
      to={route}
    >
      {text}
    </NavLink>
  );
};

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    user && (
      <div className="w-screen h-[60px] bg-white border-b flex items-center justify-between p-4 relative">
        <Link to="/">
          <img
            height={50}
            width={200}
            src={`/images/logo-mk2.jpeg`}
            alt="logo"
          />
        </Link>
        <div className="flex gap-8 absolute-center text-base font-[500]">
          <NavItem text="Dashboard" route="/" />
          <NavItem text="Discover" route="/discover" />
          <NavItem text="Create" route="/create" />
          <NavItem text="Browse" route="/browse" />
        </div>
        <div
          onClick={logout}
          className="flex items-center p-1 rounded-md cursor-pointer border border-transparent hover:border-indigo-500 transition-colors duration-200 ease-out"
        >
          <MdExitToApp className="text-2xl text-indigo-600" />
        </div>
      </div>
    )
  );
}

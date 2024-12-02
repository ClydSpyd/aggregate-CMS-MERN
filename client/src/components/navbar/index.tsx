// import Image from "next/image";
import { cn } from "../../lib/utilities";

const NavItem = ({ text, route }: { text: string; route: string }) => {
  const pathname = window?.location.pathname;
  const isActive = pathname === route;
  return (
    <a
      className={cn(
        isActive ? "text-indigo-600 font-semibold" : "hover:border-b border-b-indigo-700"
      )}
      href={route}
    >
      {text}
    </a>
  );
};

export default function Navbar() {
  return (
    <div className="w-screen h-[60px] bg-white border-b flex items-center justify-between p-4">
      <a href="/">
        <img
          height={50}
          width={200}
          src={`/images/logo-mk2.jpeg`}
          alt="logo"
        />
      </a>
      <div className="flex gap-4">
        <NavItem text="Discover" route="/discover" />
        <NavItem text="Create" route="/create" />
        <NavItem text="Browse" route="/browse" />
      </div>
    </div>
  );
}

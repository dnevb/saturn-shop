import { Icon } from "@iconify/react";
import clsx from "clsx";
import { T } from "components";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "states/auth";

const items = [
  {
    title: "Products",
    icon: "fluent:library-16-filled",
    to: "/admin/products",
  },
  {
    title: "Categories",
    icon: "fluent:folder-16-filled",
    to: "/admin/categories",
  },
  {
    title: "Orders",
    icon: "fluent:cart-16-filled",
    to: "/admin/orders",
  },
  {
    title: "Customers",
    icon: "fluent:people-community-16-filled",
    to: "/admin/customers",
  },
];

const AdminSidebar = () => {
  const { user } = useRecoilValue(authState)!;

  return (
    <aside className="w64 hfull">
      <div className={clsx(styles.root)}>
        <div className="flex items-center gap2 p4 bg-gray-600 rounded-xl">
          <div
            className={clsx(
              "h12 w12 rounded-full bg-gray-200",
              "flex items-center justify-center p1"
            )}
          >
            <Icon
              icon="fluent:person-16-filled"
              className="hfull wfull text-gray-400"
            />
          </div>
          <div className="truncate">
            <T className="text-white! text-lg">
              {[user["first_name"], user["last_name"]].join(" ")}
            </T>
            <T>{user["email"]}</T>
          </div>
        </div>
        <ul className="space-y-2 grow overflow-y-auto">
          {items.map((item) => (
            <NavLink to={item.to} key={item.to}>
              {({ isActive }) => (
                <li
                  className={clsx(styles.item, isActive && styles.active)}
                >
                  <Icon className={clsx(styles.icon)} icon={item.icon} />
                  {item.title}
                </li>
              )}
            </NavLink>
          ))}
        </ul>
        <NavLink to="/logout" className={clsx(styles.logout)}>
          <Icon icon="fluent:arrow-exit-20-filled" className="h10 w10" />
          Log out
        </NavLink>
      </div>
    </aside>
  );
};

const styles = {
  root: [
    "overflow-y-auto py-5 px-3 h-full",
    "bg-gray-700 border-r border-gray-200",
    "flex flex-col gap8",
  ],
  item: [
    "flex items-center gap2 p-2 text-base font-normal my-2",
    "rounded-lg text-white hover:bg-gray-600 group cursor-pointer select-none",
  ],
  icon: "h6 w6 text-gray-400 group-hover:text-white group-[.active]:text-brand-lighter",
  active: "active bg-gray-600",
  logout: [
    "flex text-red-400 bg-gray-600",
    "rounded-xl items-center gap2 font-bold p2",
  ],
};

export default AdminSidebar;

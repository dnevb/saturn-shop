import { FC } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

const AdminLayout: FC<any> = (props) => (
  <div className="hscreen flex flex-col">
    <AdminHeader />
    <div className="grow flex">
      <AdminSidebar />
      <main>{props.children}</main>
    </div>
  </div>
);

export default AdminLayout;

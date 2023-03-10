import { FC } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

const AdminLayout: FC<any> = (props) => (
  <div className="hscreen flex flex-col font-sans">
    <AdminHeader />
    <div className="grow flex overflow-hidden">
      <AdminSidebar />
      <main className="grow overflow-y-auto">{props.children}</main>
    </div>
  </div>
);

export default AdminLayout;

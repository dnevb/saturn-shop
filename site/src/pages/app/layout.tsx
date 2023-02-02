import { FC, ReactNode } from "react";
import Mainheader from "./header";

const MainLayout: FC<{ children?: ReactNode }> = (props) => (
  <div className="hscreen flex flex-col font-sans">
    <Mainheader />
    <main className="grow overflow-hidden bg-light">{props.children}</main>
  </div>
);

export default MainLayout;

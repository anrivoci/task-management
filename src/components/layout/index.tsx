import { ReactNode } from "react";
//components
import Header from "../header";
import SideBar from "../sidebar";
//style
import "./layout.css";

interface LayoutProps {
    children: ReactNode
}

const Layout = (props: LayoutProps) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="main">
                <Header />
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
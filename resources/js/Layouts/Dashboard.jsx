import { Children } from "react";
import Sidebar from "./Sidebar";

export default function Dashboard({Children}) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                {Children}
            </div>
        </div>
    );
}
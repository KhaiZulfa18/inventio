// import Menu from "@/Utils/Menu"
import React from "react";
import LinkItem from "@/Components/LinkItem";
import LinkItemDropdown from "@/Components/LinkItemDropdown";
import { usePage } from "@inertiajs/react";
import { UserGroupIcon } from "@heroicons/react/24/solid";
// import { IconBrandReact } from "@tabler/icons-react";

export default function Sidebar({ sidebarOpen = true }) {

    // define props
    const { auth } = usePage().props;

    // get menu from utils
    // const menuNavigation = Menu();

    return (
        <div
            className={`${sidebarOpen ? 'w-[260px]' : 'w-[100px]'} hidden md:block min-h-screen overflow-y-auto border-r transition-all duration-300 bg-white dark:bg-gray-950 dark:border-gray-900`}>
            {sidebarOpen ?
                <>
                    <div className="flex justify-center items-center px-6 py-2 h-16">
                        <div className="text-2xl font-bold text-center leading-loose tracking-wider text-gray-900 dark:text-gray-200">
                            STARTER KIT
                        </div>
                    </div>
                    <div className="w-full p-3 flex items-center gap-4 border-b border-t dark:bg-gray-950/50 dark:border-gray-900">
                        <img
                            src={auth.user.avatar}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col gap-0.5">
                            <div className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-50">
                                {auth.user.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {auth.user.email}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col overflow-y-aut">
                        <div >
                            <div className="text-gray-500 text-xs py-3 px-4 font-bold uppercase">
                                User
                            </div>
                            <LinkItem
                                // key={indexDetail}
                                title="User"
                                icon={<UserGroupIcon className="w-5 mr-4"/>}
                                href=""
                                // access={detail.permissions}
                                sidebarOpen={sidebarOpen}
                            />
                        </div>
                    </div>
                </>
            :
                <>
                    <div className="flex justify-center items-center px-6 py-2 h-16 border-b dark:border-gray-900">
                        ##
                    </div>
                    <div className='w-full px-6 py-3 flex justify-center items-center gap-4 border-b bg-white dark:bg-gray-950/50 dark:border-gray-900'>
                        {auth.user.name}
                    </div>
                    <div className='w-full flex flex-col overflow-y-auto items-center justify-center'>
                            <div className='flex flex-col min-w-full items-center' >
                                
                            </div>
                    </div>
                </>
            }
        </div>
    );
}

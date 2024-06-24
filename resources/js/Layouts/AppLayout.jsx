import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from 'react'

export default function AppLayout({children}) {

    const darkMode = false;

    const [sidebarOpen, setSidebarOpen] = useState(
        localStorage.getItem('sidebarOpen') === 'true'
    );

    // define react hooks
    useEffect(() => {
        localStorage.setItem('sidebarOpen', sidebarOpen);
    }, [sidebarOpen])

    // define function toggleSidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    
    return (
        <div className='min-h-screen flex overflow-y-auto'>
            <Sidebar sidebarOpen={sidebarOpen}/>
            <div className='flex-1 flex-col overflow-y-auto h-screen'>
                {/* <Navbar toggleSidebar={toggleSidebar} themeSwitcher={themeSwitcher} darkMode={darkMode} /> */}
                <Navbar toggleSidebar={toggleSidebar}  darkMode={darkMode}/>
                {/* <div className='w-full py-8 px-4 md:px-6 min-h-screen overflow-y-auto mb-14 md:mb-0 text-white'>
                    <Toaster position='top-right'/>
                    {children}
                </div> */}
            </div>
        </div>
    );
}
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/Context/ThemeSwitcherContext';
import { Toaster } from 'react-hot-toast';

export default function AppLayout({children}) {

    // destruct darkMode and themeSwitcher from context
    const {darkMode, themeSwitcher } = useTheme();

    // define state sidebarOpen
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
            <Sidebar sidebarOpen={sidebarOpen} />
            <div className='flex-1 flex-col overflow-y-auto h-screen'>
                <Navbar toggleSidebar={toggleSidebar} themeSwitcher={themeSwitcher} darkMode={darkMode}/>
                <div className='w-full py-8 px-2 md:px-6 min-h-screen overflow-y-auto mb-14 md:mb-0 text-white'>
                    <Toaster position='top-right'/>
                    {children}
                </div>
            </div>
        </div>
    );
}
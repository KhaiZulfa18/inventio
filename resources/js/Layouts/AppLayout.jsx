import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout({children}) {
    return (
        <div className='min-h-screen flex overflow-y-auto'>
            <Sidebar/>
            <div className='flex-1 flex-col overflow-y-auto h-screen'>
                {/* <Navbar toggleSidebar={toggleSidebar} themeSwitcher={themeSwitcher} darkMode={darkMode} /> */}
                <Navbar/>
                {/* <div className='w-full py-8 px-4 md:px-6 min-h-screen overflow-y-auto mb-14 md:mb-0 text-white'>
                    <Toaster position='top-right'/>
                    {children}
                </div> */}
            </div>
        </div>
    );
}
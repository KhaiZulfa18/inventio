export default function Sidebar({}){
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-2xl font-semibold">Sidebar</h2>
            <ul className="mt-4 space-y-2">
                <li className="hover:bg-gray-700 p-2 rounded">Home</li>
                <li className="hover:bg-gray-700 p-2 rounded">Profile</li>
                <li className="hover:bg-gray-700 p-2 rounded">Settings</li>
                <li className="hover:bg-gray-700 p-2 rounded">Logout</li>
            </ul>
        </div>
    );
}
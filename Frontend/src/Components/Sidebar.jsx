import { Link, useLocation } from "react-router";
import useAuthUser from "../Hooks/useAuthUser";
import { Bell, Home, User } from "lucide-react";

const Sidebar = () => {

    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className={`${currentPath.startsWith("/chat") ? "w-56" : "w-64"} bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0`}>
            <div className="p-5 border-b border-base-300">
                <Link to="/" className="flex items-center gap-2.5">
                    <svg className="size-9 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.28 41.13">
                        <path fill="currentColor" d="M3.45 40.34c.93.52 1.99.79 3.09.79h38.86v-3.25H6.54l-3.09 2.46Z" />
                        <path fill="currentColor" d="M43.73 0H6.54C2.93 0 0 2.96 0 6.59v27.99c0 1.36.43 2.67 1.18 3.73l2.54-2.03 11.65-9.27a11.7 11.7 0 0 1-1.99-6.44c0-6.5 5.27-11.76 11.76-11.76 3.35 0 6.35 1.42 8.48 3.67l11.32-9.01 2.7-2.15c-1.11-.85-2.48-1.32-3.91-1.32Z" />
                        <path fill="currentColor" d="M49.58 3.62l-2.65 2.11c.07.27.11.56.11.86v29.35h3.24V6.59c0-1.06-.25-2.08-.7-2.97Z" />
                        <path fill="currentColor" d="M36.91 20.58c0-2.05-.54-4-1.48-5.7L17.28 29.33c2.09 1.87 4.86 3 7.88 3 6.48 0 11.75-5.27 11.75-11.75Z" />
                    </svg>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                        Vlake
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <Link to="/" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}>
                    <Home className="size-5 text-base-content opacity-70" />
                    <span>Home</span>
                </Link>

                <Link to="/friends" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""}`}>
                    <User className="size-5 text-base-content opacity-70" />
                    <span>Friends</span>
                </Link>

                <Link to="/notifications" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}>
                    <Bell className="size-5 text-base-content opacity-70" />
                    <span>Notifications</span>
                </Link>
            </nav>

            {/* USER PROFILE SECTION */}
            <div className="p-4 border-t border-base-300 mt-auto">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={authUser?.profilePic} alt="User Avatar" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm">{authUser?.fullname}</p>
                        <p className="text-xs text-success flex items-center gap-1">
                            <span className="size-2 rounded-full bg-success inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
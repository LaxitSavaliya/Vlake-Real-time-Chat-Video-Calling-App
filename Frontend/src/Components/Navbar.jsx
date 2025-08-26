import { Link, useLocation } from "react-router";
import useAuthUser from "../Hooks/useAuthUser";
import { Bell, LogOut } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../Hooks/useLogout";

const Navbar = () => {

    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");

    // THIS IS HOW I DID IT FIRST, WITHOUT USING MY CUSTOM HOOK
    // const queryClient = useQueryClient();

    // const { mutate: logoutMutation } = useMutation({
    //     mutationFn: logout,
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] })
    // });

    const { logoutMutation } = useLogout();

    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end w-full">
                    {/* LOGO - ONLY IN THE CHAT PAGE */}
                    {isChatPage && (
                        <div className="pl-5">
                            <Link to="/" className="flex items-center gap-2.5">
                                <svg className="size-9 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.28 41.13">
                                    <path fill="currentColor" d="M3.45 40.34c.93.52 1.99.79 3.09.79h38.86v-3.25H6.54l-3.09 2.46Z" />
                                    <path fill="currentColor" d="M43.73 0H6.54C2.93 0 0 2.96 0 6.59v27.99c0 1.36.43 2.67 1.18 3.73l2.54-2.03 11.65-9.27a11.7 11.7 0 0 1-1.99-6.44c0-6.5 5.27-11.76 11.76-11.76 3.35 0 6.35 1.42 8.48 3.67l11.32-9.01 2.7-2.15c-1.11-.85-2.48-1.32-3.91-1.32Z" />
                                    <path fill="currentColor" d="M49.58 3.62l-2.65 2.11c.07.27.11.56.11.86v29.35h3.24V6.59c0-1.06-.25-2.08-.7-2.97Z" />
                                    <path fill="currentColor" d="M36.91 20.58c0-2.05-.54-4-1.48-5.7L17.28 29.33c2.09 1.87 4.86 3 7.88 3 6.48 0 11.75-5.27 11.75-11.75Z" />
                                </svg>
                                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                    Vlake
                                </span>
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle">
                                <Bell className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                    </div>

                    {/* TODO */}
                    <ThemeSelector />

                    <div className="avatar">
                        <div className="w-9 rounded-full">
                            <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
                        </div>
                    </div>

                    <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
                        <LogOut className="h-6 w-6 text-base-content opacity-70" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
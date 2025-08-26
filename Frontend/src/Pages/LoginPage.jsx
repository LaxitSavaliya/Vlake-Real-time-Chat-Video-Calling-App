import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../Hooks/useLogin.js";

const LoginPage = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    // THIS IS HOW I DID IT FIRST, WITHOUT USING MY CUSTOM HOOK
    // const queryClient = useQueryClient();

    // const { mutate: loginMutation, isPending, error } = useMutation({
    //     mutationFn: login,
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    // });

    const { isPending, error, loginMutation } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation(loginData);
    }

    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="winter">
            <div className="border border-primary/25 flex flex-col items-center lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

                {/* LOGIN FORM SECTION */}
                <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col gap-0.5">
                    <div className="mb-4 flex items-center justify-start gap-2">
                        <svg className="size-9 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.28 41.13">
                            <path fill="currentColor" d="M3.45 40.34c.93.52 1.99.79 3.09.79h38.86v-3.25H6.54l-3.09 2.46Z" />
                            <path fill="currentColor" d="M43.73 0H6.54C2.93 0 0 2.96 0 6.59v27.99c0 1.36.43 2.67 1.18 3.73l2.54-2.03 11.65-9.27a11.7 11.7 0 0 1-1.99-6.44c0-6.5 5.27-11.76 11.76-11.76 3.35 0 6.35 1.42 8.48 3.67l11.32-9.01 2.7-2.15c-1.11-.85-2.48-1.32-3.91-1.32Z" />
                            <path fill="currentColor" d="M49.58 3.62l-2.65 2.11c.07.27.11.56.11.86v29.35h3.24V6.59c0-1.06-.25-2.08-.7-2.97Z" />
                            <path fill="currentColor" d="M36.91 20.58c0-2.05-.54-4-1.48-5.7L17.28 29.33c2.09 1.87 4.86 3 7.88 3 6.48 0 11.75-5.27 11.75-11.75Z" />
                        </svg>
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            Vlake
                        </span>
                    </div>

                    {/* ERROR MESSAGE DISPLAY */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error?.response?.data?.message || "Something went wrong. Please try again."}</span>
                        </div>
                    )}


                    <div className="w-full">
                        <form onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Welcome Back</h2>
                                    <p className="text-sm opacity-70">
                                        Sign in to your account to continue your language journey
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="hello@gmail.com"
                                            className="input input-bordered w-full"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="input input-bordered w-full"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                                        {isPending ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs"></span>
                                                Signing in...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </button>

                                    <div className="text-center mt-4">
                                        <p className="text-sm">
                                            Don't have an account?{" "}
                                            <Link to="/signup" className="text-primary hover:underline">
                                                Create One
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* IMAGE SECTION */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
                    <div className="max-w-md p-7">
                        {/* ILLUSTRATION */}
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
                        </div>

                        <div className="text-center space-y-3 mt-5">
                            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
                            <p className="opacity-70">
                                Practice conversations, make friends, and improve your language skills together
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
import { useState } from "react";
import { Link } from "react-router";
import useSignUp from "../Hooks/useSignUp";

const SignUpPage = () => {

    const [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    // THIS IS HOW I DID IT FIRST, WITHOUT USING MY CUSTOM HOOK
    // const queryClient = useQueryClient();

    // const { mutate: signupMutation, isPending, error } = useMutation({
    //     mutationFn: signup,
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    // });

    // THIS IS HOW I DID IT USING CUSTOM HOOK
    const { error, isPending, signupMutation } = useSignUp();

    const handleSignup = (e) => {
        e.preventDefault();
        if (signupData.password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        signupMutation(signupData);
    }

    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="winter">
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

                {/* SIGNUP FORM - LEFT SIDE */}

                <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
                    {/* LOGO */}
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

                    {/* ERROR MESSAGE IF ANY */}
                    {error && (
                        <div className="alert alert-error mb-4" role="alert">
                            <span>{error.response?.data?.message || error.message}</span>
                        </div>
                    )}


                    <div className="w-full">
                        <form onSubmit={handleSignup} aria-label="Sign up form">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Create an Account</h2>
                                    <p className="text-sm opacity-70">
                                        Join Vlake and start your language learning adventure!
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    {/* FULLNAME */}
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <input type="text" placeholder="John Doe" className="input input-bordered w-full" value={signupData.fullname} onChange={(e) => setSignupData({ ...signupData, fullname: e.target.value })} required aria-label="Full Name" />
                                    </div>
                                    {/* EMAIL */}
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="john@gmail.com" className="input input-bordered w-full" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required aria-label="Email" />
                                    </div>
                                    {/* PASSWORD */}
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" placeholder="••••••••" className="input input-bordered w-full" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required aria-label="Password" minLength={6} />
                                        <p className="text-xs opacity-70 mt-1">
                                            Password must be at least 6 characters long
                                        </p>
                                    </div>

                                    <div className="form-control">
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input type="checkbox" className="checkbox checkbox-sm" required />
                                            <span className="text-xs leading-tight">
                                                I agree to the{" "}
                                                <span className="text-primary hover:underline">term of service</span> and{" "}
                                                <span className="text-primary hover:underline">privacy policy</span>
                                            </span>
                                        </label>
                                    </div>

                                    <button className="btn btn-primary w-full" type="submit" disabled={isPending} aria-busy={isPending} aria-label="Create Account">
                                        {isPending ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs" aria-hidden="true"></span>
                                                Loading...
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </button>

                                    <div className="text-center mt-4">
                                        <p className="text-sm">
                                            Already have an account?{" "}
                                            <Link to="/login" className="text-primary hover:underline">
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* SIGNUP FORM - RIGHT SIDE */}

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

export default SignUpPage;
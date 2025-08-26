import { useState } from "react";
import useAuthUser from "../Hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../Lib/api.js";
import { Camera, Loader, MapPin, Shuffle } from "lucide-react";
import { LANGUAGES } from "../Constants/index.js";

const OnboardingPage = () => {

    const { authUser } = useAuthUser();
    const queryClient = useQueryClient();

    const [formState, setFormState] = useState({
        fullname: authUser?.fullname || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || ""
    });

    const { mutate: onboardingMutation, isPending } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success("Profice onboarded successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onboardingMutation(formState);
    }

    const handleRandomAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        setFormState({ ...formState, profilePic: randomAvatar });
        toast.success("Random profile picture generated!");
    }

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* IMAGE PIC CONTAINER */}

                        <div className="flex flex-col items-center justify-center space-y-4">
                            {/* IMAGE PREVIEW */}
                            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                                {formState.profilePic ? (
                                    <img
                                        src={formState.profilePic}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <Camera className="size-12 text-base-content opacity-40" />
                                    </div>
                                )}
                            </div>

                            {/* GENERATE RANDOM AVATAR BTN */}
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                                    <Shuffle className="size-4 mr-2" />
                                    Generate Random Avatar
                                </button>
                            </div>
                        </div>

                        {/* FULLNAME */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name="fullname" value={formState.fullname} onChange={(e) => setFormState({ ...formState, fullname: e.target.value })} className="input input-border w-full" placeholder="Your full name" />
                        </div>

                        {/* BIO */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bio</span>
                            </label>
                            <textarea
                                name="bio"
                                value={formState.bio}
                                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                                className="textarea textarea-bordered h-24 w-full"
                                placeholder="Tell others about yourself and your language learning goals"
                            />
                        </div>

                        {/* LANGUAGES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* NATIVE LANGUAGE */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Native Language</span>
                                </label>
                                <select
                                    name="nativeLanguage"
                                    value={formState.nativeLanguage}
                                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select your native language</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`native-${lang}`} value={lang.toLowerCase()}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* LEARNING LANGUAGE */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Learning Language</span>
                                </label>
                                <select
                                    name="learningLanguage"
                                    value={formState.learningLanguage}
                                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select language you're learning</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <div className="relative">
                                <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formState.location}
                                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button className="btn btn-primary w-full" disabled={isPending} type="submit">
                            {!isPending ? (
                                <>
                                    <svg className="size-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.28 41.13">
                                        <path fill="currentColor" d="M3.45 40.34c.93.52 1.99.79 3.09.79h38.86v-3.25H6.54l-3.09 2.46Z" />
                                        <path fill="currentColor" d="M43.73 0H6.54C2.93 0 0 2.96 0 6.59v27.99c0 1.36.43 2.67 1.18 3.73l2.54-2.03 11.65-9.27a11.7 11.7 0 0 1-1.99-6.44c0-6.5 5.27-11.76 11.76-11.76 3.35 0 6.35 1.42 8.48 3.67l11.32-9.01 2.7-2.15c-1.11-.85-2.48-1.32-3.91-1.32Z" />
                                        <path fill="currentColor" d="M49.58 3.62l-2.65 2.11c.07.27.11.56.11.86v29.35h3.24V6.59c0-1.06-.25-2.08-.7-2.97Z" />
                                        <path fill="currentColor" d="M36.91 20.58c0-2.05-.54-4-1.48-5.7L17.28 29.33c2.09 1.87 4.86 3 7.88 3 6.48 0 11.75-5.27 11.75-11.75Z" />
                                    </svg>
                                    Complete Onboarding
                                </>
                            ) : (
                                <>
                                    <Loader className="animate-spin size-5 mr-2" />
                                    onboarding...
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OnboardingPage;
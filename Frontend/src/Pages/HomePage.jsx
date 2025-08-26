import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../Lib/api";
import { Link } from "react-router";
import { CheckCircle, MapPin, UserPlus, Users } from "lucide-react";
import { getLanguageFlag } from "../Components/FriendCard";
import { capitialize } from "../Lib/utils";

const HomePage = () => {

    const queryClient = useQueryClient();
    const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

    const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });

    const { data: outgoingFriendReqs } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
    });

    const { mutate: sendRequestMutation, isPending } = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
    });

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
            outgoingFriendReqs.forEach((req) => {
                outgoingIds.add(req.recipient._id);
            });
            setOutgoingRequestsIds(outgoingIds);
        }
    }, [outgoingFriendReqs]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-base-100">
            <div className="container mx-auto space-y-10">

                <section>
                    <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
                                <p className="opacity-70">
                                    Discover perfect language exchange partners based on your profile
                                </p>
                            </div>
                            <Link to="/notifications" className="btn btn-outline btn-sm">
                                <Users className="mr-2 size-4" />
                                Friend Requests
                            </Link>
                        </div>
                    </div>

                    {loadingUsers ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                    ) : recommendedUsers.length === 0 ? (
                        <div className="card bg-base-200 p-6 text-center">
                            <h3 className="font-semibold text-lg mb-2">No recommendation available</h3>
                            <p className="text-base-content opacity-70">
                                Check back later for new language partners!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedUsers.map((user) => {
                                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                                return (
                                    <div key={user._id} className="card bg-base-200 hover:shadow-lg transition-all duration-300">
                                        <div className="card-body p-5 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar size-16 rounded-full">
                                                    <img src={user.profilePic} alt={user.fullname} />
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-lg">{user.fullname}</h3>
                                                    {user.location && (
                                                        <div className="flex items-center text-xs opacity-70 mt-1">
                                                            <MapPin className="size-3 mr-1" />
                                                            {user.location}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* LANGUAGE WITH FLAGS */}
                                            <div className="flex flex-wrap gap-1.5">
                                                <span className="badge badge-secondary">
                                                    {getLanguageFlag(user.nativeLanguage)}
                                                    Native: {capitialize(user.nativeLanguage)}
                                                </span>
                                                <span className="badge badge-outline">
                                                    {getLanguageFlag(user.learningLanguage)}
                                                    Learning: {capitialize(user.learningLanguage)}
                                                </span>
                                            </div>

                                            {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

                                            <button className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                                                }`} onClick={() => sendRequestMutation(user._id)} disabled={hasRequestBeenSent || isPending}>
                                                {hasRequestBeenSent ? (
                                                    <>
                                                        <CheckCircle className="size-4 mr-2" />
                                                        Request Sent
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="size-4 mr-2" />
                                                        Send Friend Request
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default HomePage;
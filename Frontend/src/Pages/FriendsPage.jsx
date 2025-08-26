import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { Link } from "react-router";
import { getUseFriends } from "../Lib/api";
import NoFriendsFound from "../Components/NoFriendsFound";
import FriendCard from "../Components/FriendCard";

const FriendsPage = () => {

    const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUseFriends,
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-base-100">
            <div className="container mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight"> Your Friends</h2>
                    <Link to="/notifications" className="btn btn-outline btn-sm">
                        <Users className="mr-2 size-4" />
                        Friend Requests
                    </Link>
                </div>

                {loadingFriends ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                ) : friends.length === 0 ? (
                    <NoFriendsFound />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {friends.map((friend) => (
                            <FriendCard key={friend._id} friend={friend} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FriendsPage;
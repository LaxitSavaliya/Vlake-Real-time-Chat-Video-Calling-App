import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests, rejectFriendRequest } from "../Lib/api";
import { Bell, Clock, MessageSquare, UserCheck, XCircle } from "lucide-react";
import { getLanguageFlag } from "../Components/FriendCard";
import { capitialize } from "../Lib/utils";
import NoNotificationsFound from '../Components/NoNotificationsFound';
import useAuthUser from "../Hooks/useAuthUser";

const NotificationsPage = () => {

    const { authUser } = useAuthUser();

    const queryClient = useQueryClient();

    const { data: friendRequests, isLoading } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
    });

    const { mutate: acceptRequestMutation, isPending: acceptPending } = useMutation({
        mutationFn: acceptFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
            queryClient.invalidateQueries({ queryKey: ["friends"] });
        }
    });

    const { mutate: rejectRequestMutation, isPending: rejectPending } = useMutation({
        mutationFn: rejectFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
            queryClient.invalidateQueries({ queryKey: ["friends"] });
        }
    });

    const incomingRequests = friendRequests?.inComingReqs || [];
    const requests = friendRequests?.requests || [];


    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-base-100">
            <div className="container mx-auto max-w-4xl space-y-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"></h1>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        {incomingRequests.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <UserCheck className="h-5 w-5 text-primary" />
                                    Friend Requests
                                    <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                                </h2>

                                <div className="space-y-3">
                                    {incomingRequests.map((request) => (
                                        <div key={request._id} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="card-body p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar w-14 h-14 rounded-full bg-base-300">
                                                            <img src={request.sender.profilePic} alt={request.sender.fullname} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">{request.sender.fullname}</h3>
                                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                                <span className="badge badge-secondary badge-sm">
                                                                    {getLanguageFlag(request.sender.nativeLanguage)}
                                                                    Native: {capitialize(request.sender.nativeLanguage)}
                                                                </span>
                                                                <span className="badge badge-outline badge-sm">
                                                                    {getLanguageFlag(request.sender.learningLanguage)}
                                                                    Learning: {capitialize(request.sender.learningLanguage)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-5">
                                                        <button className="btn btn-primary btn-sm" onClick={() => acceptRequestMutation(request._id)} disabled={acceptPending}>
                                                            Accept
                                                        </button>
                                                        <button className="btn btn-error btn-sm" onClick={() => rejectRequestMutation(request._id)} disabled={rejectPending}>
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ACCEPTED REQS NOTIFICATON */}
                        {requests.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-success" />
                                    New Connection
                                </h2>

                                <div className="space-y-3">
                                    {requests.map((notification) => (
                                        <div key={notification._id} className="card bg-base-200 shadow-sm">
                                            <div className="card-body p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="avatar mt-1 size-10 rounded-full">
                                                        <img src={notification.sender._id === authUser._id ? `${notification.recipient.profilePic}` : `${notification.sender.profilePic}`}
                                                            alt={notification.sender._id === authUser._id ? `${notification.recipient.fullname}` : `${notification.sender.fullname}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{notification.sender._id === authUser._id ? `${notification.recipient.fullname}` : `${notification.sender.fullname}`}</h3>
                                                        <p className="text-sm my-1">
                                                            {notification.recipient._id === authUser._id
                                                                ? notification.status === "rejected"
                                                                    ? `You rejected ${notification.sender.fullname}'s friend request`
                                                                    : `Now, you are friends with ${notification.sender.fullname}`
                                                                : notification.status === "rejected"
                                                                    ? `${notification.recipient.fullname} rejected your friend request`
                                                                    : `${notification.recipient.fullname} accepted your friend request`}
                                                        </p>

                                                        <p className="text-xs flex items-center opacity-70">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            Recently
                                                        </p>
                                                    </div>

                                                    {notification.status === "accepted" ? (
                                                        <div className="badge badge-success">
                                                            <MessageSquare className="h-3 w-3 mr-1" />
                                                            New Friend
                                                        </div>
                                                    ) : (
                                                        <div className="badge badge-error">
                                                            <XCircle className="h-3 w-3 mr-1" />
                                                            Request Rejected
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {incomingRequests.length === 0 && requests.length === 0 && (
                            <NoNotificationsFound />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default NotificationsPage;
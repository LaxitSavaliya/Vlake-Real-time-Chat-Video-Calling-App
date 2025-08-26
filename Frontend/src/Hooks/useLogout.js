import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../Lib/api";

const useLogout = () => {

    const queryClient = useQueryClient();

    const { mutate: logoutMutation, isPending, error } = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] })
    });

    return { logoutMutation, isPending, error }

}

export default useLogout;
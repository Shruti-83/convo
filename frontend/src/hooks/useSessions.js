import {useMutation, useQuery} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../api/session"

export const useCreateSession = ()=>{
   const result = useMutation({
    mutationKey:["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success("Session created successfully!"),
     onError: (error) => toast.error(error.response?.data.message || "Failed to create room")
   })

   return result;
}
export const useActiveSessions = () => {
    const result = useQuery({
        queryKey:["activeSessions"],
        queryFn: sessionApi.getActiveSessions
    })
    return result;
}
export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey:["myRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions,
    })
    return result;
}
export const useSessionById = (id) => {
    const result = useQuery({
        queryKey:["session",id],
        queryFn: () => sessionApi.getSessionsById(id),
        enabled: !!id,
        refetchInterval:5000  //refectch every 5 seconds to detect session status changes

    })
    return result;
}

export const useJoinSession = () => {
  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: (id) => sessionApi.joinSession(id),
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to join session"),
  });
};

export const useEndSession = () => {
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: (id) => sessionApi.endSession(id),
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to end session"),
  });
};
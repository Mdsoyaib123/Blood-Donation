import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useVolunteer = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isVolunteer, isPending: isVolunteerLoading } = useQuery({
    queryKey: [user?.email, "isVolunteer"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/volunteer/${user.email}`);
      return response.data?.Volunteer;
    },
  });
  return[isVolunteer,isVolunteerLoading];
};

export default useVolunteer;

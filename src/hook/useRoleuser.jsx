import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiouSecure from "./useAxiouSecure";

const useRoleUser = () => {
  const { user, loading } = useAuth(); // Assuming your useAuth hook provides user and loading
  const axiosSecure = useAxiouSecure();

  // Fetch user role using email
  const {
    data: role = "",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email && !loading, // Only run query when user is loaded
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return {
    role,
    isLoading: loading || roleLoading,
    refetchRole: refetch,
  };
};

export default useRoleUser;

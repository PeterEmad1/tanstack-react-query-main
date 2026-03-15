import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (postId: string) => {
  const response = await axios.get(
    `http://localhost:3000/comments?postId=${postId}&_sort=id&_order=desc`
  );
  return response.data;
};

export const useGetComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchData(postId),
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60 * 2, // 2 minutes
    enabled: !!postId, // prevents running when postId is undefined
  });
};
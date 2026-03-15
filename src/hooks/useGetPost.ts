import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../types/types";

const fetchData = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/posts/${id}`);
  return response.data;
};

export const useGetPost = (id: string, pramType: string, pramKey: string) => {
  const queryClient = useQueryClient();
  let getCachedData: Post[] | undefined;
  // let getCachedData = queryClient.getQueryData<Post>(["post", { id: +id }]);
  if (pramType === "paginate") {
    getCachedData = queryClient.getQueryData([
      "posts",
      { page: +pramKey, selectPostStatus: "all" },
    ]) as Post[] | undefined;
  } else if (pramType === "search") {
    getCachedData = queryClient.getQueryData([
      "posts",
      "search",
      { q: pramKey },
    ]) as Post[] | undefined;
  }
  return useQuery<Post>({
    queryKey: ["post", { id: +id }],
    queryFn: () => fetchData(id),
    initialData: () => {
      if (!getCachedData) return undefined;
      return getCachedData.find((el) => el.id === id);
    },
    staleTime: 1000 * 60 * 1, // 1 minutes
    refetchInterval: 1000 * 60 * 2, // 2 minutes
  });
};

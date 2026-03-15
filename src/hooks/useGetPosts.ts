import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Post, PostStatus } from "../types/types";

export const fetchPosts = async (
  selectStatus: PostStatus,
  paginate: number,
): Promise<Post[]> => {
  if (selectStatus === "all") {
    const response = await axios.get(
      "http://localhost:3000/posts?_page=" + paginate + "&_limit=5",
    );
    return response.data;
  } else {
    const response = await axios.get(
      `http://localhost:3000/posts?status=${selectStatus}`,
    );
    return response.data;
  }
};

function useGetPosts(
  selectStatus: PostStatus,
  paginate: number,
): UseQueryResult<Post[]> {
  return useQuery<Post[]>({
    queryKey: ["posts", selectStatus, paginate],
    queryFn: () => fetchPosts(selectStatus, paginate),
    staleTime: 1000 * 60 * 1, // 1 minutes
    refetchInterval: 1000 * 60 * 2, // 2 minutes
  });
}

export default useGetPosts;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../types/types";

const fetchData = async (searchQuery: string): Promise<Post[]> => {
  const { data } = await axios.get(
    `http://localhost:3000/posts?q=${searchQuery}`,
  );
  return data;
};

export const useSearch = (searchQuery: string) => {
  return useQuery<Post[]>({
    queryKey: ["posts", "search", searchQuery],
    queryFn: () => fetchData(searchQuery),
    staleTime: 1000 * 60 * 5,
    enabled: !!searchQuery,
  });
};

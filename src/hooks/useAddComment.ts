import axios from "axios";
import { CommentPost, CommentResponse } from "../types/types";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const requestData = async (data: CommentPost) => {
  const result = await axios.post("http://localhost:3000/comments", data);
  return result.data;
};
const queryClient = new QueryClient();
export const useAddComment = () => {
  return useMutation({
    mutationFn: requestData,
    onMutate: (data) => {
      //old data
      const savedComments = useQueryClient().getQueryData([
        "comments",
        { postId: data.postId },
      ]);
      console.log(savedComments);
      const newComments = { ...data, id: Date.now() };
      queryClient.setQueryData(
        ["comments", { postId: data.postId }],
        (comments: CommentResponse[]) => {
          return [...comments, newComments];
        },
      );
      return () => {
        queryClient.setQueryData(
          ["comments", { postId: data.postId }],
          savedComments,
        );
      };
    },
    onError: (_, __, context) => {
      console.log("error");
      if (context) context();
    },
    onSuccess: () => {
      console.log("success");
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

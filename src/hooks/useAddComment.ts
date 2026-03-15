import axios from "axios";
import { CommentPost } from "../types/types";
import { useMutation } from "@tanstack/react-query";

const requestData = async (data: CommentPost) => {
  const result = await axios.post("http://localhost:3000/comments", data);
  return result.data;
};
export const useAddComment = () => {
  return useMutation({
    mutationFn: requestData,
    onSuccess: () => {
      console.log("success");
    },
  });
};

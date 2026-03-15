import { useSearchParams } from "react-router-dom";
import { useGetPost } from "../hooks/useGetPost";
import { useState } from "react";
import { useAddComment } from "../hooks/useAddComment";
import { useGetComments } from "../hooks/useGetComments";
import { CommentPost } from "../types/types";

function Info() {
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addComment.mutate(
      { postId: +id, body: comment },
      {
        onSuccess: () => {
          setComment("");
        },
      },
    );
  }
  const [comment, setComment] = useState("");
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id") as string;
  const paramType = searchParam.get("type") as string;
  const paramKey = searchParam.get("key") as string;
  const { data, isLoading, error, isError } = useGetPost(
    id,
    paramType,
    paramKey,
  );
  const getComments = useGetComments(id);
  const addComment = useAddComment();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div className=" flex-col">
      <h1>Title: {data?.title}</h1>
      <p>Status: {data?.status}</p>
      <p>Top Rate: {data?.topRate?.toString()}</p>
      <p>Body: {data?.body}</p>
      <hr />
      <h1 className="mb-2">Comments:</h1>
      <form className="mb-3" onSubmit={submitHandler}>
        <div className="mb-3">
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
          disabled={addComment.isPending}
        >
          Submit
        </button>
      </form>
      {getComments.isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {getComments.data.map((comment: CommentPost) => (
            <li key={comment.postId}>{comment.body}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Info;

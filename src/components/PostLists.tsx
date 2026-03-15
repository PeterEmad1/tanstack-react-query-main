import { Link } from "react-router-dom";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import { Post, PostListsProps } from "../types/types";
import { useSearch } from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function PostLists({ selectPostStatus, searchQuery }: PostListsProps) {
  const [paginate, setPaginate] = useState(1);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data, isStale, refetch } = useGetPosts(
    selectPostStatus,
    paginate,
  );
  const searchData = useSearch(searchQuery);
  useEffect(() => {
    const nextPage = paginate + 1;

    if (nextPage > 3) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: ["posts", { selectPostStatus, page: nextPage }],
      queryFn: () => fetchPosts(selectPostStatus, nextPage),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  }, [paginate, selectPostStatus, queryClient]);
  if (isLoading || searchData.isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || searchData.isError) {
    return <div>Error: {error?.message || searchData.error?.message}</div>;
  }
  // console.log(isStale);
  const posts = searchQuery ? searchData.data : data;
  const type = searchQuery || paginate;
  return (
    <div className="col-span-9">
      {isStale && !searchQuery && (
        <button onClick={() => refetch()} className="mb-3">
          Update Data
        </button>
      )}
      <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center w-[10%]">Top Rate</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-gray-900">
          {posts?.map((el: Post, idx: number) => (
            <tr key={el.id} className="border-t border-gray-700">
              <td className="p-3">
                {(paginate - 1) * (posts?.length ?? 0) + idx + 1}
              </td>
              <td className="p-3">
                <Link
                  to={`/info?id=${el.id}&type=${type}&key=${type}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {el.title}
                </Link>
              </td>
              <td className="p-3">{el.status}</td>
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={el.topRate}
                  readOnly
                />
              </td>

              <td className="p-3">
                <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!searchQuery && selectPostStatus === "all" && (
        <div className="flex-center">
          {Array.from({ length: 3 }, (_, i) => (
            <button
              key={i}
              className={`button ${paginate === i + 1 ? "bg-blue-500! text-white" : ""}`}
              onClick={() => setPaginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostLists;

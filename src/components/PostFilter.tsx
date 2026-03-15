import { PostFilterProps, PostStatus } from "../types/types";

function PostFilter({ selectPostStatus, setSelectPostStatus }: PostFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectPostStatus(e.target.value as PostStatus);
  }
  return (
    <div className="col-span-3">
      <h5 className="mb-3 font-semibold">Filter By Status</h5>
      <select className="w-full bg-gray-800 border border-gray-700 rounded p-2" value={selectPostStatus} onChange={handleChange}>
        <option value="all">Select Status</option>
        <option value="published">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </select>
    </div>
  );
}

export default PostFilter;

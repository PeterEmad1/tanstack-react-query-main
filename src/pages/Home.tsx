import { useState } from "react";
import PostFilter from "../components/PostFilter";
import PostLists from "../components/PostLists";
import { PostStatus } from "../types/types";
import SearchQuery from "../components/SearchQuery";

function Home() {
  const [selectPostStatus, setSelectPostStatus] = useState<PostStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex-center gap-6">
      <PostLists
        selectPostStatus={selectPostStatus}
        searchQuery={searchQuery}
      />
      <div className="flex flex-col gap-6">
        <SearchQuery setSearchQuery={setSearchQuery} />
        {!searchQuery && (
          <PostFilter
            selectPostStatus={selectPostStatus}
            setSelectPostStatus={setSelectPostStatus}
          />
        )}
      </div>
    </div>
  );
}

export default Home;

export type Post = {
  userId: number;
  id: string;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
};

export type PostStatus = "published" | "draft" | "block" | "all";

export type PostFilterProps = {
  selectPostStatus: PostStatus;
  setSelectPostStatus: React.Dispatch<React.SetStateAction<PostStatus>>;
};

export type PostListsProps = {
  selectPostStatus: PostStatus;
  searchQuery: string;
};

export type SearchQueryProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export type CommentPost = {
  body: string;
  postId: number;
};
export type CommentResponse = {
  id: number;
  body: string;
  postId: number;
};

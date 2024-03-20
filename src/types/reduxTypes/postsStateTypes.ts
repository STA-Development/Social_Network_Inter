import { IIndividualPost } from "../../Interfaces/postsTypes";

export interface IPostsProps {
  post: IIndividualPost;
  isPostsLoading?: boolean;
  posts?: IIndividualPost[];
}

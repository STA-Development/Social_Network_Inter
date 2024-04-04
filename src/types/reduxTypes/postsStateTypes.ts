import { IIndividualPost } from "../../Interfaces/postsTypes";

export interface IPostsProps {
  post: IIndividualPost | null;
  isPostsLoading?: boolean;
  posts?: IIndividualPost[];
}

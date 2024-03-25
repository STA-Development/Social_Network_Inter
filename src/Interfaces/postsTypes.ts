export interface IPosts {
  post: IIndividualPost[];
}

export interface IComment {
  id: number;
  text: string;
  profileId: number;
  postId: number;
  userName: string;
  userSurname: string;
}
export interface IIndividualPost {
  id: number;
  imageUrl: string;
  postText: string;
  title: string;
}

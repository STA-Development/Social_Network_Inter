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
  profileId: number;
  imageUrl: string;
  postText: string;
  title: string;
}

export interface IPostFormData {
  title: string;
  postText: string;
  previewImage: string | null | any;
  profileId?: number;
}
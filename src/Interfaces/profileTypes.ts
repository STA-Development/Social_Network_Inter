export interface IProfile {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string;
}

export interface IProfileFormData {
  name: string;
  surname: string;
  email: string;
}

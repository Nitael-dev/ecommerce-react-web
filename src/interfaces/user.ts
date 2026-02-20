export interface UserProps {
  id: string;
  email: string;
  password: string;
}

export interface UserDTO {
  email: string;
  password: string;
}

export interface RecommCookiesProps {
  "recomm:user"?: UserProps;
}

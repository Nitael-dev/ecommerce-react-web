export interface UserProps {
  id: string;
  email: string;
  password: string;
  cart: CartProps[];
}

export interface CartProps {
  id: string;
  quantity: number;
}

export interface UserDTO {
  email: string;
  password: string;
}

export interface RecommCookiesProps {
  "recomm:user"?: UserProps;
  "recomm:tempCart"?: CartProps[];
}

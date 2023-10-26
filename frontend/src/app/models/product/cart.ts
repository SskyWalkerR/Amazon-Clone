import { ProductDocument } from "./product";

type CartItem = ProductDocument & {
  quantity: number;
};

type Cart = CartItem[];

export type { CartItem, Cart };

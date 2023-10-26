type Prettify<T> = {
  [K in keyof T]: T[K];
};

type Product = {
  name: string;
  price: number;
  description?: string;
};

type ProductId = {
  _id: string;
  __v: number;
};

type ProductDocument = Prettify<Product & ProductId>;

export type { Product, ProductDocument };

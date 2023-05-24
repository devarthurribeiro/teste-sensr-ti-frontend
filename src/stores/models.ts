export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type Client = {
  id: number;
  name: string;
  email: string;
};

export type Proposal = {
  id: number;
  client: Client;
  products: Product[];
  total: number;
  createdAt: string | Date;
};


export interface Product {
  id: string;
  name: string;
  description: string;
  media: string[];
}

export interface Query {
  terms?: string;
  states?: string;
  // page: number;
  // pageSize: number;
}

export interface SearchResult {
  status: number;
  numberOfResults: number;
  queryTime: number;
  products: Product[];
}

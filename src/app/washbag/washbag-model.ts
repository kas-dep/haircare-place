import { DictData } from '../model/common.model';

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  courseOfActionId: number;
  rate: number;
  availability: boolean;
  userId: number;
}

export interface ProductsResponse {
  products: Product[];
  error: Error;
}

export interface DataToDialog {
  product: Product;
  isEditMode: boolean;
  dicts: {
    coaDict: DictData[];
    pcDict: DictData[];
  };
}

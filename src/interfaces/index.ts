import { productName } from "../types";

export interface IProduct {
  id?: string | undefined;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}


export interface IFormInput{
  id: string;
  name: productName;
  label: string;
  type: string;
  placeholder: string
}

export interface ICategory{
  id: string | undefined;
  name: string;
  imageURL: string;
}
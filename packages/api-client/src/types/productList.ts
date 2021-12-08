import { BaseProduct } from "./baseProduct";

export type ProductList = {
    items: Array<BaseProduct>;
    itemsFound: number;
    offset: number;
    page: number;
    pages: number;
    start: number;
    minPrice: number;
    maxPrice: number;
    end: number;
    // availableAttributes: [AttributeFilter!]
};
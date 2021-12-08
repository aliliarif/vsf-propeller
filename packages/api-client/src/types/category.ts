import { LocalizedString } from './localizedString';
import { ProductList } from './productList';

export type Category = {
    _id: number;
    _name: string;
    id: number;
    categoryId: number;
    name: Array<LocalizedString>;
    description: Array<LocalizedString>;
    shortDescription: Array<LocalizedString>;
    slug: Array<LocalizedString>;
    path: string;
    categories: Array<Category>;
    parent: Category;
    defaultLanguage: string;
    products: ProductList;
};

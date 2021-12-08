import { LocalizedString } from './localizedString';
import { Attribute } from './attribute';
import { Image } from './image';
import { ProductPrice } from './productPrice';

export type Product = {
    _id: number;
    _name: string;
    _description: string;
    id: number;
    classId: number;
    name: Array<LocalizedString>;
    description: Array<LocalizedString>;
    attributes: Array<Attribute>;
    categoryId: number;
    class: string;
    costPrice: number;
    creditPoints: number
    images: Array<Image>
    language: string;
    manufacturer: string;
    manufacturerCode: string;
    minimumQuantity: number;
    originalPrice: number;
    path: string;
    price: ProductPrice;
    purchaseUnit: number
    shortDescription: Array<LocalizedString>;
    shortName: string;
    sku: string;
    storePrice: number;
    suggestedPrice: number;
    supplier: string;
    supplierCode: string;
    unit: number;
};

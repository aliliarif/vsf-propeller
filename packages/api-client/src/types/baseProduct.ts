import { LocalizedString } from "./localizedString";

export type BaseProduct = {
    name: Array<LocalizedString>;
    description: Array<LocalizedString>;
    shortDescription: Array<LocalizedString>;
    sku: string;
    categoryId: number;
    path: string;
};
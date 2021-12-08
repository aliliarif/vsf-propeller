import { LocalizedString } from './localizedString';
import { LocalizedStringArray } from './localizedStringArray';
import { AttributeType } from './attributeType';

export type Attribute = {
    id: string;
    name: string;
    searchId: string;
    description: Array<LocalizedString>;
    type: AttributeType;
    typeParam: string;
    group: string;
    isSearchable: boolean;
    isPublic: boolean;
    isHidden: boolean;
    textValue: Array<LocalizedStringArray>;
    enumValue: Array<string>
    intValue: Array<number>;
    decimalValue: number;
    dateValue: Date
};

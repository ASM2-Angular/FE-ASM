export interface ICategory {
    _id?: string;
    name: string;
    products?: (string | number)[];
    img?: string;
}
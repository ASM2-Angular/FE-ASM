export interface IProduct {
    _id?: string;
    name: string;
    price: number;
    img: string;
    desc?: string;
    categoryId: string;
    createdAt?: string;
}
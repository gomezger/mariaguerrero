import { Category } from './category';

export class Product {

    constructor(
        public id: number,
        public title: string,
        public category_id: number,
        public category: Category,
        public images: Array<any>,
        public description: string,
        public created_at: Date,
        public updated_at: Date
    ){
    }
}

// export class Product {
//     id?: number
//     categoryId?: number
//     productName?: string
//     price?: number

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

//     constructor({ id, categoryId, productName, price }) {
//         if (id != null) this.id = id
//         if (categoryId != null) this.categoryId = categoryId
//         if (productName != null) this.productName = productName
//         if (price != null) this.price = price
//     }
// }
@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    category_id: number
}
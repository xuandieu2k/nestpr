import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('categories')
export class CategoriesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category_name: string
}
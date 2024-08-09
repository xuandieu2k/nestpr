import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('categories')
export class Categories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category_name: string
}
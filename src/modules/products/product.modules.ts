import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/modules/products/entities/product.entities";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers:[ProductController],
    providers:[ProductService]
})

export class ProductModule {};
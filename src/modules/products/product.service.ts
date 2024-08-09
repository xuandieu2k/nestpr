import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/models/product.model";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product | null> {
        return this.productsRepository.findOneBy({ id });
    }

    async create(productDto: ProductDto): Promise<Product | null> {
        const pro = this.productsRepository.create(productDto)
        return await this.productsRepository.save(pro)
    }

    async remove(id: number): Promise<void> {
        await this.productsRepository.delete(id)
    }

    async update(productDto: ProductDto, id: number): Promise<Product> {
        const product = await this.productsRepository.findOneBy({ id });
        Object.assign(product, productDto)
        return await this.productsRepository.save(product)
    }

    async delete(id: number) {
        const product = await this.productsRepository.findOneBy({ id });
        return await this.productsRepository.remove(product)
    }
}
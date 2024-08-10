import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/modules/products/dtos/product.dto";
import { Product } from "src/modules/products/entities/product.entities";
import { Like, Repository } from "typeorm";
import { FilterProductDto } from "./dtos/filter-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async findAll(query: FilterProductDto): Promise<any> {
        const limit = Number(query.limit) || 10
        const page = Number(query.page)
        const skip = (page - 1) * limit
        const key_word = String(query.key_search) || ''
        const [res, total] = await this.productsRepository.findAndCount({
            where: [{name: Like('%' +query.key_search+'%')}],
            order: { name: "ASC" },
            take: limit,
            skip: skip
        })

        const lastPage = Math.ceil(total / limit)
        const nextPage = page + 1 > lastPage ? null : page + 1
        const prevPage = page - 1 < 1 ? ((page - 1) == 0 ? 1 : null) : page - 1
        return { data: res, total, current_page: page, next_page: nextPage, prev_page: prevPage, last_page: lastPage }
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
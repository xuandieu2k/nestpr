import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from './product.service';
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { Product } from "src/models/product.model";
import { ProductDto } from "src/dto/product.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {

    }

    @Get()
    async getAllProducts(): Promise<ResponseData<Product[]>> {
        try {
            return new ResponseData<Product[]>(await this.productService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<Product[]>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }


    @Post()
    async createProduct(@Body(new ValidationPipe()) productDto: ProductDto): Promise<ResponseData<Product>> {
        try {
            return new ResponseData<Product>(await this.productService.create(productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id')
    async detailProduct(@Param('id') id: number): Promise<ResponseData<Product | null>> {
        try {
            return new ResponseData<Product | null>(await this.productService.findOne(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<Product | null>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: number): Promise<ResponseData<Product>> {
        try {
            return new ResponseData<Product | null>(await this.productService.delete(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<Product | null>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put('/:id')
    async updateProduct(@Body(new ValidationPipe()) productDto: ProductDto, @Param('id') id: number): Promise<ResponseData<Product>> {
        try {
            return new ResponseData<Product>(await this.productService.update(productDto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }
}
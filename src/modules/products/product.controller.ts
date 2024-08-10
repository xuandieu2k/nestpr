import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { ProductService } from './product.service';
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { Product } from "src/modules/products/entities/product.entities";
import { ProductDto } from "src/modules/products/dtos/product.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { FilterProductDto } from "./dtos/filter-product.dto";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {

    }

    @Get()
    @ApiResponse({ status: 200, description: 'Get list products success.' })
    @ApiResponse({ status: 401, description: 'Get list products Failed!' })
    async getAllProducts(@Query() filter: FilterProductDto): Promise<ResponseData<Product[]>> {
        try {
            return new ResponseData<Product[]>(await this.productService.findAll(filter), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
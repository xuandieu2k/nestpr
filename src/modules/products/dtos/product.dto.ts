import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'


export class ProductDto {
    @ApiProperty()
    category_id?: number

    @MinLength(5, { message: 'Nhỏ nhất là 5' })
    @IsNotEmpty({ message: 'Không được bỏ trống' })
    @MaxLength(20, { message: 'Lớn nhất là 20' })
    @ApiProperty()
    name?: string

    @ApiProperty()
    price?: number
}
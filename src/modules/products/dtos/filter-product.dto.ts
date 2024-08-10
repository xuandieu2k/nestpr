import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'


export class FilterProductDto {
    @ApiProperty()
    page: number

    @ApiProperty()
    key_search: string

    @ApiProperty()
    limit: number
}
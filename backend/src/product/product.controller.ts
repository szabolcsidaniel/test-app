import {Controller, Get, Param, Delete, Post, Patch, Body, Query} from '@nestjs/common';
import {ProductService} from "./product.service";
import {ProductDto, ListProductDto} from "./product.dto";
import {Product} from "./product.schema";

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/')
    list(@Query() query): Promise<ListProductDto> {
        return this.productService.findAll(query.page || 0);
    }


    @Delete('/:id')
    delete(@Param() { id }) {
        return this.productService.delete(id);
    }

    @Post('/')
    async create(@Body() createProductDto: ProductDto) {
        return this.productService.create(createProductDto);
    }

    @Patch('/:id')
    async toggleStatus(@Param() { id }):Promise<ProductDto> {
        return this.productService.toggleStatus(id);
    }
}

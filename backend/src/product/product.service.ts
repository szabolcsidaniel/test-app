import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, ObjectId, Types} from 'mongoose';
import {Product, Status} from "./product.schema";
import {ProductDto, ListProductDto} from "./product.dto";
import * as process from "process";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

    async create(createProductDto: ProductDto): Promise<Product> {
        return this.productModel.create(createProductDto);
    }

    async toggleStatus(id): Promise<Product> {
        const product = await this.productModel.findById(id);

        let status;
        if (product.status === Status.WAITING) {
            status = Status.ACQUIRED
        }
        else {
            status = Status.WAITING;
        }

        return this.productModel.findByIdAndUpdate(id, { status }, { new: true})
    }

    async findAll(page:number): Promise<ListProductDto> {
        return {
            items: await this.productModel.find()
                .sort({ _id : -1})
                .limit(parseInt(process.env.ITEMS_PER_PAGE))
                .skip(page * parseInt(process.env.ITEMS_PER_PAGE)),
            count: await this.productModel.countDocuments(),
            itemPerPage: parseInt(process.env.ITEMS_PER_PAGE),
        };
    }

    async findOne(id: string): Promise<Product> {
        return this.productModel.findById(id);
    }

    async delete(id: string) {
        return this.productModel
            .findByIdAndDelete(id)
    }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Status {
    WAITING= 'waiting',
    ACQUIRED ='acquired',
}

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop({ default: Status.WAITING })
    status: Status;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
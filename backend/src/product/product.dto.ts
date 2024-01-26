import {Status} from "./product.schema";
import {IsNotEmpty, IsEmail, Length, IsString, IsEnum, IsOptional} from 'class-validator';



export class ProductDto {

    @IsNotEmpty({ message: 'Név megadása kötelező'})
    readonly name: string;

    @IsNotEmpty({ message: 'Ár megadása kötelező'})
    readonly price: number;

    @IsNotEmpty({ message: 'Leírás megadása kötelező'})
    readonly description: string;

    @IsEnum(Status)
    @IsOptional()
    readonly status: Status;
}


export class ListProductDto {
    items: ProductDto[];
    count: number;
    itemPerPage: number;
}
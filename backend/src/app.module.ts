import { Module } from '@nestjs/common';
import { ProductModule } from "./product/product.module";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017',{dbName: 'test-app'}),
    ProductModule
  ],
})
export class AppModule {}

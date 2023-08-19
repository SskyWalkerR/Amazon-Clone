import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(
    name: string,
    price: number,
    description?: string,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({ name, price, description });
    return newProduct.save();
  }

  async findAllProducts(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findProduct(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async updateProduct(
    id: string,
    newName: string,
    newPrice: number,
    newDescription?: string,
  ): Promise<ProductDocument> {
    const existingProduct = await this.findProduct(id);

    existingProduct.name = newName ?? existingProduct.name;
    existingProduct.price = newPrice ?? existingProduct.price;
    existingProduct.description = newDescription ?? existingProduct.description;

    return existingProduct.save();
  }

  async deleteProduct(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}

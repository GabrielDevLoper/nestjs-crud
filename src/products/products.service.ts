import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Http2ServerResponse } from 'http2';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);

    const productAlreadyExists = await this.productRepository.findOne({
      where: {
        code: product.code,
      },
    });

    if (productAlreadyExists) {
      throw new HttpException(
        'Este produto já se encontra cadastrado',
        HttpStatus.CONFLICT,
      );
    }

    await this.productRepository.save(product);

    return product;
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['user'],
    });

    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneOrFail(id);

    if (!product) {
      throw new HttpException('Este produto não existe', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update(id, updateProductDto);

    return product;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.remove(product);

    return Http2ServerResponse;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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

    const user = await this.userRepository.findOne(createProductDto.id_user);

    if (!user) {
      throw new HttpException(
        'Usuário não foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const category = await this.categoryRepository.findOne(
      createProductDto.id_category,
    );

    if (!category) {
      throw new HttpException(
        'Categoria não foi encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.productRepository.save(product);

    return product;
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['user', 'category'],
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
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new HttpException('Este produto não existe', HttpStatus.NOT_FOUND);
    }

    const productAlreadyUsingCode = await this.productRepository.findOne({
      where: {
        code: updateProductDto.code,
        id: Not(product.id),
      },
    });

    if (productAlreadyUsingCode) {
      throw new HttpException(
        'Já existe um produto cadastrado com o mesmo código identificador',
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.userRepository.findOne(updateProductDto.id_user);

    if (!user) {
      throw new HttpException(
        'Usuário não foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const category = await this.categoryRepository.findOne(
      updateProductDto.id_category,
    );

    if (!category) {
      throw new HttpException(
        'Categoria não foi encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.productRepository.update(id, updateProductDto);

    const productUpdated = await this.productRepository.findOne(id);

    return productUpdated;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.remove(product);

    return;
  }
}

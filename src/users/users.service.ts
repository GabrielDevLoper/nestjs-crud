import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    const userAlreadyExists = await this.userRepository.findOne({
      where: {
        cpf: user.cpf,
      },
    });

    if (!!userAlreadyExists) {
      throw new HttpException(
        'Já existe um usuario cadastrado com este CPF',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['profile'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        'Nenhum usuário foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    delete user.password;

    return user;
  }

  async findByCpf(cpf: string) {
    const user = await this.userRepository.findOne({ cpf: cpf });

    if (!user) {
      throw new NotFoundException('Usuário não foi encontrado');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException(`Usuário não encontrado`, HttpStatus.NOT_FOUND);
    }
    try {
      await this.userRepository.update(id, updateUserDto);

      return user;
    } catch (error) {
      throw new HttpException(
        'Já existe um usuário cadastrado com o mesmo cpf',
        HttpStatus.CONFLICT,
      );
    }
  }

  async remove(id: number) {
    const userAlreadyExist = await this.userRepository.findOne(id);

    if (!userAlreadyExist) {
      throw new HttpException(`Usuário não encontrado`, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.remove(userAlreadyExist);

    return;
  }
}

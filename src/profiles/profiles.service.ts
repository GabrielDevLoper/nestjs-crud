import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto);

    const profileAlreadyExists = await this.profileRepository.findOne({
      where: {
        name: profile.name,
      },
    });

    if (profileAlreadyExists) {
      throw new HttpException(
        'Já existe um perfil do mesmo',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.profileRepository.save(profile);

    return profile;
  }

  async findAll() {
    const profiles = await this.profileRepository.find({
      relations: ['users'],
    });

    return profiles;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}

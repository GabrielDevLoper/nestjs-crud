import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findByCpf(createAuthDto.cpf);

    const isPasswordCorrect = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );

    if (user && isPasswordCorrect) {
      const { id, name, cpf, profile } = user;

      return { id, name, cpf, profile };
    }

    return null;
  }
}

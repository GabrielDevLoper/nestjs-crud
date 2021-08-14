import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  password: string;
}

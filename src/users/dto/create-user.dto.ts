import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly cpf: string;

  @IsNumber()
  readonly id_perfil: number;

  @IsBoolean()
  readonly isActive: boolean;

  @IsString()
  readonly password: string;
}

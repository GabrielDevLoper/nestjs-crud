import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O campo nome deve ser string' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  readonly name: string;

  @IsString({ message: 'O campo cpf deve ser string' })
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  readonly cpf: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo id_profile é obrigatório' })
  readonly id_profile: number;

  @IsBoolean({ message: 'O campo is_active deve ser boolean' })
  @IsNotEmpty({ message: 'O campo is_active é obrigatório' })
  readonly is_active: boolean;

  @IsString({ message: 'O campo password deve ser string' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  readonly password: string;
}

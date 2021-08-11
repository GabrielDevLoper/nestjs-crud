import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'O campo nome deve ser string' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;
}

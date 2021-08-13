import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo código é obrigatório' })
  readonly description: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo código é obrigatório' })
  readonly code: string;

  @IsNumber()
  @IsNotEmpty({ message: 'É obrigatório escolher uma categoria' })
  readonly id_category: number;

  @IsNumber()
  readonly id_user: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo preço é obrigatório' })
  readonly price: number;
}

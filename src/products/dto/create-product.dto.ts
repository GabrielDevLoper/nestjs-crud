import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsNumber()
  @IsNotEmpty()
  readonly id_category: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_user: number;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}

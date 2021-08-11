import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly id_category: number;

  @IsNumber()
  readonly id_user: number;

  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly price: number;
}

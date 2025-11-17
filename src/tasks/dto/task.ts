import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Document } from 'mongoose';

export class TaskDTO extends Document {

  @IsOptional()
  codigo?: number;

  @IsString()
  @MinLength(3, { message: 'A descrição deve ter pelo menos 3 caracteres.' })
  @MaxLength(100, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  description: string;

  @IsBoolean({ message: 'O campo completed deve ser verdadeiro ou falso.' })
  completed: boolean;
}

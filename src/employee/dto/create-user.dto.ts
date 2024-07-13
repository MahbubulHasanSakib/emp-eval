import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ManagerDto {
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}
export class CreateUserDto {
  @ApiProperty({ example: 'Mahbubul' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Jr. Backend' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: '01' })
  @IsString()
  @IsOptional()
  employeeID?: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ example: 'url' })
  @IsString()
  @IsOptional()
  profileImage: string;

  @ApiProperty({
    example: {
      id: '6645a81d57e3d75c37858feb',
      name: 'ABC',
    },
  })
  @ValidateNested({ each: true })
  @IsOptional()
  manager: ManagerDto;

  @ApiProperty({ example: 'Goals....' })
  @IsString()
  @IsOptional()
  achievedGoalsCurrentYear?: string;

  @ApiProperty({ example: 'Next Goals....' })
  @IsString()
  @IsOptional()
  setNextReviewGoal?: string;

  @ApiProperty({ example: 'Emp signature' })
  @IsString()
  @IsOptional()
  empSignature?: string;
}

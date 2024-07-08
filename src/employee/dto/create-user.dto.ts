import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class ManagerDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class CreateUserDto {
  @ApiProperty({ example: 'Mahbubul' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Jr. Backend' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '01' })
  @IsString()
  @IsNotEmpty()
  employeeID: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  @IsNotEmpty()
  department: string;

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
}

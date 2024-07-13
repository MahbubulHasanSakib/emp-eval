import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'User ID' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;

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

// Rating DTO
export class CreateRatingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'How would you rate the service?',
    description: 'Question',
  })
  ques: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Excellent', description: 'Answer' })
  ans: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Keep up the good work!',
    description: 'Comments',
    required: false,
  })
  comments?: string;
}

// LineManager DTO
export class CreateLineManagerDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Increased sales by 20%',
    description: 'Achieved Goals',
    required: false,
  })
  achievedGoals?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Improve customer satisfaction',
    description: 'Next Review Goal',
    required: false,
  })
  nextReviewGoal?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Leadership',
    description: 'Strength',
    required: false,
  })
  strength?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Time management',
    description: 'Improvement',
    required: false,
  })
  improvement?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Advanced sales training',
    description: 'Training Recommendation',
    required: false,
  })
  trainingRecommendation?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Sales Manager', description: 'Position' })
  position: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '5%', description: 'Salary Increment' })
  salaryIncrement: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Jane Smith',
    description: 'Manager Name',
    required: false,
  })
  managerName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Jane Smith',
    description: 'Signature',
    required: false,
  })
  signature?: string;
}

// CEO DTO
export class CreateCEODto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Great performance',
    description: 'Remarks',
    required: false,
  })
  remarks?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'CEO', description: 'Position' })
  position: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '10%', description: 'Salary Increment' })
  salaryIncrement: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Alice Johnson',
    description: 'CEO Name',
    required: false,
  })
  ceoName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Alice Johnson',
    description: 'Signature',
    required: false,
  })
  signature?: string;
}

// Evaluation DTO
export class CreateEvaluationDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto, description: 'User details' })
  user: UserDto;

  @IsNotEmpty()
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: 'Date of evaluation',
  })
  date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Q2 2024', description: 'Review period' })
  reviewPeriod: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRatingDto)
  @ApiProperty({ type: [CreateRatingDto], description: 'Ratings' })
  ratings: CreateRatingDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLineManagerDto)
  @ApiProperty({
    type: CreateLineManagerDto,
    description: 'Line manager details',
  })
  lineManagerDetails: CreateLineManagerDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCEODto)
  @ApiProperty({
    type: CreateCEODto,
    description: 'CEO details',
    required: false,
  })
  ceoDetails?: CreateCEODto;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '01',
  })
  submittedByEmpID: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '01',
  })
  modifierEmpID?: string;
}

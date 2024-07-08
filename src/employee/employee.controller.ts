import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmployeeService } from './employee.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/utils/response.interceptor';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@ApiTags('employee')
@UseInterceptors(ResponseInterceptor)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('evaluation')
  createEvaluation(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.employeeService.createEvaluation(createEvaluationDto);
  }

  @Get('evaluation')
  findAllEvaluation() {
    return this.employeeService.findAllEvaluation();
  }

  @Get('user-evaluation/:userId')
  findOneUserEvaluation(@Param('userId') userId: string) {
    return this.employeeService.findOneUserEvaluation(userId);
  }

  @Get('evaluation/:id')
  findOneEvaluation(@Param('id') id: string) {
    return this.employeeService.findOneEvaluation(id);
  }

  @Patch('/evaluation/:id')
  updateEvaluation(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.employeeService.updateEvaluation(id, updateEvaluationDto);
  }

  @Delete('/evaluation/:id')
  removeEvaluation(@Param('id') id: string) {
    return this.employeeService.removeEvaluation(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.employeeService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.employeeService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}

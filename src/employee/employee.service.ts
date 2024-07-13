import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Evaluation } from './schema/evaluation.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Evaluation.name) private evaluationModel: Model<Evaluation>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const data = (await this.userModel.create(createUserDto)).toJSON();
    return { data, message: 'User created successfully.' };
  }

  async findAll() {
    const data = await this.userModel.find({
      deletedAt: null,
      employeeID: { $ne: '1' },
    });

    return { data, message: 'Successfully found all users.' };
  }

  async findOne(id: string) {
    const data = await this.userModel.findById(id);
    if (!data) {
      throw new NotFoundException('No user found for this id.');
    }
    return { data, message: 'A user was found successfully.' };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: any = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('No user found for this id.');
    }
    const data = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return { data, message: 'User updated successfully.' };
  }

  async remove(id: string) {
    const data = await this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      {
        new: true,
      },
    );

    return { data, message: 'User deleted successfully.' };
  }

  async createEvaluation(createEvaluationDto: CreateEvaluationDto) {
    const { user, ...evals } = createEvaluationDto ?? {};
    const {
      achievedGoalsCurrentYear,
      empSignature,
      setNextReviewGoal,
      ...restUserProps
    } = user ?? {};

    await this.userModel.findByIdAndUpdate(user?.id, {
      achievedGoalsCurrentYear,
      empSignature,
      setNextReviewGoal,
    });

    const data = (
      await this.evaluationModel.create({
        user: { ...restUserProps },
        ...evals,
      })
    ).toJSON();

    return { data, message: 'Evaluation created successfully.' };
  }

  async findAllEvaluation() {
    const data = await this.evaluationModel.find({ deletedAt: null });

    return { data, message: 'Successfully found all evaluations.' };
  }

  async findOneEvaluation(id: string) {
    const data = await this.evaluationModel.findById(id);

    return { data, message: 'An evaluation was found successfully.' };
  }

  async findOneUserEvaluation(userId: string) {
    const userInfo = await this.userModel.findById(userId);
    if (!userInfo) {
      throw new NotFoundException('No user found for this id.');
    }
    const evaluation = await this.evaluationModel.findOne({
      'user.id': userId,
    });
    if (!evaluation) {
      return {
        data: { user: userInfo },
        message: 'User found but evaluation not found',
      };
    } else {
      const { user, ...evalData } = evaluation.toJSON();
      let data = { user: userInfo, ...evalData };
      return { data, message: 'An evaluation was found successfully.' };
    }
  }

  async updateEvaluation(id: string, updateEvaluationDto: UpdateEvaluationDto) {
    const user: any = await this.evaluationModel.findById(id);

    if (!user) {
      throw new NotFoundException('No evaluation found for this id.');
    }

    const { user: createEvalUser, ...evals } = updateEvaluationDto ?? {};

    const {
      achievedGoalsCurrentYear,
      empSignature,
      setNextReviewGoal,
      ...restUserProps
    } = user ?? {};

    await this.userModel.findByIdAndUpdate(user?.id, {
      achievedGoalsCurrentYear,
      empSignature,
      setNextReviewGoal,
    });

    const data = await this.evaluationModel.findByIdAndUpdate(
      id,
      { user: { ...restUserProps }, evals },
      {
        new: true,
      },
    );
    return { data, message: 'Evaluation updated successfully.' };
  }

  async removeEvaluation(id: string) {
    const data = await this.evaluationModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      {
        new: true,
      },
    );

    return { data, message: 'Evaluation deleted successfully.' };
  }
}

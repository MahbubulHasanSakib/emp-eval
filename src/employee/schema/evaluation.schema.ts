import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: false, versionKey: false, _id: false })
export class Employee {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
@Schema({ timestamps: false, versionKey: false, _id: false })
export class Rating {
  @Prop({ required: true })
  ques: string;

  @Prop({ required: true })
  ans: string;

  @Prop({ required: false })
  comments: string;
}
export const RatingSchema = SchemaFactory.createForClass(Rating);

@Schema({ timestamps: false, versionKey: false, _id: false })
export class LineManager {
  @Prop({ required: false, type: String })
  achievedGoals: string;

  @Prop({ required: false, type: String })
  nextReviewGoal: string;

  @Prop({ required: false, type: String })
  strength: string;

  @Prop({ required: false, type: String })
  improvement: string;

  @Prop({ required: false, type: String })
  trainingRecommendation: string;

  @Prop({ required: false, type: String })
  position: string;

  @Prop({ required: false, type: String })
  salaryIncrement: string;

  @Prop({ required: false, type: String })
  managerName: string;

  @Prop({ required: false, type: String })
  signature: string;
}

@Schema({ timestamps: false, versionKey: false, _id: false })
export class CEO {
  @Prop({ required: false, type: String })
  remarks: string;

  @Prop({ required: false, type: String })
  position: string;

  @Prop({ required: false, type: String })
  salaryIncrement: string;

  @Prop({ required: false, type: String })
  ceoName: string;

  @Prop({ required: false, type: String })
  signature: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Evaluation {
  @Prop({ required: true, type: EmployeeSchema, ref: 'User' })
  user: Employee;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true })
  reviewPeriod: string;

  @Prop({ required: true, type: [RatingSchema] })
  ratings: Rating[];

  @Prop({ required: false, type: LineManager })
  lineManagerDetails: LineManager;

  @Prop({ required: false, type: CEO })
  ceoDetails: CEO;

  @Prop({ type: String, ref: 'User', required: true })
  submittedByEmpID: string;

  @Prop({ type: String, ref: 'User', required: false })
  modifierEmpID: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);

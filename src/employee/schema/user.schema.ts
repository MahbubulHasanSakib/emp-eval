import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: false, versionKey: false, _id: false })
export class Manager {
  @Prop({ required: true })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
}
export const ManagerSchema = SchemaFactory.createForClass(Manager);
@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  employeeID: string;

  @Prop({ required: false })
  department: string;

  @Prop({ required: false, type: ManagerSchema })
  manager: Manager;

  @Prop({ required: false, type: String })
  profileImage: string;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop({ required: false, type: String })
  achievedGoalsCurrentYear: string;

  @Prop({ required: false, type: String })
  setNextReviewGoal: string;

  @Prop({ required: false, type: String })
  empSignature: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

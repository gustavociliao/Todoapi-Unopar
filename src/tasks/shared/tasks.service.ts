import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) { }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException('Task não encontrada');
    return task;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(dto);
    return newTask.save();
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!task) throw new NotFoundException('Task não encontrada');
    return task;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Task não encontrada');
  }
}

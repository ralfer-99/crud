import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { name } });
  }

  async create(name: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({ name, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async update(id: number, name: string, password: string): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;

    user.name = name;
    user.password = await bcrypt.hash(password, 10);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

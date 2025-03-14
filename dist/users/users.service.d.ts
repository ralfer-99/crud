import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    findOneByName(name: string): Promise<User | null>;
    create(name: string, password: string): Promise<User>;
    update(id: number, name: string, password: string): Promise<User | null>;
    remove(id: number): Promise<void>;
}

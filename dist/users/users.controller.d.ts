import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.entity").User[]>;
    findOne(id: number): Promise<import("./user.entity").User>;
    create(body: {
        name: string;
        password: string;
    }): Promise<import("./user.entity").User>;
    update(id: number, body: {
        name: string;
        password: string;
    }): Promise<import("./user.entity").User>;
    remove(id: number): Promise<void>;
}

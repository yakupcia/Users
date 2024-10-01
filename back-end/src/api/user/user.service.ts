import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAllUsers(page: number, pageSize: number, search?: string) {
    const offset = (page - 1) * pageSize;

    let query = this.dbService
      .db('users')
      .select(
        'id',
        'name',
        'surname',
        'email',
        'phone',
        'age',
        'country',
        'district',
        'role',
      )
      .offset(offset)
      .limit(pageSize);

    if (search) {
      query = query.where(function () {
        this.where('name', 'ilike', `%${search}%`)
          .orWhere('surname', 'ilike', `%${search}%`)
          .orWhere('email', 'ilike', `%${search}%`)
          .orWhere('country', 'ilike', `%${search}%`)
          .orWhere('district', 'ilike', `%${search}%`);
      });
    }

    const [users, totalCount] = await Promise.all([
      query,
      this.dbService.db('users').count('id as count').first(),
    ]);

    const totalPages = Math.ceil(Number(totalCount.count) / pageSize);

    return {
      users,
      meta: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount: totalCount.count,
      },
    };
  }

  async getUserById(id: number) {
    return this.dbService.db('users').where({ id }).first();
  }

  async createUser(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [newUser] = await this.dbService
      .db('users')
      .insert({
        ...userData,
        password: hashedPassword,
      })
      .returning('*');

    return newUser;
  }

  async updateUser(userData: any) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const [updatedUser] = await this.dbService
      .db('users')
      .where({ id: userData.id })
      .update(userData)
      .returning('*');

    return updatedUser;
  }
}

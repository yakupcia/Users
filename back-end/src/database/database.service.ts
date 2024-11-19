import { Injectable, OnModuleInit } from '@nestjs/common';
import knex, { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit {
  public db: Knex;

  async onModuleInit() {
    await this.createDatabaseIfNotExists();
    await this.createUserTableIfNotExists();
    await this.insertMockData();
  }

  private async createDatabaseIfNotExists() {
    const dbName = 'user_service';
    const defaultDbConnection = knex({
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'yakupkok',
        password: process.env.DB_PASSWORD || 'yeni_sifre',
        database: 'postgres',
        port: parseInt(process.env.DB_PORT || '5432', 10),
      },
    });

    try {
      await defaultDbConnection.raw(`CREATE DATABASE "${dbName}"`);
      console.log(`Veritabanı "${dbName}" oluşturuldu`);
    } catch (error) {
      if (error.code === '42P04') {
        console.log(`Veritabanı "${dbName}" zaten mevcut`);
      } else {
        console.error('Veritabanı oluşturulurken hata oluştu:', error.message);
        throw error;
      }
    } finally {
      await defaultDbConnection.destroy();
    }

    this.db = knex({
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'yakupkok',
        password: process.env.DB_PASSWORD || 'yeni_sifre',
        database: dbName,
        port: parseInt(process.env.DB_PORT || '5432', 10),
      },
    });
  }

  private async createUserTableIfNotExists() {
    if (!(await this.db.schema.hasTable('users'))) {
      await this.db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('surname', 100).notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('phone', 20);
        table.integer('age');
        table.string('country', 100);
        table.string('district', 100);
        table.string('role', 50);
        table.timestamps(true, true);
      });
      console.log('Users tablosu oluşturuldu');
    } else {
      console.log('Users tablosu zaten mevcut');
    }
  }

  private async insertMockData() {
    const mockUsers = [
      {
        name: 'Yakup',
        surname: 'KOK',
        email: 'cia@example.com',
        password: await bcrypt.hash('123', 10),
        phone: '5550243910',
        age: 24,
        country: 'Türkiye',
        district: 'İstanbul',
        role: 'owner',
      },
      {
        name: 'Sevda',
        surname: 'Kara',
        email: 'sevda@example.com',
        password: await bcrypt.hash('123', 10),
        phone: '5559876543',
        age: 25,
        country: 'Türkiye',
        district: 'Ankara',
        role: 'admin',
      },
    ];

    for (const user of mockUsers) {
      await this.db('users').insert(user).onConflict('email').merge();
    }
    console.log('Mock data eklendi veya zaten mevcut');
  }

  async query(queryBuilder: Knex.QueryBuilder) {
    return queryBuilder;
  }
}

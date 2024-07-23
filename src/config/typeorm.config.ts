import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): DataSourceOptions {
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT') as number,
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
  }
}

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<DataSourceOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

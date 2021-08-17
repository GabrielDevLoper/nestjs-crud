import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
// import * as ormconfig from '../ormconfigsdasd';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs-crud',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      // We are using migrations, synchronize should be set to false.
      synchronize: true,

      // Run migrations automatically,
      // you can disable this if you prefer running migration manually.
      migrationsRun: false,
      logging: false,
      logger: 'file',

      // Allow both start:prod and start:dev to use migrations
      // __dirname is either dist or src folder, meaning either
      // the compiled js in prod or the ts in dev.
      migrations: [__dirname + 'database/migrations/**/*{.ts,.js}'],
      cli: {
        // Location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: 'src/database/migrations',
      },
    }),
    UsersModule,
    ProductsModule,
    ProfilesModule,
    CategoriesModule,
    AuthModule,
  ],
})
export class AppModule {}

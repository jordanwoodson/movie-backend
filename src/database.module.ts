import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from './config';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI)],
})
export class DatabaseModule {}

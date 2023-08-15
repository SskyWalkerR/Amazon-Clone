import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot(''), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// mongodb+srv://clone_threads:VSiTAwNejF4i6QoG@cluster0.xayhqmc.mongodb.net/?retryWrites=true&w=majority

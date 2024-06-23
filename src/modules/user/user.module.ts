import { BcryptModule } from '@/common/bcrypt/bcrypt.module';
import { Paginator } from '@/common/utils/pagination';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@/common/config/constants';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    BcryptModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, Paginator, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}

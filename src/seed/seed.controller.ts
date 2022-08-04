import { Controller, Get } from '@nestjs/common';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from '../auth/interfaces';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  executeSeed(@GetUser() user: User) {
    return this.seedService.executeSeed(user);
  }
}

import { Controller } from '@nestjs/common';

import { UserService } from '../services/user.service';

@Controller('api/persons')
export class PersonController {
  constructor(private readonly userService: UserService) {}
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async register(user: UserDTO) {
    const userAlreadyRegistered = await this.db.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userAlreadyRegistered) {
      throw new BadRequestException();
    }

    const userCreated = await this.db.user.create({
      data: {
        ...user,
        senha: bcrypt.hashSync(user.senha, 10),
      },
      select: {
        id: true,
        email: true,
        nome: true,
        criado_em: true,
        atualizado_em: true,
      },
    });

    return userCreated;
  }

  async findByEmail(email: string) {
    return await this.db.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        nome: true,
        senha: true,
        atualizado_em: true,
        criado_em: true,
      },
    });
  }

  async findMyUser(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nome: true,
        atualizado_em: true,
        criado_em: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }
}

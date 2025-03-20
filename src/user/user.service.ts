import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserDTO, UserUpdateDTO, UserUpdatePassDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

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
        password: bcrypt.hashSync(user.password, 10),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
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
        name: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findMyUser(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async updateMyUser(body: UserUpdateDTO, id: string) {
    await this.findMyUser(id);

    return await this.db.user.update({
      where: { id },
      data: {
        ...body,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateMyPass(body: UserUpdatePassDTO, id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const comparePasswordHashed = bcrypt.compareSync(
      body.old_password,
      user.password,
    );

    if (comparePasswordHashed) {
      await this.db.user.update({
        where: {
          id,
        },
        data: {
          password: bcrypt.hashSync(body.new_password, 10),
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return { message: 'Senha atualizada com sucesso!' };
    } else {
      throw new BadRequestException('Sua senha está incorreta');
    }
  }

  async delete(id: string) {
    await this.findMyUser(id);

    await this.db.user.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'O usuário foi removido com sucesso!',
    };
  }
}

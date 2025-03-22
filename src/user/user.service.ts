import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
        senha: bcrypt.hashSync(user.senha, 10),
      },
      select: {
        id: true,
        email: true,
        nome: true,
        telefone: true,
        link: true,
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
        administrador: true,
        link: true,
        telefone: true,
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
        administrador: true,
        link: true,
        telefone: true,
        atualizado_em: true,
        criado_em: true,
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
        nome: true,
        administrador: true,
        link: true,
        telefone: true,
        atualizado_em: true,
        criado_em: true,
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
      body.senha_antiga,
      user.senha,
    );

    if (comparePasswordHashed) {
      await this.db.user.update({
        where: {
          id,
        },
        data: {
          senha: bcrypt.hashSync(body.nova_senha, 10),
        },
        select: {
          id: true,
          email: true,
          nome: true,
          administrador: true,
          link: true,
          telefone: true,
          atualizado_em: true,
          criado_em: true,
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

  async validateUserAdmin(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user?.administrador) {
      throw new UnauthorizedException('Você não tem permissão.');
    }
  }

  async listSupportersUsers(userId: string, page: number) {
    await this.validateUserAdmin(userId);

    // Calculando o offset com base na página e limite
    const skip = (page - 1) * 10;

    const users = await this.db.user.findMany({
      where: {
        administrador: false,
      },
      select: {
        id: true,
        email: true,
        nome: true,
        administrador: true,
        link: true,
        telefone: true,
        atualizado_em: true,
        criado_em: true,
      },
      skip, // Offset para paginação
      take: 10, // Número de usuários por página
    });

    return users;
  }

  async updateUserById(id: string, userId: string, body: UserUpdateDTO) {
    await this.validateUserAdmin(userId);

    return await this.db.user.update({
      where: { id },
      data: {
        ...body,
      },
      select: {
        id: true,
        email: true,
        nome: true,
        administrador: true,
        link: true,
        telefone: true,
        atualizado_em: true,
        criado_em: true,
      },
    });
  }

  async deleteUserById(ids: string[], userId: string) {
    await this.validateUserAdmin(userId);

    await this.db.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return {
      message: 'Os usuários foram removidos com sucesso!',
    };
  }
}

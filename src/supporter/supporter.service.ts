import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SupporterDTO, SupporterUpdateDTO } from './supporter.dto';

@Injectable()
export class SupporterService {
  constructor(private readonly db: DatabaseService) {}

  async register(user: SupporterDTO) {
    const userAlreadyRegistered = await this.db.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userAlreadyRegistered) {
      throw new BadRequestException();
    }

    const userCreated = await this.db.supporter.create({
      data: {
        ...user,
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

  async listSupporters(page: number) {
    // Calculando o offset com base na página e limite
    const skip = (page - 1) * 10;

    const users = await this.db.supporter.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
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

  async updateSupporterById(id: string, body: SupporterUpdateDTO) {
    return await this.db.supporter.update({
      where: { id },
      data: {
        ...body,
      },
      select: {
        id: true,
        email: true,
        nome: true,
        link: true,
        telefone: true,
        atualizado_em: true,
        criado_em: true,
      },
    });
  }

  async deleteSupporterById(ids: string[]) {
    await this.db.supporter.deleteMany({
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

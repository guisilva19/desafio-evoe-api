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

  async listSupporters(
    page: number,
    nome: string,
    email: string,
    telefone: string,
  ) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (nome) where.nome = { contains: nome, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (telefone) where.telefone = { contains: telefone, mode: 'insensitive' };

    const total = await this.db.supporter.count({
      where,
    });

    const supporters = await this.db.supporter.findMany({
      where,
      select: {
        id: true,
        email: true,
        nome: true,
        link: true,
        telefone: true,
        atualizado_em: true,
        criado_em: true,
      },
      skip,
      take: pageSize,
    });

    return {
      supporters,
      total,
      page: Number(page),
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
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

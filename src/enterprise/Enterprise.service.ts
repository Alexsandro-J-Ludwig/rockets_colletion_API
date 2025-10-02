import { ConflictException, NotFoundException } from '@nestjs/common';
import { EnterpriseDTO } from './dtos/Enterprise.dto';
import { EnterpriseResponseDTO } from './dtos/Enterprise.response.dto';
import { EnterpriseUpdateDTO } from './dtos/Enterprise.update.dto';
import { EnterpriseRepository } from './Enterprise.repository';
import { NotContains } from 'class-validator';

class EnterpriseService {
  constructor(public readonly enterpriseRepository: EnterpriseRepository) {}

  async create(dto: EnterpriseDTO): Promise<EnterpriseResponseDTO> {
    const EnterprisExist = await this.getAll();
    if (EnterprisExist.some((e) => e.name === dto.name))
      throw new ConflictException('Usuario ja existe');

    const uuid = crypto.randomUUID();

    const enterpriseToCreate = {
      uuid,
      ...dto,
    };

    const data = await this.enterpriseRepository.create(enterpriseToCreate);
    return new EnterpriseResponseDTO(data);
  }

  async getAll() {
    const data = await this.enterpriseRepository.getAll();
    if (!data) throw new NotFoundException('Nenhuma empresa encontrada');

    return data.map((index) => {
      return new EnterpriseResponseDTO(index);
    });
  }

  async getById(id: string) {
    const data = await this.enterpriseRepository.get(id);
    if (!data) throw new NotFoundException('Empresa encontrada');

    return new EnterpriseResponseDTO(data);
  }

  async update(id: string, dto: EnterpriseUpdateDTO) {
    const EnterprisExist = this.getAll();
    if (!EnterprisExist) throw new NotFoundException('Empresa encontrada');

    const enterpriseToUpdate = {
      _id: id,
      ...dto,
    };
    const data = await this.enterpriseRepository.update(enterpriseToUpdate);
    return new EnterpriseResponseDTO(data);
  }

  async delete(id: string) {
    const enterprise = await this.enterpriseRepository.get(id);
    if (!enterprise) throw new NotFoundException('Empresa encontrada');

    await this.enterpriseRepository.delete(id);
    return NotContains
  }
}

export { EnterpriseService };

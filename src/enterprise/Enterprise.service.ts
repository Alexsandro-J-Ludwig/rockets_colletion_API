import { ConflictException, NotFoundException } from "@nestjs/common";
import { EnterpriseDTO } from "./dtos/Enterprise.dto";
import { EnterpriseResponseDTO } from "./dtos/Enterprise.response.dto";
import { EnterpriseUpdateDTO } from "./dtos/Enterprise.update.dto";

class EnterpriseService {
    static async create(dto: EnterpriseDTO): Promise<EnterpriseResponseDTO>{
        const EnterprisExist = await this.getAll();
        if(EnterprisExist.some(e => e.name === dto.name)) 
            throw new ConflictException("Usuario ja existe")

        const uuid = crypto.randomUUID();

        const enterpriseToCreate = {
            uuid,
            ...dto
        }

        const data = await this.EnterpriseRepository.create(enterpriseToCreate)
        return new EnterpriseResponseDTO(data);
    }

    static async getAll() {
        const data = await this.EnterpriseRepository.getAll();
        if(!data)
            throw new NotFoundException("Nenhuma empresa encontrada")

        return data.map(index => {
            return new EnterpriseResponseDTO(index) 
        }
        )
    }

    static async getById(dto: EnterpriseDTO){
        const data = await this.EnterpriseRepository.get(EnterpriseDTO);
        if(!data)
            throw new NotFoundException("Empresa encontrada")

        return new EnterpriseResponseDTO(data);
    }

    static async update(dto: EnterpriseDTO){
        const EnterprisExist = this.getAll();
        if(!EnterprisExist.include(dto.id))
    }

    static async delete(dto: EnterpriseDTO){

    }
}
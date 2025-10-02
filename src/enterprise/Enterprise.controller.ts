import { Body, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { EnterpriseUpdateDTO } from "./dtos/Enterprise.update.dto";
import { EnterpriseDTO } from "./dtos/Enterprise.dto";
import { EnterpriseService } from "./Enterprise.service";

class EnterpriseController {
    
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post('/create')
  @HttpCode(201)
  async createEnterprise(@Body() enterpriseDTO: EnterpriseDTO) {
    const response = await this.enterpriseService.create(enterpriseDTO);
    return { success: true, data: response };
  }

  @Get('/get-all')
  @HttpCode(200)
  async getAllEnterprises() {
    const response = await this.enterpriseService.getAll();
    return { success: true, data: response };
  }

  @Get('/get/:id')
  @HttpCode(200)
  async getEnterpriseById(@Param('id') id: string) {
    const response = await this.enterpriseService.getById(id);
    return { success: true, data: response };
  }

  @Put('/update')
  @HttpCode(200)
  async updateEnterprise(
    @Param('id') id: string,
    @Body() enterpriseUpdateDTO: EnterpriseUpdateDTO,
  ) {
    const response = await this.enterpriseService.update(id, enterpriseUpdateDTO);
    return { success: true, data: response };
  }

  @Delete('/delete')
  @HttpCode(204)
  async deleteEnterprise(@Param('id') id: string) {
    await this.enterpriseService.delete(id);
  }

}

export { EnterpriseController }
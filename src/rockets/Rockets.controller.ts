import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';

@Controller()
class RocketController {
  constructor(public readonly rocketService: RocketService) {}

  @Post('/create')
  @HttpCode(201)
  async createRocket(@Body() rocketDTO: RocketDTO) {
    const response = await this.rocketService.create(rocketDTO);
    return { success: true, data: response };
  }

  @Get('/get-all')
  @HttpCode(200)
  async getAll() {
    const response = await this.rocketService.getAll();
    return { success: true, data: response };
  }

  @Get('/get/:id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    const response = await this.rocketService.getById(id);
    return { success: true, data: response };
  }

  @Get("/get-by-enterprise/:id")
  @HttpCode(200)
  async getByEnterprise(@Param('id') id: string) {
    const response = await this.rocketService.getByEnterprise(id);
    return { success: true, data: response };
  }

  @Put('/update')
  @HttpCode(200)
  async updateRocket(
    @Param('id') id: string,
    @Body() rocketUpdateDTO: RocketUpdateDTO,
  ) {
    const response = await this.rocketService.update(id, rocketUpdateDTO);
    return { success: true, data: response };
  }

  @Delete('/delete')
  @HttpCode(204)
  async deleteRocket(@Param('id') id: string) {
    await this.rocketService.delete(id);
  }
}

export { RocketController }
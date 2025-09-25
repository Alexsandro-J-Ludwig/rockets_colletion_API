import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

class EnterpriseDTO {
  @IsOptional()
  @IsUUID()
  public readonly uuid: string | null = null;

  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  public readonly address: string;

  @IsNotEmpty()
  @IsString()
  public readonly city: string;

  @IsNotEmpty()
  @IsString()
  public readonly state: string;

  @IsNotEmpty()
  @IsString()
  public readonly country: string;

  @IsOptional()
  @IsString()
  public readonly uuid_rocket: string[] = [];
}

export { EnterpriseDTO };

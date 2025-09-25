import { IsString } from "class-validator";

class EnterpriseResponseDTO {
    @IsString()
    public readonly uuid:string;

    @IsString()
    public readonly name:string;

    @IsString()
    public readonly city:string;

    @IsString()
    public readonly state:string;

    @IsString()
    public readonly country:string;

    @IsString()
    public readonly rockets:string[];

    constructor(data: any) {
    this.uuid = data._id;
    this.name = data.name;
    this.city = data.city;
    this.state = data.state;
    this.country = data.country;
    this.rockets = data.rockets;
  }
}

export { EnterpriseResponseDTO }
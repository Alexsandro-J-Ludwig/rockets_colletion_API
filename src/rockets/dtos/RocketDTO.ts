import { IsNotEmpty, IsString } from "class-validator";

class RocketDTO{
    @IsNotEmpty()
    @IsString()
    public readonly name: string;

    @IsNotEmpty()
    @IsString()
    public readonly enterprise: string;
}

export { RocketDTO }
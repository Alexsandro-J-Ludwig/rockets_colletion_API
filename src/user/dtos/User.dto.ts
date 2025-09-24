import {IsEmail, IsNotEmpty, IsString} from "class-validator";

class UserDTO {
    @IsNotEmpty()
    @IsString()
    public readonly username:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public readonly email:string;

    @IsNotEmpty()
    @IsString()
    public password:string;
}

export {UserDTO}
import { PartialType } from "@nestjs/mapped-types";
import { EnterpriseDTO } from "./Enterprise.dto";

class EnterpriseUpdateDTO extends PartialType(EnterpriseDTO) {}

export { EnterpriseUpdateDTO };

import { IsNotEmpty, IsString, IsEnum, IsNumber } from "class-validator";
import { paymentMethod } from "src/util/enum";

export class FundAccountDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;


    @IsNotEmpty()
    @IsString()
    currency: string

    @IsEnum(paymentMethod)
    paymentMethod: paymentMethod

    @IsString()
    description: string
}
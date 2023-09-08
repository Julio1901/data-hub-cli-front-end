import { BankDTO } from "./bank.dto"
export  class InvestmentDTO {
    type: string
    // ex: CDB Nubank, selic etc.,
    name: string
    totalInvested: number
    //Refatorar para o tipo Date no futuro
    applicationDate: string
    bank: BankDTO


    constructor(type: string, name: string, totalInvested: number, applicationDate: string, bank: BankDTO ) {
        this.type = type
        this.name = name
        this.totalInvested = totalInvested
        this.applicationDate = applicationDate
        this.bank = bank
    }


}
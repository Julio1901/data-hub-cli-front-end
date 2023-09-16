


export class CreateNewInvestmentDTO {
    type: string
    name: string
    totalInvested: number
    applicationDate: string
    bankId: number


    constructor(type: string, name: string, totalInvested: number, applicationDate: string, bankId: number){
        this.type = type
        this.name = name
        this.totalInvested = totalInvested
        this.applicationDate = applicationDate
        this.bankId = bankId
        }
        
}



export class UpdateInvestmentDTO {
    id: number
    type: string
    name: string
    totalInvested: string
    applicationDate: string
    bankId: number


    constructor(id: number, type: string, name: string, totalInvested: string, applicationDate: string, bankId: number){
        this.id = id
        this.type = type
        this.name = name
        this.totalInvested = totalInvested
        this.applicationDate = applicationDate
        this.bankId = bankId
        }
}
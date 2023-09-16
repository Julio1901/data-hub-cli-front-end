


export class BankDTO {
    id: number
    name: string
    savedMoney: number

    constructor (id: number , name: string, savedMoney: number) {
        this.id = id
        this.name = name
        this.savedMoney = savedMoney
    }
}
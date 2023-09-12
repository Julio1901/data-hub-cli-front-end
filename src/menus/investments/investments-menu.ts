import { Display } from "src/cli.utils/display"
import { StringFormatter } from "src/cli.utils/string-formatter"
import { InvestmentDTO } from "src/models/investment.dto"
import { ApiService } from "src/service/api.service"
import * as readline from 'readline';
import { InteractWithUser } from "src/cli.utils/interact-with-user";

export class InvestmentsMenu {

    async handleWithResponse() {
        const service = new ApiService()
        const apiResponse = await service.getData()
        const investmentList =  apiResponse.data.getInvestments.map( (i) => {
            return new InvestmentDTO(
                i.id,
                i.type,
                i.name,
                i.totalInvested,
                i.applicationDate,
                i.bank
            )
        })
        // console.log(investmentList)
        this.displayInvestmentList(investmentList)
    }





    private displayInvestmentList(investmentList: InvestmentDTO[]) {
        const displayTitle = new Display()
        console.log(displayTitle.getInvestmentsMenuTitle())
        const stringFormatter = new StringFormatter()


        let totalMoney = 0

        investmentList.forEach( (i: InvestmentDTO) => {
            console.log( `
            ID: ${i.id}
            Tipo do investimento: ${i.type}
            Nome do investimento:   ${i.name}
            Total investido:  ${i.totalInvested}
            Data da aplicação:  ${i.applicationDate}
            Banco ou corretora:  ${i.bank}
            `)
            totalMoney += i.totalInvested
        })

        console.log(`
            VALOR TOTAL DOS INVESTIMENTOS: ${stringFormatter.formatMoneyValue(totalMoney)}`)
        //Passar esse dado para o back end
        console.log(`
            Última atualização dos valores: 10 sep 2023`)

        this.displayInvestmentsOptions()
    }


    private handleWithInvestmentOptions(answer: string){
        const interactWithUserObj = new InteractWithUser()
        interactWithUserObj.cleanTerminal()

        if (answer === '1') {
            this.handleWithUpdateInvestment() 
        }
    }

    private async displayInvestmentsOptions() {
        const interactWithUserObj = new InteractWithUser()
        const message = `
         Escolha a opção desejada: \n
         1- Atualizar investimento`
        let answer = await interactWithUserObj.interactWithUser(message)
        this.handleWithInvestmentOptions(answer)
    }
    
    private async handleWithUpdateInvestment() {
        const apiServiceObj = new ApiService()
        const interactWithUserObj = new InteractWithUser()
        let message = `
        Insira o ID do investimento que deseja alterar:
        `
        let newId : string = ""
        let newInvestmentValue : number = 0

        newId = await interactWithUserObj.interactWithUser(message);
     
        message = `
            Insira o novo valor do investimento: 
        `


        newInvestmentValue = parseInt(await interactWithUserObj.interactWithUser(message))
       
        await apiServiceObj.updateInvestment(parseInt(newId), newInvestmentValue)


    }

}


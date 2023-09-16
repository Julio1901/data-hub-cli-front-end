import { Display } from "src/cli.utils/display"
import { StringFormatter } from "src/cli.utils/string-formatter"
import { InvestmentDTO } from "src/models/investment.dto"
import { ApiService } from "src/service/api.service"
import * as readline from 'readline';
import { InteractWithUser } from "src/cli.utils/interact-with-user";
import { CreateNewInvestmentDTO } from "src/service/create-new-investment.dto";

export class InvestmentsMenu {

    async displayInvestmentList() {
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
     
        this.formatInvestmentListToDisplay(investmentList)
    }





    private formatInvestmentListToDisplay(investmentList: InvestmentDTO[]) {
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

            INFORMAÇÕES DO BANCO ATRELADO AO INVESTIMENTO

            ID do Banco ou corretora:  ${i.bank.id}
            Banco ou corretora:  ${i.bank.name}
            Valor total de investimentos nesse banco:  ${i.bank.savedMoney}

            ` + "#".repeat(50))
            totalMoney += i.totalInvested
        })

        console.log(`

            VALOR TOTAL DOS INVESTIMENTOS: ${stringFormatter.formatMoneyValue(totalMoney)}`)
        //Passar esse dado para o back end
        console.log(`
            Última atualização dos valores: 10 sep 2023

            `+ "#".repeat(50))

        this.displayInvestmentsOptions()
    }


    private handleWithInvestmentOptions(answer: string){
        const interactWithUserObj = new InteractWithUser()
        interactWithUserObj.cleanTerminal()

        if (answer === '1') {
            this.handleWithCreateNewInvestment() 
        }
    }

    private async displayInvestmentsOptions() {
        const interactWithUserObj = new InteractWithUser()
        const message = `

         Escolha a opção desejada:

         1- Criar novo investmento: `

        let answer = await interactWithUserObj.interactWithUser(message)
        this.handleWithInvestmentOptions(answer)
    }

    private async handleWithCreateNewInvestment(){
        const displayTitle = new Display()
        const apiServiceObj = new ApiService()
        console.log(displayTitle.getCreateNewInvestment())


        // ID: 1
        // Tipo do investimento: Test Type
        // Nome do investimento:   Test Name
        // Total investido:  1000
        // Data da aplicação:  Test data

        // INFORMAÇÕES DO BANCO ATRELADO AO INVESTIMENTO

        // ID do Banco ou corretora:  undefined
        // Banco ou corretora:  Nubank
        // Valor total de investimentos nesse banco:  1000

        const interactWithUserObj = new InteractWithUser()
        
        let message = "Digite o tipo do investimento (Renda fixa ou variável): "
        
        const investmentType = await interactWithUserObj.interactWithUser(message)
        message = "Digite o nome do investimento: "
        const investmentName =  await interactWithUserObj.interactWithUser(message)
        message = "Digite o total investido (Fique a vontade para usar pontos e vírgulas caso queira, mas não é obrigatório)"
        const totalInvested = (await interactWithUserObj.interactWithUser(message)).replace(".", "").replace(",", "")
        console.log(totalInvested)
        message = "Digite a data da aplicação: "
        const applicationDate =  await interactWithUserObj.interactWithUser(message)
        message = "Digite o ID do banco onde o investimento foi realizado: "
        const bankId = await interactWithUserObj.interactWithUser(message)


        const investment = new CreateNewInvestmentDTO(
            investmentType,
            investmentName,
            parseFloat(totalInvested),
            applicationDate,
            parseInt(bankId)
        )

       
     await apiServiceObj.createNewInvestment(investment)
     console.log("INVESTIMENTO CRIADO COM SUCESSO")
     
        this.displayInvestmentList()


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


import { Display } from "src/cli.utils/display"
import { StringFormatter } from "src/cli.utils/string-formatter"
import { InvestmentDTO } from "src/models/investment.dto"
import { ApiService } from "src/service/api.service"
import * as readline from 'readline';
import { InteractWithUser } from "src/cli.utils/interact-with-user";
import { CreateNewInvestmentDTO } from "src/service/create-new-investment.dto";
import { UpdateInvestmentDTO } from "src/service/update-investment.dto";

export class InvestmentsMenu {

    async displayInvestmentList() {
        const service = new ApiService()
        const apiResponse = await service.getData()
        const displayTitle = new Display()
        console.log(displayTitle.getInvestmentsMenuTitle())
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
        const stringFormatter = new StringFormatter()
        let totalMoney = 0

        investmentList.forEach( (i: InvestmentDTO) => {
            console.log( `
            ID: ${i.id}
            Tipo do investimento: ${i.type}
            Nome do investimento:   ${i.name}
            Total investido:  ${ stringFormatter.formatMoneyValue(i.totalInvested)}
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

        switch(answer){
            case '1': {
                this.handleWithCreateNewInvestment() 
                break
            }
            case '2': {
                this.handleWithUpdateInvestment()
                break
            }
            default: {
                console.log('OPÇÃO INVÁLIDA')
            }
        }
        
    }

    private async displayInvestmentsOptions() {
        const interactWithUserObj = new InteractWithUser()
        const message = `

         Escolha a opção desejada:

         1- Criar novo investmento:
         2- Atualizar Investimento:
         `

        let answer = await interactWithUserObj.interactWithUser(message)
        this.handleWithInvestmentOptions(answer)
    }

    private async handleWithCreateNewInvestment(){
        const displayTitle = new Display()
        const apiServiceObj = new ApiService()
        console.log(displayTitle.getCreateNewInvestment())
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
        const investmentId = await interactWithUserObj.interactWithUser(`
        Insira o ID do investimento que deseja alterar:
        `)
     
        const investmentType =  await interactWithUserObj.interactWithUser(`
        Insira o tipo do investimento (Renda Fixa ou Variável)
        `)

        const investmentName =  await interactWithUserObj.interactWithUser(`
        Insira o nome do investimento EX: FII, CDB
        `)

        const totalInvested =  await interactWithUserObj.interactWithUser(`
        Insira o total investido. EX: 1.252,00: 
        `)


        const applicationDate =  await interactWithUserObj.interactWithUser(`
        Insira a data em que fez essa aplicação: 
        `)

        const bankId =  await interactWithUserObj.interactWithUser(`
        Insira o ID do banco onde o investimento está custodiado: 
        `)

        const investment = new UpdateInvestmentDTO(
            parseInt(investmentId), 
            investmentType,
            investmentName,
            totalInvested.replace(".", "").replace(",", ""),
            applicationDate,
            parseInt(bankId)
        )
        

        // Mock
        // const investment = new UpdateInvestmentDTO(
        //     10,
        //     "Renda Fixa",
        //     "Tesouro Selic",
        //     "1.242,00".replace(".", "").replace(",", ""),
        //     'Data ainda não infaormada',
        //     parseInt('1')
        // )

        const response = await apiServiceObj.updateInvestment(investment)
        
        //TODO: Fazer verificação de sucesso aqui e tratar erros
         console.log(`

                                                            INVESTIMENTO ATUALIZADO COM SUCESSO
         
         `)
         console.log('#'.repeat(150))
         console.log('#'.repeat(150))
         console.log(`
         
         LISTA DE INVESTIMENTOS ATUALIZADA: 
         
         `)
         



         const apiResponse = await apiServiceObj.getData()
         const investmentList =  await apiResponse.data.getInvestments.map( (i) => {
       
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

}


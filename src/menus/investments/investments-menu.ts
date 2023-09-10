import { Display } from "src/cli.utils/display"
import { StringFormatter } from "src/cli.utils/string-formatter"
import { InvestmentDTO } from "src/models/investment.dto"
import { ApiService } from "src/service/api.service"


export class InvestmentsMenu {


    async handleWithResponse() {
        const service = new ApiService()
        const apiResponse = await service.getData()
        const investmentList =  apiResponse.data.getInvestments.map( (i) => {
            return new InvestmentDTO(
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
    }


    
}


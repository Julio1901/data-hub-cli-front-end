
import { Display } from 'src/cli.utils/display';
import * as readline from 'readline';
import { ApiService } from 'src/service/api.service';
import { IResponseData } from 'src/service/response-data.interface';
import { InvestmentDTO } from 'src/models/investment.dto';
import { BankDTO } from 'src/models/bank.dto';

   
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

export class InitialMenu {
 

    async main() {
        const display = new Display()
        console.log(display.getProgramName())
        this.requestInitialOption()
    }

        
    private requestInitialOption(){
        readLine.question(`
Escolha a opção desejada: \n
1- Investimentos
2- Alterar gastos fixos
3- Verificar saldo total\n
Entre com a opção desejada: `, (answer) => {
            this.handleWithInitialOption(answer)
        })
    }
    

    private async handleWithInitialOption(userInput: string) {

        if (userInput === '1') {
            const service = new ApiService()
            const apiResponse = await service.getData()

            const investmentResponse = new InvestmentDTO(
                apiResponse.data.getInvestments.type,
                apiResponse.data.getInvestments.name,
                apiResponse.data.getInvestments.totalInvested,
                apiResponse.data.getInvestments.applicationDate,
                apiResponse.data.getInvestments.bank
            )
                


            console.log(investmentResponse.bank.name)


        }else{
            //Refatorar e fazer função que cria looping até o usuário escolher algo válido
            console.log('Opção inválida')
        }


    }

    

}
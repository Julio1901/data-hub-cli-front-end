
import { Display } from 'src/cli.utils/display';
import * as readline from 'readline';
import { InvestmentsMenu } from './investments/investments-menu';
import { InteractWithUser } from 'src/cli.utils/interact-with-user';

   
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

        
    private async requestInitialOption(){

        const interactWithUserObj = new InteractWithUser()

        let message = `
        Escolha a opção desejada: \n
        1- Investimentos
        2- Alterar gastos fixos
        3- Verificar saldo total\n
        Entre com a opção desejada: `

        // const answer = await interactWithUserObj.interactWithUser(message)

        // this.handleWithInitialOption(answer)

        readLine.question(message, (answer) => {
            this.handleWithInitialOption(answer)
        })
    }
    

    private async handleWithInitialOption(userInput: string) {

        if (userInput === '1') {
            const investmentsMenuObject = new InvestmentsMenu()
            await investmentsMenuObject.handleWithResponse()

        }else{
            //Refatorar e fazer função que cria looping até o usuário escolher algo válido
            console.log('Opção inválida')
        }


    }

    

}
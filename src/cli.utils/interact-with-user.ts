
import * as readline from 'readline';



// export class InteractWithUser{

//      interactWithUser(messageToDisplay: string, action?: (answer: string) => void) {
//         const readLine = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         });
    
//         readLine.question(messageToDisplay, (answer) => { action(answer) })
//     }
// }



export class InteractWithUser {
    
    interactWithUser(messageToDisplay: string): Promise<string> {
      return new Promise((resolve) => {
        const readLine = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          terminal: false
        });
  
        readLine.question(messageToDisplay, (answer) => {
          resolve(answer);
          readLine.close(); // Certifique-se de fechar a interface após obter a resposta
        });
      });
    }


    cleanTerminal(){
        console.log('\n'.repeat(50))
    }


}
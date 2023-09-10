

export class StringFormatter {

    formatMoneyValue (monetaryValue: number)  : string {
        return (monetaryValue / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
     }


}
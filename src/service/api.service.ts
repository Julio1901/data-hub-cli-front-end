import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ApiService{

    async getData() : Promise<string> {

    //     const query = `
    //     query {
    //       user
    //     }
    //   `;
    
      //IMPORTANTE: O NOME DA CONST TEM QUE SER QUERY SE NÃO DÁ ERRO
      const query = `
      query {
        getInvestments {
          type
          name
          applicationDate
          totalInvested
          bank {
            name
            savedMoney
          }
        }
      }
    `;
        try{
            const response = await axios.post('http://localhost:3000/graphql', {
                query})
            return response.data
        } catch(error) {
            throw error
            return "API Error"
        }
    

    }

}
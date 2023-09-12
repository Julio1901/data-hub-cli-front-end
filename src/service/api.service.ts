import { Injectable } from "@nestjs/common";
import axios from "axios";
import { IResponseData } from "./response-data.interface";







@Injectable()
export class ApiService{

    async getData() : Promise<IResponseData> {

      //IMPORTANTE: O NOME DA CONST TEM QUE SER QUERY SE NÃO DÁ ERRO
      const query = `
      query {
        getInvestments {
          id
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
            const response = await axios.post<IResponseData>('http://localhost:3000/graphql', {
                query})
            return response.data
        } catch(error) {
            throw error
        }
    }


    async updateInvestment(investmentId: number, newValue: number) {

      const mutation = `
      mutation {
        updateInvestment(data: {
            id: ${investmentId},
            newValue: ${newValue}
          })
      }

      `

      try {
        const response = await axios.post('http://localhost:3000/graphql', {query: mutation})
        return response.data
      }catch(error) {
        throw error
    }

    }

}
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { IResponseData } from "./response-data.interface";
import { CreateNewInvestmentDTO } from "./create-new-investment.dto";







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

 async createNewInvestment(investment: CreateNewInvestmentDTO){
  const mutation = `
    mutation {
      createNewInvestment(data: {
        type: "${investment.type}",
        name: "${investment.name}",
        totalInvested: ${investment.totalInvested},
        applicationDate: "${investment.applicationDate}",
        bankId: ${investment.bankId}
      })
    }
  `

  try{
    //TODO Tratar esse response e verificar se foi em sucedido
     const response = await axios.post('http://localhost:3000/graphql', {query: mutation})
  }catch(error){
    throw error
  }
 }


}
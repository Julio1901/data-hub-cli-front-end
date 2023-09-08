import { IInvestmentData } from "src/interfaces/investment.interface";


export interface IResponseData {
    data: {
      getInvestments: IInvestmentData;
    };
  }
  
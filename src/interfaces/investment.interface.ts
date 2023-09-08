import { IBankData } from "./bank.interface";



export interface IInvestmentData {
    type: string;
    name: string;
    applicationDate: string;
    totalInvested: number;
    bank: IBankData;
  }
  


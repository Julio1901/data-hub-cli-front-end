import { IBankData } from "./bank.interface";



export interface IInvestmentData {
    id: number
    type: string;
    name: string;
    applicationDate: string;
    totalInvested: number;
    bank: IBankData;
  }
  


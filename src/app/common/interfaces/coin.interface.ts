import { Coin } from "../models/coin.model";

export interface ICoinsResponse {
  total: number;
  coins: Coin[];
}

export interface IAllCoinsResponse {
  ok: boolean;
  coins: Coin[];
}

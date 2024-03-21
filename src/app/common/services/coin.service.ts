import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coin } from '../models/coin.model';
import { COIN_URL } from '../constant/api-url.constant';
import { IAllCoinsResponse, ICoinsResponse } from '../interfaces/coin.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  coin!: Coin;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getCoins(params: string): Observable<ICoinsResponse> {
    const url = `${baseUrl}/${COIN_URL.getCoins}?${params}`;
    return this.http.get<ICoinsResponse>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getAllCoins(): Observable<Array<Coin>> {
    const url = `${baseUrl}/${COIN_URL.getCoins}`;
    return this.http.get<IAllCoinsResponse>(url, this.headers)
      .pipe(
        map(resp => resp.coins)
      );
  }

  getCoin(coinId: string): Observable<Coin> {
    const url = `${baseUrl}/${COIN_URL.getCoin}/${coinId}`;
    return this.http.get<Coin>(url, this.headers);
  }

  createCoin(data: Coin): Observable<Coin> {
    const url = `${baseUrl}/${COIN_URL.createCoin}`;
    return this.http.post<Coin>(url, data, this.headers);
  }

  updateCoin(data: Coin, coinId: string): Observable<Coin> {
    const url = `${baseUrl}/${COIN_URL.updateCoin}/${coinId}`;
    return this.http.put<Coin>(url, data, this.headers);
  }

  updateCoinContact(data: Coin): Observable<Coin> {
    const url = `${baseUrl}/${COIN_URL.updateCoin}/${data.coin_id}`;
    return this.http.put<Coin>(url, data, this.headers);
  }

  deleteCoin(id: string) {
    const url = `${baseUrl}/${COIN_URL.deleteCoin}/${id}`;
    return this.http.delete(url, this.headers);
  }

}

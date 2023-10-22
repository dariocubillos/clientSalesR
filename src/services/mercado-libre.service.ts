import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { ProductMercadoLibre } from '../models/product-mercado-libre';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreService {

  constructor(private http: HttpClient) { }


  searchProducts(productQuery: Search): Observable<HttpResponse<ProductMercadoLibre>> { //TODO: add new set of search query
    return this.http.post<any>(`${environment.endPoint}/createSearch`, productQuery);
  }

  createSearch(searchData: Search): Observable<Search>{
    return this.http.post<any>(`${environment.endPoint}/createSearch`,searchData);
  }

  updateSearch(searchData: Search): Observable<Search>{
    return this.http.patch<any>(`${environment.endPoint}/search/${searchData.slug}`,searchData);
  }

  deleteSearch(searchData: Search): Observable<void> {
    return this.http.delete<any>(`${environment.endPoint}/search/${searchData.slug}`);
  }

  getSearches(): Observable<Search[]> {
    return this.http.get<any>(`${environment.endPoint}/searches`);
  }

  getAllProducts(): Observable<Search[]> {
    return this.http.get<any>(`${environment.endPoint}/products`);
  }

}

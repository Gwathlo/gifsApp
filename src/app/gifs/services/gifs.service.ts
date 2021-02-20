import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'obHYhAIcvnaMu1uMUsJd6FW8xaJsV8qW';

  private urlService: string = 'https://api.giphy.com/v1/gifs';

  private searchPath: string = '/search';

  private history: string[] = [];

  public results: Gif[] = [];

  get historial() {
    return [...this.history];
  }

  constructor( private http: HttpClient) {

    // if( localStorage.getItem('history') ){
    //   this.history = JSON.parse( localStorage.getItem('history')!);
    // }
    this.history = JSON.parse( localStorage.getItem('history')!) || [];
    this.results = JSON.parse( localStorage.getItem('lastSearch')!) || [];
    

  }

  searchGifs( query: string = '' ){

    query = query.trim().toLocaleLowerCase();

    if ( !this.history.includes(query)) {
      this.history.unshift( query );
      this.history = this.history.splice(0,10);

      localStorage.setItem('history', JSON.stringify(this.history));
    }
    
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit','20')
        .set('q',query);

    this.http.get<SearchGifsResponse>(`${ this.urlService }${ this.searchPath }`, { params })
      .subscribe( (resp) => {
        this.results = resp.data;
        localStorage.setItem('lastSearch', JSON.stringify(this.results));
      });
    
  }

}

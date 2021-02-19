import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

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
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=obHYhAIcvnaMu1uMUsJd6FW8xaJsV8qW&limit=20&q=${ query }`)
      .subscribe( (resp) => {
        this.results = resp.data;
        localStorage.setItem('lastSearch', JSON.stringify(this.results));
      });
    
  }

}

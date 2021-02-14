import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private history: string[] = [];

  get historial() {
    return [...this.history];
  }

  searchGifs( query: string ){
    this.history.unshift( query );

    console.log(this.history);
    
  }

}

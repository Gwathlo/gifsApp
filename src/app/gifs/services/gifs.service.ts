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

    if ( !this.history.includes(query)) {
      this.history.unshift( query );
    }
    
    this.history = this.history.splice(0,10);
    console.log(this.history);
    
  }

}

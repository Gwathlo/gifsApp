import { Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar() {
    console.log( this.txtBuscar.nativeElement.value );

    this.txtBuscar.nativeElement.value = '';
  }

}

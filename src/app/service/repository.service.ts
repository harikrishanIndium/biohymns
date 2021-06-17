import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor() { }
  private data = {};  
  
  setOption(option, value) {      
     this.data[option] = value;  
     console.log("this.data",this.data)
   }  
   
   getOption() {  
     return this.data;  
   } 
}

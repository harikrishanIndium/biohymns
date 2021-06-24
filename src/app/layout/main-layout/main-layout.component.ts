import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  navOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  onNavOpenChange() {
    if (this.navOpen) this.navOpen = false
    else this.navOpen = true;
  }
  logout() {
    sessionStorage.removeItem('idtoken');
  }

}

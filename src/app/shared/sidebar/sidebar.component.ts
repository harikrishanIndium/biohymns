import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { onSideNavChange, animateText } from '../../shared/animation'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [onSideNavChange, animateText]
})
export class SidebarComponent implements OnInit,OnChanges {
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  @Input("navOpen") navOpen;
  @ViewChild("drawer") public drawer;
  public pages = [
    {name: 'Dashboard', link:'dashboard', icon: 'dashboard'},
    {name: 'Projects', link:'projects', icon: 'domain'},
    // {name: 'Files', link:'some-link', icon: 'send'},
  ]

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChanges){
    if(this.drawer){
      if(this.navOpen) this.drawer.open()
      else this.drawer.close()
    }
  }
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    // this._sidenavService.sideNavState$.next(this.sideNavState)
  }
}

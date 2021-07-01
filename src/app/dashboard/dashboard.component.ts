import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from '../service/repository.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, public service: RepositoryService) { }
  totalcount: any;
  filecount: any;
  ngOnInit(): void {
    //project count start
    this.service.getProjects().subscribe(data => {
      this.totalcount = data.length + " Projects";
    });
    //project count end
    this.service.getFiles().subscribe(data => {
      this.filecount = data.length + " files";
    })
  }

  gotToProjects(string) {
    
    if (string == "projects") {
      this.router.navigateByUrl("projects");
    }
    else {
      this.router.navigateByUrl("file-upload")
    }

  }
 
}

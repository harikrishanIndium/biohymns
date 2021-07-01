import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio/radio';
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
  //radio button start
  //radio button start
  selectedStatus: any;
  eventEditForm!: FormGroup;
  public toggleForm!: boolean;

  someName = [
    { name: "Super Admin", id: "1", },
    { name: "Admin", id: "2", },
    { name: "Author", id: "3", },
    { name: "Reviewer", id: "3", },
    { name: "Approver", id: "3", }
  ];

  //radio button end
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

  adminProjects(string) {
    if (string == "projects") {
      this.router.navigate(["project",this.name])
    }
    // else if (string == "user") {
    //   this.router.navigateByUrl("superadmin/user");
    // }
    // else {
    //   this.router.navigateByUrl("superadmin/userlogs")
    // }
  }
  gotToProjects(string) {

    if (string == "projects") {
      this.router.navigateByUrl("projects");
    }
    else {
      this.router.navigateByUrl("file-upload")
    }

  }
  change(selectedStatus) {
    console.log(selectedStatus)

  }
  superadmin: boolean = false;
  admin: boolean = false;
  author: boolean = false;
  user: boolean = false;
  radio: boolean = true;
  back: boolean = false;
  name: any;

  radioChange(event) {
    this.back = true
    this.name = event;
    if (event == "Super Admin") {
      this.superadmin = true;
      this.admin = false;
      this.author = false;
      this.radio = false;

    }
    else if (event == "Admin") {
      this.superadmin = false;
      this.admin = true;
      this.author = false;
      this.radio = false;
    }
    else {
      this.superadmin = false;
      this.admin = false;
      this.author = true;
      this.radio = false;
    }
  }
  closeProjectView() {
    this.superadmin = false;
    this.admin = false;
    this.author = false;
    this.radio = true;
    this.back = false;
  }
}

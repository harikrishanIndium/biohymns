import { AfterViewInit, Component, ViewChild, EventEmitter, OnInit, Output, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  { id: 1, project_name: 'Hydrogen', assign_name: 'Jamesh', assign_date: '2021-01-02', file: '../assets/files/sample.pdf' },
  { id: 2, project_name: 'Hydrogen', assign_name: 'Jack', assign_date: '2021-02-02', file: '../assets/files/sample.pdf' },
  { id: 3, project_name: 'Hydrogen', assign_name: 'Sandy', assign_date: '2021-03-02', file: '../assets/files/sample.pdf' },
  { id: 4, project_name: 'Hydrogen', assign_name: 'Millan', assign_date: '2021-04-02', file: '../assets/files/sample.pdf' },
  { id: 5, project_name: 'Hydrogen', assign_name: 'Bosly', assign_date: '2021-05-02', file: '../assets/files/sample.pdf' },
  { id: 6, project_name: 'Hydrogen', assign_name: 'Naren', assign_date: '2021-01-02', file: '../assets/files/sample.pdf' },

];


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute,) { }
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  displayedColumns: string[] = ['Id', 'Project', 'Assigned', 'Assigned Date', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  croppopup: boolean = false;
  project: any = { id: "", project_name: "", assign_name: "", assign_date: "", file: "" };
  path2: any;
  editdiv: boolean = false;
  editbtn: boolean = false;
  superdiv: boolean = true;
  adminupload: boolean = false;
  // toppings = new FormControl();
  admindiv: boolean = false;
  toppingList = ['Author', 'Reviewer', 'Approver',];
  selectedToppings;

  ngOnInit(): void {
    let path = this.route.snapshot.url;
    this.path2 = path[1].toString();
    if (this.path2 == "Admin") {
      this.editbtn = true;
    }

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  showUploadfileSection() {
    if (this.path2 == "Admin") {
      this.adminupload = true;
    }
    else {
      this.croppopup = true;
    }

  }
  uploadFileEvt(imgFile: any) {
    this.project.file = imgFile.target.files[0].name;

  }
  cancel() {
    if (this.path2 == "Admin") {
     this.adminupload=false;
    }
    else {
      this.croppopup = false;
    }
    
  }
  open(data) {
    window.open(data.file);
  }
  edit(data) {
    this.project = data;
    this.editdiv = true;
    this.superdiv = false;
  }
  editadmin(data) {
    this.project = data;
    this.admindiv = true;
    this.editdiv = false;
    this.superdiv = false;

  }
  upcancel() {
    if (this.path2 == "Admin") {
      this.admindiv=false;
      this.superdiv=true;
    }
    else {
      this.editdiv = false;
      this.superdiv=true;
    }
    
  }
  create() {
    console.log(this.project);
    // this.dataSource = new MatTableDataSource(Object.assign({},this.project));
  }
  delete(data) {
    console.log(this.dataSource.filteredData);
    let test = this.dataSource.filteredData.splice(data, 1);
    console.log(test);
  }

}

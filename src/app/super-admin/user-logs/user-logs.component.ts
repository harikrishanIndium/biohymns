



import { AfterViewInit, Component, ViewChild, EventEmitter, OnInit, Output, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  { id: 1, project_name: 'Hydrogen', file_name: 'test1.pdf', admin_name: 'Jamesh', type: 'Admin', status: 'Approved', },
  { id: 1, project_name: 'Hydrogen', file_name: 'test2.pdf', admin_name: 'Jack', type: 'Admin', status: 'Approved', },
  { id: 1, project_name: 'Hydrogen', file_name: 'test3.pdf', admin_name: 'Sandy', type: 'Author', status: 'Pending', },
  { id: 1, project_name: 'Hydrogen', file_name: 'test4.pdf', admin_name: 'Jack', type: 'Approver', status: 'Pending', },
  { id: 1, project_name: 'Hydrogen', file_name: 'test5.pdf', admin_name: 'Sandy', type: 'Approver', status: 'Pending', },
  { id: 1, project_name: 'Hydrogen', file_name: 'test6.pdf', admin_name: 'Sandy', type: 'Author', status: 'Pending', },

];


@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.css']
})
export class UserLogsComponent implements OnInit {

  constructor() { }
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  displayedColumns: string[] = ['Id', 'ProjectName', 'File', 'User', 'Type', 'Status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  croppopup: boolean = false;
  project = { name: "", admin: "", file: "", status: "" };

  countries: any = [
    {
      full: "Great Britain",
      short: "GB"
    },
    {
      full: "United States",
      short: "US"
    },
    {
      full: "Canada",
      short: "CA"
    }
  ];
  ngOnInit(): void {


  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  showUploadfileSection() {
    this.croppopup = true;
  }
  uploadFileEvt(imgFile: any) {
    this.project.file = imgFile.target.files[0].name;

  }
  cancel() {
    this.croppopup = false;
    this.project.name = "";
    this.project.admin = "";
    this.project.file = "";
  }


}



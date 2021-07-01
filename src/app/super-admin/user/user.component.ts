
import { AfterViewInit, Component, ViewChild, EventEmitter, OnInit, Output, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  { id: 1, admin_name: 'Jamesh', type: 'Admin', status: 'Active', },
  { id: 2, admin_name: 'Jack', type: 'Admin', status: 'Active', },
  { id: 3, admin_name: 'Sandy', type: 'Author', status: 'Active', },
  { id: 4, admin_name: 'Bosly', type: 'Reviewer', status: 'Active', },
  { id: 5, admin_name: 'Millan', type: 'Approver', status: 'Active', },
  { id: 6, admin_name: 'Naren', type: 'Approver', status: 'Active', },

];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  displayedColumns: string[] = ['Id', 'Name', 'Type', 'Status','Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  croppopup: boolean = false;
  project = { name: "", admin: "", file: "",status:"" };

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


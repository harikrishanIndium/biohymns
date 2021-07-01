import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-log-management',
  templateUrl: './log-management.component.html',
  styleUrls: ['./log-management.component.css']
})
export class LogManagementComponent implements OnInit {
  filterByNumber : string;
  filterByName : string;
  filterByUser : string;
  filterByDate : string;
  displayedColumns: string[] = ['No', 'Project', 'File', 'User', 'User_Type', 'Notes', 'Date'];
  data = [
    {
       No:1001,
       Project:"Project 1",
       File:"File_Project1",
       User:"John",
       User_Type:"Super Admin",
       Notes:"Management Project",
       Date:"21/09/2021"
    },
    {
       No:1002,
       Project:"Project 2",
       File:"File_Project2",
       User:"Kumar",
       User_Type:"Admin",
       Notes:"Management Project 2",
       Date:"22/09/2021"
    },
    {
       No:1003,
       Project:"Project 3",
       File:"File_Project3",
       User:"John",
       User_Type:"User",
       Notes:"Management Project 3",
       Date:"23/09/2021"
    },
    {
       No:1004,
       Project:"Project 4",
       File:"File_Project4",
       User:"John",
       User_Type:"Super Admin",
       Notes:"Management Project 909",
       Date:"24/09/2021"
    },
    {
       No:1005,
       Project:"Project 5",
       File:"File_Project5",
       User:"Mikul",
       User_Type:"Admin",
       Notes:"Management Project 5",
       Date:"25/09/2021"
    },
    {
       No:1006,
       Project:"Project 6",
       File:"File_Project6",
       User:"Lion",
       User_Type:"Super Admin",
       Notes:"Management Project 6",
       Date:"26/09/2021"
    },
    {
       No:1007,
       Project:"Project 7",
       File:"File_Project7",
       User:"Hari",
       User_Type:"Super Admin",
       Notes:"Management Project 007",
       Date:"27/09/2021"
    },
    {
       No:1008,
       Project:"Project 8",
       File:"File_Project8",
       User:"Priya",
       User_Type:"Admin",
       Notes:"Management Project 8",
       Date:"28/09/2021"
    },
    {
       No:1009,
       Project:"Project 9",
       File:"File_Project9",
       User:"Senthil",
       User_Type:"Super Admin",
       Notes:"Management Project 9",
       Date:"29/09/2021"
    },
    {
       No:1010,
       Project:"Project 10",
       File:"File_Project10",
       User:"Tiger",
       User_Type:"Admin",
       Notes:"Management Project 10",
       Date:"30/09/2021"
    }
 ]
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { 
   this.filterByNumber = '';
   this.filterByName = '';
   this.filterByUser = '';
   this.filterByDate = '';
  }

  ngOnInit(): void {
    let val: any = this.data
    this.dataSource = new MatTableDataSource(val);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  onSearchChange(){
   let logData = this.data;
   let filterData =[];
   // console.log("this.filterByNumber", this.filterByNumber)
   // console.log("this.filterByName", this.filterByName)
   // console.log("this.filterByNumber", this.filterByNumber)
   if(this.filterByNumber.length!=0){
      logData.filter(data => {
         console.log("__data", data)
         if(data.No == parseInt(this.filterByNumber)){
            console.log("this.filterByNumber", this.filterByNumber)
         }
      });
   }  
  }

}

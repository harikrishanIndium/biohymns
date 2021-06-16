
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as _ from 'lodash';
import { Router } from '@angular/router';

const ELEMENT_DATA = [
  {id: 1, name: 'Project 1', files: 1},
  {id: 2, name: 'Project 2', files: 4},
  {id: 3, name: 'Project 3', files: 6},
  {id: 4, name: 'Project 5', files: 9},
  {id: 5, name: 'Project 4', files: 10},
  {id: 6, name: 'Project 7', files: 12},
  {id: 7, name: 'Project 8', files: 14},
  {id: 8, name: 'Project 9', files: 15},
  {id: 9, name: 'Project 11', files: 18},
  {id: 10, name: 'Project 12', files: 20},
];

const FILE_DATA = [
  {id: 1, name: 'File 1', files: 1},
  {id: 2, name: 'File 2', files: 4},
  {id: 3, name: 'File 3', files: 6},
  {id: 4, name: 'File 5', files: 9},
  {id: 5, name: 'File 4', files: 10},
  {id: 6, name: 'File 7', files: 12},
  {id: 7, name: 'File 8', files: 14},
  {id: 8, name: 'File 9', files: 15},
  {id: 9, name: 'File 11', files: 18},
  {id: 10, name: 'File 12', files: 20},
];
/**
 * @title Table with sorting
 */

 @Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent implements AfterViewInit {
  //file upload start
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  //file upload end
  displayedColumns: string[] = ['id', 'name', 'files', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filesDisplayedColumns: string[] = ['id', 'name', 'action'];
  filesDataSource = new MatTableDataSource(FILE_DATA)
  listOfProjectView : boolean=true;
  projectView: boolean=false;
  selectedProject:any;
  uploadFileSection:boolean = false;
  addlistOfProjectView:boolean=false;
  croppopup:boolean=false;
  @ViewChild(MatSort) sort!: MatSort;

  progress: number = 0;
  fileView:boolean = false;
  constructor(private router: Router) { }

  ngOnInit(){
    this.listOfProjectView=true;
    this.projectView=false
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.filesDataSource.sort = this.sort;
  }
  viewProjectModel(id){
    this.listOfProjectView=false;
    this.addlistOfProjectView=true;
    this.projectView=true
    this.selectedProject = _.find(ELEMENT_DATA, {id:id})
  }
  showUploadfileSection(){
    this.croppopup=true;
  }
  editModel(){
    this.croppopup=true;
  }
  cancel(){
    this.croppopup=false;
  }
  //file uploade start
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }
  closeProjectView(){
    this.listOfProjectView = true;
    this.projectView =false;
    this.fileView=false;
  }
  editFile(){
    // this.router.navigateByUrl("/manual")
    this.projectView =false;
    this.fileView=true;
  }
  closeFileView(){
    this.projectView =true;
    this.fileView=false;
  }
  // reorderFiles(reorderEvent: CustomEvent): void {
    
  //   let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
  //   this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  // }

  //file upload end
  
}



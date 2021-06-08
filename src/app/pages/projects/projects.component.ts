
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as _ from 'lodash';

const ELEMENT_DATA = [
  {id: 1, name: 'Hydrogen', files: 1},
  {id: 2, name: 'Helium', files: 4},
  {id: 3, name: 'Lithium', files: 6},
  {id: 4, name: 'Beryllium', files: 9},
  {id: 5, name: 'Boron', files: 10},
  {id: 6, name: 'Carbon', files: 12},
  {id: 7, name: 'Nitrogen', files: 14},
  {id: 8, name: 'Oxygen', files: 15},
  {id: 9, name: 'Fluorine', files: 18},
  {id: 10, name: 'Neon', files: 20},
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
  listOfProjectView : boolean=true;
  projectView: boolean=false;
  selectedProject:any;
  uploadFileSection:boolean = false;
  addlistOfProjectView:boolean=false;
  croppopup:boolean=false;
  @ViewChild(MatSort) sort!: MatSort;

  progress: number = 0;

  ngOnInit(){
    this.listOfProjectView=true;
    this.projectView=false
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  // reorderFiles(reorderEvent: CustomEvent): void {
    
  //   let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
  //   this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  // }

  //file upload end
  
}



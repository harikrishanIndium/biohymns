
import { AfterViewInit, Component, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FileQueueObject, RepositoryService } from '../../service/repository.service';
import { Observable } from 'rxjs';


// const FILE_DATA = [
//   { id: 1, name: 'File 1', files: 1 },
//   { id: 2, name: 'File 2', files: 4 },
//   { id: 3, name: 'File 3', files: 6 },
//   { id: 4, name: 'File 5', files: 9 },
//   { id: 5, name: 'File 4', files: 10 },
//   { id: 6, name: 'File 7', files: 12 },
//   { id: 7, name: 'File 8', files: 14 },
//   { id: 8, name: 'File 9', files: 15 },
//   { id: 9, name: 'File 11', files: 18 },
//   { id: 10, name: 'File 12', files: 20 },
// ];
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
  [x: string]: any;
  @Output() onCompleteItem = new EventEmitter();
  queue!: Observable<FileQueueObject[]>;

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  //file upload end
  displayedColumns: string[] = ['id', 'name', 'files', 'action'];
  dataSource = new MatTableDataSource();
  filesDisplayedColumns: string[] = ['id', 'name', 'action'];
  filesDataSource = new MatTableDataSource()
  listOfProjectView: boolean = true;
  projectView: boolean = false;
  selectedProject: any;
  uploadFileSection: boolean = false;
  addlistOfProjectView: boolean = false;
  croppopup: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;

  progress: number = 0;
  fileView: boolean = false;
  path2: any;
  addproject: boolean = false;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fileAttr: any;
  base64: any;
  prjData = { project_name: "" }
  constructor(private router: Router, public service: RepositoryService, private route: ActivatedRoute,) { }

  ngOnInit() {
    //file upload kishore start
    this.queue = this.service.queue;
    this.service.onCompleteItem = this.completeItem;
    //file upload kishore end

    let path = this.route.snapshot.url;
    this.path2 = path[0].toString();
    if (this.path2 == "projects") {
      this.service.getProjects().subscribe(data => {
        this.listOfProjectView = true;
        this.projectView = false;
        this.dataSource = new MatTableDataSource(data);
      }, error => {
      });
    }
    else {
      this.service.getFiles().subscribe(data => {
        console.log("dataaaaaaa", data);
        this.listOfProjectView = false;
        this.addlistOfProjectView = true;
        this.projectView = true
        this.filesDataSource = new MatTableDataSource(data);
      }, error => {
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.filesDataSource.sort = this.sort;
  }
  project_id: any;
  viewProjectModel(id) {
    this.project_id = "";
    this.project_id = id;
    this.service.getSingleProject(id).subscribe(data => {
      this.filesDataSource = new MatTableDataSource(data);
      this.listOfProjectView = false;
      this.addlistOfProjectView = true;
      this.projectView = true
    }, error => {

    });
  }
  showUploadfileSection() {
    this.croppopup = true;
  }

  editModel() {
    this.croppopup = true;
  }
  cancel() {
    this.croppopup = false;
    this.viewProjectModel(this.project_id);
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
  closeProjectView() {
    if (this.path2 == "projects") {
      this.listOfProjectView = true;
      this.projectView = false;
      this.fileView = false;
    }
    else {
      this.router.navigateByUrl("dashboard");
    }

  }

  editFile(id) {
    this.service.getSingleFiles(id).subscribe(data => {
      this.projectView = false;
      this.fileView = true;
      console.log(data)
      this.base64 = data.file;
      console.log("this.base6", this.base64)
      sessionStorage.setItem("baseData", this.base64);
    });
    // this.router.navigateByUrl("/manual")

  }
  closeFileView() {
    this.projectView = true;
    this.fileView = false;
  }
  //file upload end
  fileModal() {
    this.addproject = true;
    this.listOfProjectView = false;
    this.projectView = false;
    this.fileView = false;

  }
  cancelProject() {
    this.ngOnInit();
    this.addproject = false;
    let array = [];
    this.service.clearQueue();
  }
  //project create api start
  createProject() {
    this.service.postProject(this.prjData).subscribe(data => {
      this.ngOnInit();
      this.addproject = false;
    })
  }
  //project create pai end

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }
  employeefilepath1: any = [];
  
  fileSelected(event) {
    // this.employeefilepath1 = [];
    // this.employeefilepath1.push(event.target.files[0]);
    this.employeefilepath = event.target.files[0];
  }
   addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.service.addToQueue(fileBrowser.files);
   }
  uploadfunction() {

    const formData = new FormData();
    formData.append("file", this.employeefilepath);
    formData.append("project_id", this.project_id);
    this.service.postFile(formData).subscribe(data => {
      console.log("data", data);
      alert("file added");
    })
   


  }



  // }

}




import { AfterViewInit, Component, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import{ MatPaginator} from'@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FileQueueObject, RepositoryService } from '../../service/repository.service';
import { Observable } from 'rxjs';



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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  progress: number = 0;
  fileView: boolean = false;
  path2: any;
  addproject: boolean = false;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fileAttr: any;
  selectedFile: any;
  prjData = { project_name: "" }
  constructor(private router: Router, public service: RepositoryService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    //file upload start
    this.queue = this.service.queue;
    this.service.onCompleteItem = this.completeItem;
    //file upload  end

    let path = this.route.snapshot.url;
    this.path2 = path[0].toString();
    this.service.getProjects().subscribe(data => {
      this.listOfProjectView = true;
      this.projectView = false;
      this.dataSource = new MatTableDataSource(data);
    }, error => {
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.filesDataSource.sort = this.sort;
  }
  project_id: any;
  viewProjectModel(project) {
    this.selectedProject = project
    this.service.getSingleProject(project['id']).subscribe(data => {
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
    this.employeefilepath1 = []
    this.croppopup = false;
    this.viewProjectModel(this.selectedProject);
    this.service.clearQueue();
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
      this.selectedFile = data;
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
    this.addToQueue();
    this.service.uploadAll()
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i]
        this.employeefilepath1.push(file);
        console.log(this.employeefilepath1);
      }
      event.target.value = '';

    }
  }
  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.service.addToQueue(fileBrowser.files);
  }
  uploadfunction() {

    const formData = new FormData();
    for (var i = 0; i < this.employeefilepath1.length; i++) {
      formData.append("file", this.employeefilepath1[i]);
    }
    formData.append("project_id", this.selectedProject['id']);
    this.service.postFile(formData).subscribe(data => {
      console.log("data", data);
      alert("file added successfully");
      this.cancel();
    })
  }



  // }

}



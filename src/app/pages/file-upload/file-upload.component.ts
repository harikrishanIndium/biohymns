import { AfterViewInit, Component, ViewChild, OnInit, ElementRef, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../../service/repository.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fileAttr = 'Choose File';
  redactbtn: boolean = false;
  filepath: any = File;
  constructor(private router: Router, private service: RepositoryService) { }
  ngOnInit(): void {

  }
  project_id: any;
  uploadFileEvt(imgFile: any) {
    this.fileAttr = imgFile.target.files[0].name;
    this.filepath = imgFile.target.files[0]
    this.redactbtn = true;

  }

  redact() {
    const formData = new FormData();
    this.project_id = 1;
    formData.append("file", this.filepath);
    formData.append("project_id", this.project_id);
    this.service.postFile(formData).subscribe(data => {
      this.router.navigate(["redact-file", data.result[0].id])
    });

  }

}

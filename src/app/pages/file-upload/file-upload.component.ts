import { AfterViewInit, Component, ViewChild, OnInit, ElementRef } from '@angular/core';
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
  constructor(private router: Router, private service: RepositoryService) { }
  ngOnInit(): void {

  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = imgFile.target.files[0].name;
      this.redactbtn = true;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.service.setOption("result", e.target.result)
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  redact() {
    this.router.navigateByUrl("redact-file");
  }

}

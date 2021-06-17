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

  
  constructor(private router: Router,private service:RepositoryService) { }

  ngOnInit(): void {
  
  }

  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fileAttr = 'Choose File';
  redactbtn: boolean = false;


  uploadFileEvt(imgFile: any) {
    console.log(imgFile.target.files[0])
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = imgFile.target.files[0].name;
      this.redactbtn = true;
      // Array.from(imgFile.target.files).forEach((file) => {
      //   this.fileAttr += file.name + ' - ';
      // });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
       
        this.service.setOption("result",e.target.result)
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

     

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  redact(){
    this.router.navigateByUrl("redact-file");
  }

}

import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import WebViewer from '@pdftron/webviewer';
import { $ } from 'protractor';
@Component({
  selector: 'app-vaira-manual',
  templateUrl: './vaira-manual.component.html',
  styleUrls: ['./vaira-manual.component.css']
})
export class VairaManualComponent implements OnInit, AfterViewInit {
    @ViewChild('viewer', { static: false }) viewerRef: any;
    pdfSrc1!: string;
    _base64ToArrayBuffer(base64: string) {
      var binary_string = base64.replace(/\\n/g, '');
      binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
    constructor(  private sanitizer: DomSanitizer,) { }
    pdfurl: any;
    ngAfterViewInit() {
      this.input = document.getElementById('file_upload');
      WebViewer({
        path: '../assets/lib',
        initialDoc: this.url
        // initialDoc: '../assets/images/redoc_1.pdf'
      }, this.viewerRef.nativeElement).then(instance => {
  
        const { docViewer, annotManager, CoreControls } = instance;
  
        // const { annotManager } = instance;
        annotManager.on('annotationChanged', async (annotations, action) => {
          const doc = docViewer.getDocument();
          const xfdfString = await annotManager.exportAnnotations();
          const options = { xfdfString };
          const data = await doc.getFileData(options);
          const arr = new Uint8Array(data);
          this.pdfurl = arr;
  
          if (action === 'add') {
            console.log('this is a change that added annotations');
            console.log('11111111111111', annotations);
          } else if (action === 'modify') {
            console.log('this change modified annotations');
          } else if (action === 'delete') {
            console.log('there were annotations deleted');
          }
          annotations.forEach((annot) => {
            console.log('annotation page number', annot.PageNumber);
          });
        });
  
        this.files = instance;
        instance.setTheme('dark');
        this.input.addEventListener('change', () => {
          const file = this.input.files[0];
          instance.loadDocument(file, { filename: file.name });
        });
        this.input.addEventListener('click', () => {
          console.log(this.input);
        });
  
      });
  
    }
  
    ngOnInit(): void {
  
  
    }
    retrievedFile: any;
   
    test1: any;
    filedata: any = { file:'' }
    
  
   

  
  
  
  

    files: any
   
    
    url: any;
    input: any
    onFileChanged(event: any) {
      // this.url = "";
      const files = event.target.files[0];
      this.input = document.getElementById('file_upload');
      // if (files.length === 0)
      //   return;
  
      // const mimeType = files[0].type;
  
      // const reader = new FileReader();
  
      // reader.readAsDataURL(files[0]);
      // reader.onload = (_event) => {
      //   this.url = reader.result;
  
  
      //this.employeefilepath = $event.target.files[0];
  
     
    }
    //}
  
  
  
  
   
}

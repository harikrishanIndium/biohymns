import { Component, Inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import WebViewer from '@pdftron/webviewer';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../service/repository.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const inputOptions = {
  "PPD":"PPD",
  "CCI":"CCI"
}
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @ViewChild('viewer', { static: false }) viewer: any;
  @ViewChild('content') content: any;
  @Input('selectedFile') selectedFile: any;
  constructor(
    private route: ActivatedRoute,
    private service: RepositoryService
  ) { }
  redactionResults: any = [];
  redactionTypes: any = [];
  lastSelected:any;
  

  ngOnInit(): void {
    let path = this.route.snapshot.url;
    let path2 = path[1].toString();
    if (path.length > 1) {
      this.service.getSingleFiles(path2).subscribe(data => {
        this.selectedFile = data;
        this.showPDF();
      });
    }

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedFile) {
      setTimeout(() => {
        this.showPDF();
      }, 1000)
    }
  }

  ngAfterViewInit() {

    // this.showPDF();
  }

  showPDF() {

    WebViewer({
      path: '../assets/lib',
      // initialDoc: '../assets/files/webviewer-demo-annotated.pdf',
      initialDoc: environment.apiEndPoint + (this.selectedFile.file).replace("/media/", 'media/'),
      enableRedaction: true,
      licenseKey: "25R4N365K716RZAXK9Y2YCM021BW48H0I0S",

    }, this.viewer.nativeElement)
      .then(instance => {
        const { annotManager, docViewer, Annotations, CoreControls } = instance;
        const annotHistoryManager = docViewer.getAnnotationHistoryManager();
        // console.log("user", annotManager.getDisplayAuthor(annotManager))
        // instance.loadDocument(base64ToBlob(this.input.result), { filename: 'myfile.pdf' });
        // instance.setTheme('dark');
        /* hide the tool group */
        instance.disableElements(['toolbarGroup-View']);
        instance.disableElements(['toolbarGroup-Annotate']);
        instance.disableElements(['toolbarGroup-Shapes']);
        // instance.disableElements(['toolbarGroup-Edit']);
        instance.disableElements(['toolbarGroup-Insert']);
        /* hide the tool group */
        /* setting default tool */
        instance.setToolbarGroup('toolbarGroup-Edit', true);
        /* setting default tool */

        instance.contextMenuPopup.update([
          {
            type: 'actionButton',
            img: 'path/to/image',
            onClick: () => {
            }
          },
          { dataElement: "annotationRedactButton" }
        ]);
        instance.textPopup.update([
          { dataElement: "copyTextButton" },
          { dataElement: "textRedactToolButton" },
        ])
        instance.annotationPopup.update([
          { dataElement: "annotationDeleteButton" },
          {
            type: 'actionButton',
            img:"icon-tool-redaction-inline",
            title:'Change Redaction Type',
            onClick: () => {
              console.log(this.lastSelected)
              console.log (this.redactionTypes,this.redactionTypes,this.lastSelected['Sw'])
              let index = "";
              let value = {};
              _.each (this.redactionTypes, (obj,key)=>{
                console.log(obj,key)
                if(obj['id']==this.lastSelected['Sw']){
                  index = key;
                  value = obj;
                }
              })
              Swal.fire({
                title: 'Change Redaction Type',
                input: 'radio',
                allowOutsideClick: false,
                inputOptions: inputOptions,
                inputValue:value['type'],
                inputValidator: (value) => {
                  if (!value) {
                    return 'You need to choose Redaction Type'
                  }else{
                    return "";
                  }
                }
              }).then((result) => {
                console.log("value",result)
                this.redactionTypes[index]['type']=result.value;
                // this.redactionTypes.push({
                //   id: annotations[0]['Sw'],
                //   type: result.value
                // })
              });
            },
          }
        ])
        console.log("annotation popup ", instance.annotationPopup.getItems())

        /* ---------------------------------------------------------------------------------------------- */
        const { Tools } = instance;
        instance.setToolMode(Tools.ToolNames.REDACTION);
        // instance.enableFeatures([instance.Feature.Redaction]);
        let thys = this;

        /* left nav */
        instance.setHeaderItems(function (header) {
          header.getHeader('default').update([
            {
              type: 'toggleElementButton',
              img: 'icon-header-sidebar-line',
              element: 'leftPanel',
              dataElement: 'leftPanelButton'
            },
            {
              type: 'toolButton', toolName: 'Pan'
            },
            {
              type: 'actionButton',
              img: 'icon-alert',
              onClick: () => {
                alert('Hello world!');
              },
              dataElement: 'alertButton',
              hidden: ['mobile']
            },
            { type: "spacer", hidden: ['mobile'] },
            {
              dataElement: "searchButton",
              element: "searchPanel",
              img: "icon-header-search",
              title: "component.searchPanel",
              type: "toggleElementButton"
            }
          ])
          header.getHeader('toolbarGroup-Edit').update([
            { type: "spacer", hidden: ['mobile'] },
            { type: "actionButton", dataElement: "redoButton", title: "action.redo", img: "icon-operation-redo", onClick: () => { annotHistoryManager.redo(); } },
            { type: "actionButton", dataElement: "undoButton", title: "action.undo", img: "icon-operation-undo", onClick: () => { annotHistoryManager.undo(); } },
            { type: "toolGroupButton", toolGroup: "redactionTools", dataElement: "redactionToolGroupButton", title: "annotation.redact", showColor: "never" },
            { type: "spacer", hidden: ['mobile'] },
            {
              type: "actionButton", img: "icon-header-download",
              onClick: () => {
                const redactionList = annotManager.getAnnotationsList().filter(annot => annot instanceof Annotations.RedactionAnnotation);
                let results: any = [];
                redactionList.map(dat => {
                  let t = {
                    id: dat['Sw'],
                    pageNumber: dat['XB'],
                    pageHeight: docViewer.getPageHeight(dat['XB']),
                    pageWidth: docViewer.getPageWidth(dat['XB']),
                    redactions: dat['Nb']
                  }
                  results.push(t)
                })
                results = _.merge(_.keyBy(results, 'id'), _.keyBy(thys.redactionTypes, 'id'))
                thys.redactionResults = results;
                let data = {
                  'file_id':thys.selectedFile['id'],
                  'file':thys.selectedFile['file'],
                  'redactArray':_.map(thys.redactionResults)
                }
                console.log("data ", data)
              }
            },

          ])
        });
        /* username 
        annotManager.setAnnotationDisplayAuthorMap((annotation) => {
          console.log("annotation ", annotation)

          if (annotation.Id === '1') {
            return 'John';
          } else {
            return 'sdfas';
          }
        });
        */

        /* user defined redaction

        docViewer.on('documentLoaded', () => {
          let redactions:any = [];
          let redactAnnot = new Annotations.RedactionAnnotation({
              PageNumber: 1,
              Rect: new CoreControls.Math.Rect(101, 102, 300, 200) // Rect are in the form x1,y1,x2,y2
          });
          redactions.push(redactAnnot)
          const redactAnnotations = redactions
          annotManager.addAnnotations(redactAnnotations);
        })
        */
        annotManager.on('annotationSelected', (annotationsList) => {
          console.log("annoation selected ", annotationsList)
          this.lastSelected = {}
          if(annotationsList)
          this.lastSelected = annotationsList[0]
        })
        annotManager.on('annotationChanged', (annotations, action) => {
          if (action == 'add' && annotations[0]['Subject'] == 'Redact') {
            
            Swal.fire({
              title: 'Select Redaction Type',
              input: 'radio',
              allowOutsideClick: false,
              inputOptions: inputOptions,
              inputValidator: (value) => {
                if (!value) {
                  return 'You need to choose Redaction Type'
                }else{
                  return "";
                }
              }
            }).then((result) => {
              console.log("value",result)
              this.redactionTypes.push({
                id: annotations[0]['Sw'],
                type: result.value
              })
              console.log("this.redactionTypes",this.redactionTypes)
            });
            
            

            // this.modalService.open(this.content)
          }
        });
      });
  }
}


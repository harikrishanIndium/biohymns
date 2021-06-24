import { Component, Inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import WebViewer from '@pdftron/webviewer';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../service/repository.service';
import * as _ from 'lodash';

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
    private service: RepositoryService,
    public dialog: MatDialog,
    private modalService: NgbModal
  ) { }
  redactionResults: any = [];
  redactionTypes: any = [];

  closeResult: string = '';
  testvar: string = 'PPD'
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
    console.log("2222r")
    console.log("changes", this.selectedFile)
    if (this.selectedFile) {
      setTimeout(() => {
        this.showPDF();
      }, 1000)
    }
  }
  open(content) {
    console.log("opening")
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: false }).result.then((result) => {
      console.log("result ", this.testvar)
      this.closeResult = `Closed with: ${result}`;
      console.log("closeResult", this.closeResult)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("closeResult", this.closeResult)

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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
        instance.setTheme('dark');
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
          { dataElement: "annotationDeleteButton" }
        ])
        console.log("annotation popup ", instance.annotationPopup.getItems())

        /* ---------------------------------------------------------------------------------------------- */
        const { Tools } = instance;
        instance.setToolMode(Tools.ToolNames.REDACTION);
        // instance.enableFeatures([instance.Feature.Redaction]);
        let thys = this;

        /* left nav */
        instance.setHeaderItems(function (header) {
          // console.log("header",header)
          // console.log("header",header.getHeader('toolbarGroup-Edit').getItems())
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
                //  annotHistoryManager.undo(); 
                console.log(thys.selectedFile)
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
                console.log("results ", thys.redactionResults)
                let data = {
                  'id':thys.selectedFile['id'],
                  'file':thys.selectedFile['file'],
                  'redactArray':_.map(thys.redactionResults)
                }
                console.log("data ", data)
              }
            },

          ])
        });

        annotManager.setAnnotationDisplayAuthorMap((annotation) => {
          console.log("annotation ", annotation)

          if (annotation.Id === '1') {
            return 'John';
          } else {
            return 'sdfas';
          }
        });

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
        docViewer.on('documentLoaded', () => {

          console.log("cc", docViewer.getPageHeight(1))
          console.log("cc", docViewer.getPageWidth(1))
        });
        console.log("annotation popup", instance.annotationPopup.getItems())
        annotManager.on('annotationSelected', (annotationsList) => {
          console.log("annoation added ", annotationsList)
        })
        annotManager.on('annotationChanged', (annotations, action) => {
          if (action == 'add' && annotations[0]['Subject'] == 'Redact') {
            let type = ""
            console.log(annotations)
            if (confirm("The Redaction part contains Personal details") == true)
              type = "PPD"//console.log("PPD")
            else
              type = "CCI"//console.log("cci")
            this.redactionTypes.push({
              id: annotations[0]['Sw'],
              type: type
            })

            // this.modalService.open(this.content)
          }
        });

      });

  }
  url: any;
  input: any
  onFileChanged(event: any) {
    var fileToRead = event.target.files[0];;

    var reader = new FileReader();
    reader.readAsDataURL(fileToRead);

    // attach event, that will be fired, when read is end
    reader.onload = (_event) => {
      this.url = reader.result;
      this.showPDF();

    }
    // start reading a loaded file
    reader.readAsText(fileToRead);
  }
}
function base64ToBlob(input: any): string | File | Blob | import("@pdftron/webviewer").CoreControls.Document | import("@pdftron/webviewer").PDFNet.PDFDoc {
  throw new Error('Function not implemented.');
}

@Component({
  selector: 'redaction-type',
  templateUrl: 'redaction-type.component.html',
  styles: ['.mat-radio-button ~ .mat-radio-button {margin-left: 16px;}']
})
export class RedactionTypeComponent {

  constructor(
    public dialogRef1: MatDialogRef<RedactionTypeComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  onNoClick(): void {
    console.log("closeing ", this.dialogRef1)
    this.dialogRef1.close()
    alert("colort")
  }

}
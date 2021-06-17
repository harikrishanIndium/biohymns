import { Component, OnInit, ViewChild } from '@angular/core';
import WebViewer from '@pdftron/webviewer';
import { RepositoryService } from '../../service/repository.service';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @ViewChild('viewer', { static: false }) viewer: any;

  constructor(private service:RepositoryService) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(){
   
    this.showPDF();
  }
  showPDF() {
    console.log("view", this.viewer);
    this.input = this.service.getOption;
    WebViewer({
      path: '../assets/lib',
      // initialDoc: '../assets/files/webviewer-demo-annotated.pdf',
      initialDoc: '../assets/files/sample.pdf',
      // initialDoc: this.url,
      enableRedaction: true,
      licenseKey: "25R4N365K716RZAXK9Y2YCM021BW48H0I0S",

    }, this.viewer.nativeElement)
      .then(instance => {
        const { annotManager, docViewer, Annotations, CoreControls } = instance;
        const annotHistoryManager = docViewer.getAnnotationHistoryManager();
        console.log("user", annotManager.getDisplayAuthor(annotManager))
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
              const redactionList = annotManager.getAnnotationsList().filter(annot => annot instanceof Annotations.RedactionAnnotation);

              console.log("redaction list", redactionList)
              console.log(JSON.stringify(redactionList))
              redactionList.map(dat =>{
                console.log("page", dat['XB'])
                console.log("Co ordi", dat['Nb'])
              })
              console.log("axis", redactionList[0]['Nb'])
              console.log("axis", redactionList[0]['XB'])

              // instance.downloadPdf({filename:'test.pdf',includeAnnotations:true,})
            }
          },
          { dataElement:"annotationRedactButton"}
        ]);
        instance.textPopup.update([
          { dataElement: "copyTextButton" },
          { dataElement: "textRedactToolButton" },
        ])
        
/* ---------------------------------------------------------------------------------------------- */
        const { Tools } = instance;
        instance.setToolMode(Tools.ToolNames.REDACTION);
        // instance.enableFeatures([instance.Feature.Redaction]);

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
            {type: "spacer", hidden:['mobile']},
            {
              dataElement: "searchButton",
              element: "searchPanel",
              img: "icon-header-search",
              title: "component.searchPanel",
              type: "toggleElementButton"
            },
            {
              dataElement: "toggleNotesButton",
              element: "notesPanel",
              hidden: ["small-mobile"],
              img: "icon-header-chat-line",
              title: "component.notesPanel",
              type: "toggleElementButton"
            }
          ])
          header.getHeader('toolbarGroup-Edit').update([
            {type: "spacer", hidden:['mobile']},
            {type: "actionButton", dataElement: "redoButton", title: "action.redo", img: "icon-operation-redo",onClick: () => {annotHistoryManager.redo();}},
            {type: "actionButton", dataElement: "undoButton", title: "action.undo", img: "icon-operation-undo",onClick: () => {annotHistoryManager.undo();}},
            {type: "toolGroupButton", toolGroup: "redactionTools", dataElement: "redactionToolGroupButton", title: "annotation.redact", showColor: "never"},
            {type: "spacer", hidden:['mobile']}
          ])          
        });

        annotManager.setAnnotationDisplayAuthorMap((annotation) => {
          console.log("annotation ", annotation )
          if (annotation.Id === '1') {
            return 'John';
          } else {
            return 'sdfas';
          }
        });


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

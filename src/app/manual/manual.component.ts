import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {
  @ViewChild('viewer', { static: false }) viewer: any;

  constructor() { }

  ngOnInit(): void {
    // this.showPDF()
  }
  ngAfterViewInit(){
    this.showPDF();
  }
  showPDF() {
    console.log("view", this.viewer);
    this.input = document.getElementById('file_upload');
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

        const { Tools } = instance;
        instance.setToolMode(Tools.ToolNames.REDACTION);
        instance.enableFeatures([instance.Feature.Redaction]);


        /* hide the tool group */
        instance.setToolbarGroup('toolbarGroup-Edit', true);
        instance.disableElements(['toolbarGroup-View']);
        instance.disableElements(['toolbarGroup-Annotate']);
        instance.disableElements(['toolbarGroup-Shapes']);
        // instance.disableElements(['toolbarGroup-Edit']);
        instance.disableElements(['toolbarGroup-Insert']);
        /* hide the tool group */
        /* left nav */
        instance.setHeaderItems(function (header) {
          header.update([
            {
              type: 'toggleElementButton',
              img: 'icon-header-sidebar-line',
              element: 'leftPanel',
              dataElement: 'leftPanelButton'
            },
            {
              type: 'divider'
            },
            {
              type: 'toolButton', toolName: 'Pan'
            },
            {
              type: 'actionButton',
              img: 'path/to/image',
              onClick: () => {
                alert('Hello world!');
              },
              dataElement: 'alertButton',
              hidden: ['mobile']
            }
          ])
        });
        /* left navigation */
        instance.enableClearSearchOnPanelClose();
        // In this callback WebViewer will be initialized, so you can call WebViewer API here.
        instance.setTheme('dark');
        /* contaxt menu */
        //working add new 
        instance.contextMenuPopup.update([{
          type: 'actionButton',
          img: 'path/to/image',
          onClick: () => {
            // instance.downloadPdf()
            
            // alert(annotManager.isApplyRedactionEnabled())
            
        const redactionList = annotManager.getAnnotationsList().filter(annot => annot instanceof Annotations.RedactionAnnotation);
        console.log("redaction list", redactionList)
        // apply a single redaction
        // annotManager.applyRedactions(redactionList[0])
        // // When using WebViewer Server, 'results' will be a response object with a 'url' property for downloading the redacted document.
        // .then(results => {
        //   console.log("result",results);
        //   return annotManager.applyRedactions(redactionList.filter(redaction => redaction.Author === 'User'));
        //   // When using WebViewer Server, the previous redaction will not appear in the results. It'll only redact the redactions provided to 'applyRedactions'.
        //   // However when using 'fullAPI', the document will have all previously applied redactions
        // })
        // .then(result => annotManager.applyRedactions());

            
            // instance.downloadPdf({filename:'test.pdf',includeAnnotations:true,})
          }
        }, { dataElement:"annotationRedactButton"}]);
        instance.textPopup.update([
          { dataElement: "copyTextButton" },
          { dataElement: "textRedactToolButton" },
          // { dataElement: 'applyRedactionsButton'}
        ])
        // console.log(instance.textPopup.getItems())
        annotManager.enableRedaction(true)
        // console.clear()
        console.log(annotManager.getWidgetEditingManager())
        console.log(docViewer.getWatermark())
        
        console.log("items are in settingsMenuOverlay ", instance.annotationPopup.getItems())
        // console.log("is apply redaction ",annotManager.isApplyRedactionEnabled())
        /* search */ 
        const searchListener = (searchPattern, options, results) => {
          // add redaction annotation for each search result
          console.log("search patten",searchPattern)
          console.log("options",options)
          console.log('resulet',results)
          const newAnnotations = results.map(result => {
            const annotation = new Annotations.RedactionAnnotation();
            annotation.PageNumber = result.page_num + 1;
            annotation.Quads = result.quads.map(quad => quad.getPoints());
            annotation.StrokeColor = new Annotations.Color(136, 39, 31);
            return annotation;
          });
      
          annotManager.addAnnotations(newAnnotations);
          annotManager.drawAnnotationsFromList(newAnnotations);
        };
        docViewer.on('documentLoaded', () => {
          const searchPattern = '';
          // searchPattern can be something like "search*m" with "wildcard" option set to true
          // searchPattern can be something like "search1|search2" with "regex" option set to true
      
          // options default values are false
          const searchOptions = {
            caseSensitive: false,  // match case
            wholeWord: true,      // match whole words only
            wildcard: true,      // allow using '*' as a wildcard value
            regex: true,         // string is treated as a regular expression
            searchUp: true,      // search from the end of the document upwards
            ambientString: true,  // return ambient string as part of the result
          };
      
          instance.addSearchListener(searchListener);
          // start search after document loads
          instance.searchTextFull(searchPattern, searchOptions);

        });
        /* apply redaction */
        
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

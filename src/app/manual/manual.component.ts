import { Component, OnInit, ViewChild } from '@angular/core';
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
    
  }
  showPDF(){
    console.log("view", this.viewer)
    WebViewer({
      path: '../assets/lib',
      initialDoc: '../assets/files/webviewer-demo-annotated.pdf',
      enableRedaction: true

    }, this.viewer.nativeElement)
        .then(instance => {
          const { docViewer, Annotations, CoreControls } = instance;
          
          const { Tools } = instance;
          instance.setToolMode(Tools.ToolNames.REDACTION);
          
          
          /* hide the tool group */
            instance.setToolbarGroup('toolbarGroup-Edit', true);
            instance.disableElements(['toolbarGroup-View']);
            instance.disableElements(['toolbarGroup-Annotate']);
            instance.disableElements(['toolbarGroup-Shapes']);
            // instance.disableElements(['toolbarGroup-Edit']);
            instance.disableElements(['toolbarGroup-Insert']);
          /* hide the tool group */
          /* left nav */
            instance.setHeaderItems(function(header) {
              header.update([
                {
                  type:'toggleElementButton',
                  img: 'icon-header-sidebar-line',
                  element:'leftPanel',
                  dataElement: 'leftPanelButton'
                },
                {
                  type:'divider'
                },
                {
                  type:'toolButton', toolName: 'Pan'
                },
                {
                  type: 'actionButton',
                  img: 'path/to/image',
                  onClick: () => {
                    alert('Hello world!');
                  },
                  dataElement: 'alertButton',
                  hidden: [ 'mobile' ]
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
              alert('Hello world simple!');
            }
          }]);
          instance.textPopup.update([
            {dataElement: "copyTextButton"},
            {dataElement: "textRedactToolButton"}
          ])
          console.log(instance.textPopup.getItems())
          console.log("items are in contaxt menu ",    instance.contextMenuPopup.getItems()          )
    });
  }

}

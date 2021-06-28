import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, Observer, throwError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

//file upload progress bar start
import { HttpEventType } from '@angular/common/http';
import { from, BehaviorSubject, Subscription } from 'rxjs';
import * as _ from 'lodash';
export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress
}

export class FileQueueObject {
  public file: any;
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public progress: number = 0;
  public request!: Subscription; async: any;
  public response: HttpResponse<any> | HttpErrorResponse | any;

  constructor(file: any) {
    this.file = file;
  }

  public upload = () => { /* set in service */ };
  public isUploadable = () => this.status === FileQueueStatus.Pending || this.status === FileQueueStatus.Error;

}
//file upload progress bar end
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  //file upload start
  public url: string = 'https://jsonplaceholder.typicode.com/posts';
  private _queue!: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];


  constructor(private router: Router, public http: HttpClient) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>new BehaviorSubject(this._files);
  }
  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public functions
  public addToQueue(data: any) {
    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file));
  }

  public clearQueue() {
    // clear the queue
    this._files = [];
    this._queue.next(this._files);
  }

  public uploadAll() {
    // upload all except already successfull or in progress
    _.each(this._files, (queueObj: FileQueueObject) => {
      if (queueObj.isUploadable()) {
        this._upload(queueObj);
      }
    });
  }

  // private functions
  private _addToQueue(file: any) {
    const queueObj = new FileQueueObject(file);
    // set the individual object events
    queueObj.upload = () => this._upload(queueObj);
    // push to the queue
    this._files.push(queueObj);
    this._queue.next(this._files);
  }

  private _upload(queueObj: FileQueueObject) {
    // create form data for file
    const form = new FormData();
    form.append('file', queueObj.file, queueObj.file.name);

    // upload file and report progress
    const req = new HttpRequest('POST', this.url, form, {
      reportProgress: true,
    });

    // upload file and report progress
    queueObj.request = this.http.request(req).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this._uploadProgress(queueObj, event);
        } else if (event instanceof HttpResponse) {

        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this._uploadFailed(queueObj, err);
        } else {
          // The backend returned an unsuccessful response code.
          this._uploadFailed(queueObj, err);
        }
      }
    );

    return queueObj;
  }

  private _uploadProgress(queueObj: FileQueueObject, event: any) {
    // update the FileQueueObject with the current progress
    const progress = Math.round(100 * event.loaded / event.total);
    queueObj.progress = progress;
    queueObj.status = FileQueueStatus.Progress;
    this._queue.next(this._files);
  }

  private _uploadFailed(queueObj: FileQueueObject, response: HttpErrorResponse) {
    queueObj.progress = 100;
    // queueObj.status = FileQueueStatus.Success;
    queueObj.response = response;
    this._queue.next(this._files);
  }

  //file upload end

  private data = {};
  //login api start
  signIn(requestdata: any): Observable<any> {
    let path = environment.apiEndPoint + "login/"
    return this.http.post(path, requestdata);

  }
  //login api end

  //getall projects start
  getProjects(): Observable<any> {
    let path = environment.apiEndPoint + "project_api/"
    return this.http.get(path)
  }
  //getall projects end

  //getsingle projects start
  getSingleProject(id: any): Observable<any> {
    let path = environment.apiEndPoint + "project_api/?id=" + id
    return this.http.get(path)
  }
  //getsingle projects end

  //getall files start
  getFiles(): Observable<any> {
    let path = environment.apiEndPoint + "file_api/"
    return this.http.get(path)
  }
  //getall files end

  //delete file start
  deleteFiles(id): Observable<any> {
    let path = environment.apiEndPoint + "file_api/?id=" + id
    return this.http.delete(path)

  }
  //delete file end

  //file create start
  postFile(requestdata: any): Observable<any> {
    let path = environment.apiEndPoint + "file_api/"
    return this.http.post(path, requestdata)
  }
  //file create end

  //getall files start
  getSingleFiles(id: any): Observable<any> {
    let path = environment.apiEndPoint + "file_api/?id=" + id
    return this.http.get(path)
  }
  //getall files end

  //project create api start
  postProject(requesdata: any): Observable<any> {
    let path = environment.apiEndPoint + "project_api/"
    return this.http.post(path, requesdata)
  }
  //project create api end
  download(data) {
    return this.http.post(environment.apiEndPoint + "redaction/", data, { observe: 'response', responseType: 'blob' });
  }
}

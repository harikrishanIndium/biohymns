import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Observer, throwError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private router: Router, public http: HttpClient) { }
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
    let path = environment.apiEndPoint + "project_api/" + id
    return this.http.get(path)
  }
  //getsingle projects end

  //getall files start
  getFiles(): Observable<any> {
    let path = environment.apiEndPoint + "file_api/"
    return this.http.get(path)
  }
  //getall files end

  //getall files start
  getSingleFiles(id: any): Observable<any> {
    let path = environment.apiEndPoint + "file_api/" + id
    return this.http.get(path)
  }
  //getall files end

  //dynamic file upload start
  setOption(option, value) {
    this.data[option] = value;
  }
  getOption() {
    return this.data;
  }
  //dynamic file upload end
}

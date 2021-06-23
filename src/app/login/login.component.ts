import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RepositoryService } from '../service/repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginform', { static: false }) loginform: any;
  constructor(private router: Router, private service: RepositoryService, private http: HttpClient,) { }
  loginData = { username: "", password: "" };
  ngOnInit(): void {

  }
  login() {
    if (this.loginform.valid) {
      sessionStorage.removeItem('idtoken');
      const formData = new FormData();
      formData.append("username", "charan");
      formData.append("password", "sravanbgn1");
      this.service.signIn(this.loginData).subscribe(data => {
        let accesstoken = data.token;
        sessionStorage.setItem('idtoken', accesstoken);
        this.router.navigateByUrl("/dashboard");
      }, error => {
        console.log("eror", error);
      });
    }
    else {

      Object.keys(this.loginform.form.controls).forEach(key => {
        this.loginform.form.get(key).markAsDirty();
      });

    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginform', { static: false }) loginform: any;
  constructor(private router: Router) { }
  loginData = { username: "", password: "" };
  ngOnInit(): void {

  }
  login() {
    this.router.navigateByUrl("/dashboard");
    // if (this.loginform.valid) {
    // }
    // else {

    //   Object.keys(this.loginform.form.controls).forEach(key => {
    //     this.loginform.form.get(key).markAsDirty();
    //   });
      
    // }
  }
}

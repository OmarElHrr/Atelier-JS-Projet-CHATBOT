import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  monFormulaire!: FormGroup;
  errorMessage = "";

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {

    this.monFormulaire = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.errorMessage = "";
  }
  
  login() {
    this.errorMessage = "";
    const email = this.monFormulaire.get('email')?.value;
    const password = this.monFormulaire.get('password')?.value;
    if(this.monFormulaire.valid) {
      if(email == "achrafaissy1@gmail.com" && password == "1234") {
        alert("You are loggedIn!")
      }
      else {
        this.errorMessage = "Invalid Email or Password!"
      }
    }
  }

}

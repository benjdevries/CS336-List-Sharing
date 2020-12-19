import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public newUser: User;
  public verifyEmail: string = '';
  constructor() {
    this.newUser = {
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit(response: HTMLFormElement) {

  }

}

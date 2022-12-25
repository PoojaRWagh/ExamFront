import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userservice:UserService){}
  public user = {
    username: '',
    password: '',
    cpassword:'',
    email:'',
  };
  formSubmit()
  {
    console.log(this.user);
    if(this.user.password===this.user.cpassword)
    {
    this.userservice.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        alert("success");
      
      },(error) => {
        console.log("error");
        alert("something went wrong");
        
      }
  )
}
else{
  alert("Password and confirm password should be same");
}
}
}

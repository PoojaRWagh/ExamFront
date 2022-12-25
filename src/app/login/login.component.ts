import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
public login_data={
  username:'',
  password:''
}
constructor(private login:LoginService,private router: Router){}
formSubmit()
{
  if(this.login_data.username.trim()==''||this.login_data.username==null)
  {
    alert("Username is required");
    return;
  }
  if(this.login_data.password.trim()==''||this.login_data.password==null)
  {
    alert("password is required");
    return;
  }
  this.login.generateToken(this.login_data).subscribe(
    (data:any)=>{
      console.log("Success");
      console.log(data);
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe((user:any) => {
        this.login.setUser(user);
        console.log(user);
        //redirect ....ADMIN : admin-dashboard
        //redirect ....user : user-dashboard

        if(this.login.getUserRole() == 'ADMIN'){
          //admin dashboard
          //window.location.href = '/admin';
          this.router.navigate(['admin']);
        //  this.login.loginStatusSubject.next(true);
        }else if(this.login.getUserRole() == 'NORMAL'){
          //user-dashboard
          //window.location.href = '/user-dashboard';
          this.router.navigate(['user-dashboard']);
        //  this.login.loginStatusSubject.next(true);
        }else{
          this.login.logout();
        }
      });


    },
    (error)=>{
      console.log("Error");
      console.log(error);
    }
    
  );

  
  
}

}
declare var google:any;
import { Component } from '@angular/core';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent{

ngOnInit(): void {
  google.accounts.id.initialize({
    client_id:'154886408036-b375e6fm8v1cu1jmhi6kcp9n5ph0au6b.apps.googleusercontent.com',
    callback: (res:any)=>this.handleLogin(res)
  });
  google.accounts.id.renderButton(document.getElementById('google-btn'),{
    size:'large',
    shape:'rectangle',
    type:'standard',
    text:'Sign in with Google'
  })

}
private decodeToken(token: any): any {
  return JSON.parse(atob(token.split(".")[1]));
}

private handleLogin(response: any): void {
  if (response) {
    console.log(response);
    // Decode token
    const payload = this.decodeToken(response.credential);
    localStorage.setItem("payload", JSON.stringify(payload));
  }
}
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagesService } from 'src/app/pages.service';
@Component({
  selector: 'app-is-loged',
  templateUrl: './is-loged.component.html',
  styleUrls: ['./is-loged.component.scss']
})
export class IsLogedComponent implements OnInit, OnDestroy {
  username?: string;
  userimg?: string;
  private subscribeGetUser: Subscription;
  constructor(private pages: PagesService) { }

  //On logout remove localstorage 
  logOutUser() {
    localStorage.removeItem('session_id');
    localStorage.removeItem('account_id');
    window.location.href = ""
  }

  ngOnInit(): void {
    this.subscribeGetUser = this.pages.getUser().subscribe((data: any) => {
      this.username = data.username;
      this.userimg = `https://secure.gravatar.com/avatar/${data.avatar.gravar}.jpg?s=32`;
      localStorage.setItem('account_id', JSON.stringify(data.id));
    })
  }
  ngOnDestroy(): void {
    this.subscribeGetUser.unsubscribe();
  }
}

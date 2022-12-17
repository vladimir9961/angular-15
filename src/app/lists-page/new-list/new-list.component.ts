import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallAlertService } from 'src/app/components/alert/call.alert.service';
import { PagesService } from 'src/app/pages.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit, OnDestroy {
  hideShowCreateListForm = true;
  isEditable = false;
  hideCreateList = true;
  private subscribeSaveList: Subscription;

  constructor(private _formBuilder: FormBuilder, private pages: PagesService, private callalert: CallAlertService, private router: Router) {

  }
  formListName: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required]]
  });
  formDescription: FormGroup = this._formBuilder.group({ description: [''] });
  get name() {
    return this.formListName.get('name');
  }
  get description() {
    return this.formDescription.get('description');
  }
  ngOnInit(): void {
    if (this.router.url.includes('add_movie_to_list')) {
      this.hideCreateList = false
    }
  }
  //On click create list 
  saveList() {
    this.subscribeSaveList = this.pages.createList({ name: this.formListName.value.name, description: this.formDescription.value.description, language: "en" })
      .subscribe((res: any) => {
        if (res.success == true) {
          this.hideCreateList = false
          if (res.status_code === 1) {
            this.callalert.textMessage = `"${this.formListName.value.name}" list created succefuly`;
            this.callalert.alertType = "success";
            this.router.navigate(['new_list/add_movie_to_list/', res.list_id]);
          }
          this.callalert.displayAlert.next(true);
          this.hideShowCreateListForm = false
        }
      })
    console.log(this.formListName.value.name, this.formDescription.value.description)

  }

  ngOnDestroy(): void {
    this.subscribeSaveList?.unsubscribe();
  }
}

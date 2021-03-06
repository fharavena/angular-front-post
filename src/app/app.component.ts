import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from ".//services/user.service";
import { CategoryService } from ".//services/category.service";
import { global } from "./services/global";
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'blog-angular';
  public identity;
  public token;
  public url;
  public categories;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.LoadUser();
    this.url = global.url;
    //console.log(this.identity);
  }

  ngOnInit() {
    // console.log('Webapp cargada correctamente:');
    this.getCategories();
  }

  ngDoCheck() {
    this.LoadUser();
  }

  LoadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
          // console.log(this.categories);

        }
      }, error => {
        console.log(error);

      }
    );
  }

}

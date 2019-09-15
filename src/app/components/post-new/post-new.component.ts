import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from "src/app/services/post.service";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Post } from "../../models/post";
import { global } from "../../services/global";

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;

  public froala_options: Object = {
    charCounterCount: true,
    attribution: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'post/upload',
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'Sube una imagen a tu post'
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    // console.log(this.identity);
  }

  getCategories() {
    this._categoryService.getCategory().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  imageUpload(data) {
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }

  onSubmit(form) {
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'success') {
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }else{
          this.status = 'error';
        }
      }, error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

}

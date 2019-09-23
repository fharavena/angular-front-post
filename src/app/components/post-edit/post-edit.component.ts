import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from "src/app/services/post.service";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Post } from "../../models/post";
import { global } from "../../services/global";

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;
  public  is_edit: boolean;

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
    this.page_title = 'Editar una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getPost();
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

  getPost() {
    // Sacar la id de la url
    this._route.params.subscribe(params => {
      const id = +params.id;
      // console.log(id);
      // Peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.post = response.categories;
            // console.log(response);
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }

  imageUpload(data) {
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }

  onSubmit(form) {
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          //this.post = response.post;
          this._router.navigate(['/entrada', this.post.id]);
        }else{
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
      }
    );

  }

}

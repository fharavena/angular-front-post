import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { PostService } from "src/app/services/post.service";
import { Post } from "src/app/models/post";
import { log } from "util";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post: Post;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getPost();
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
            console.log(this.post);
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
}

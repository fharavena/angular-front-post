import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/models/post";
import { PostService } from "src/app/services/post.service";
import { global } from "src/app/services/global";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url;
  public posts: Array<Post>;

  constructor(private _postService: PostService) {
    this.page_title = "Inicio";
    this.url = global.url;
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.categories;
          // console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}

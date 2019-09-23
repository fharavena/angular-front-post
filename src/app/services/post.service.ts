import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { global } from "./global";

@Injectable()
export class PostService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  pruebas() {
    return "hola desde el servicio post";
  }

  create(token, post): Observable<any> {
    const json = JSON.stringify(post);
    const params = "json=" + json;
    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", token);
    return this._http.post(this.url + "post", params, { headers });
  }

  getPosts(): Observable<any> {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this._http.get(this.url + "post", { headers });
  }

  getPost(id): Observable<any> {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this._http.get(this.url + "post/" + id, { headers });
  }

  update(token, post, id): Observable<any> {
    let json = JSON.stringify(post);
    let params = "json=" + json;
    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", token);
    return this._http.put(this.url + "post/" + id, params, { headers });
  }

  delete(token, id) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", token);
    return this._http.delete(this.url + "post/" + id, { headers });
  }
}

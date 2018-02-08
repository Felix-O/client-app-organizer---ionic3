import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { Storage } from '@ionic/storage';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/map';


@Injectable()
export class GroupsProvider {

  public url: string = 'https://fo-server--express.herokuapp.com/';

  constructor(
    public http: Http,
    public authService: AuthProvider) {
  }

  getGroups(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/groups', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getGroup(details){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      headers.append('Content-Type', 'application/json');
      //console.log(details);
      let body = {
        _id: details
      };
      this.http.post(this.url + 'api/groups/group', JSON.stringify(body), {headers: headers})
          .subscribe(res => {
              let data = res.json();
              resolve(data);
          }, (err) => {
              reject(err);
          });/**/
    });
  }

  createGroup(group){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.url + 'api/groups/create', JSON.stringify(group), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateGroupTitle(newTitle){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.url + 'api/groups/group/update/title', JSON.stringify(newTitle), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateGroupDescription(newDescription){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.url + 'api/groups/group/update/description', JSON.stringify(newDescription), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteGroup(id){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
        this.http.delete(this.url + 'api/groups/delete/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });
 }

}

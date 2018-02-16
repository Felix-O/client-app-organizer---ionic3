import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

@IonicPage()
@Component({
  selector: 'page-sermons',
  templateUrl: 'sermons.html',
})
export class SermonsPage {

  sermons: any;
  userQuery: string;
  author: any;

  constructor(
    public wpService: WpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.wpService.loadSermons().then((sermonData) => {
      this.sermons = sermonData;
      //console.log(sermonData);
      this.userQuery = "?id=1" /*+ this.sermons.author/**/;

      this.wpService.loadUser(this.userQuery).then((userData) => {
        //console.log(userData[0]);
        this.author = userData[0];
      });/**/
    });
  }

  goToSermon(sermonId, sermonTitle){
    this.navCtrl.push("SermonPage", {id: sermonId, st: sermonTitle });
  }

}

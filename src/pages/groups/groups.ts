import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  role: string;
  groupData: any;

  constructor(
    public authService: AuthProvider,
    public groupService: GroupsProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.authService.checkAuthentication().then((res) => {
      this.authService.storedUser().then((value) => {
        this.role = value.role;
      });
    }, (err) => {
    });

    this.groupService.getGroups().then((groupsArray) => {
      if(groupsArray){
        this.groupData = groupsArray;
      }
      else {
        console.log("there are no groups");
      }
    });
  }

  addGroup(){
    this.modalCtrl.create("CreateGroupPage").present();
  }

  goToGroup(groupTitle){
    this.navCtrl.setRoot("GroupPage", {gt: groupTitle });
  }

}
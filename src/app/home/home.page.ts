import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NFC } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  pointAmmount: number = 1000;

  // , private toastCtrl: ToastController
  constructor(private nfc: NFC, private toastCtrl: ToastController) {
    this.nfc.addNdefListener().subscribe(async data => {
      if (data && data.tag && data.tag.id) {      
        if (data.tag.ndefMessage) {
          let toast = await this.toastCtrl.create({
            message: 'NFC Tag found',
            duration: 1000,
            position: 'bottom'
          });

          toast.present();

          let payload = data.tag.ndefMessage[0].payload;
          let tagContent = this.nfc.bytesToString(payload).substring(3);
          console.log(tagContent);
            
        } 
        
        else {
          let toast = await this.toastCtrl.create({
            message: 'NFC Tag not found',
            duration: 1000,
            position: 'bottom'
          });

        toast.present();
        }
      }
    });
  }

  addBonus() {
    this.pointAmmount += 100;
  }

  addMalus() {
    this.pointAmmount -= 100 ;
  }

  ngOnInit() {
  }

}

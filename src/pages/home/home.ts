import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

import { Stripe } from '@ionic-native/stripe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  miForm:FormGroup;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public stripe:Stripe) 
  {
    this.miForm = this.formBuilder.group({
      numero: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      month: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  public token:any="";

  generarToken(){
    let data=this.miForm.value;
    console.log(data);

    let card = {
      number: data.numero,
      expMonth: data.month,
      expYear: data.year,
      cvc: data.cvc
     };

     this.stripe.setPublishableKey('pk_test_ZyTUhs8mHr6fWDabwTF6BXTt');

     this.stripe.createCardToken(card).then((token) => {
        alert(token.id);
        this.token=token.id;
     }).catch((error) => {
        alert("error - "+error);
        this.token=error;        
     });


  }

}

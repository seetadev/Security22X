import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { INAPPLOCAL, INAPP_ITEMS, CLOUDINAPP } from './data';
import { InAppPurchase } from 'ionic-native';
import { PDF_10, PDF_25, PDF_50, PDF_100, SHARE_PDF, SPE_10, SPE_500, SPE_1000, SAVE_PDF, CLOUD_SAVE } from './data';

@Injectable()
export class InappPurchaseService {

	constructor(public http: Http,
				public storage: Storage) {
		this.storage = storage;
	}

	loadItems(){
		return InAppPurchase.getProducts(INAPP_ITEMS);
	}

	setInappItems(items){
		this.storage.set('inapplocal', items);
	}

	getInappItems(){
		return this.storage.get('inapplocal').then( items =>{
			if(!items){
				this.setInappItems(INAPPLOCAL);
				return INAPPLOCAL;
			}
			return items;
		});
	}

	setCloudItem(item){
		this.storage.set('cloudInapp', item);
	}

	getCloudItem(){
		return this.storage.get('cloudInapp').then( items =>{
			if(!items){
				this.setInappItems(CLOUDINAPP);
				return CLOUDINAPP;
			}
			return items;
		});
	}

	purchaseItem(id){
		return InAppPurchase.buy(id);
	}

	displayItems(){
		return Observable.create(observer => {
			// execute here
			var itemsArray = new Array();
			this.getInappItems().then(items =>{
				for(var i in items){
        
			        var units = 0; var desc = ''; var price = 0; var icon = ''; var status = false;

			        switch(items[i].Feature){
			            case "10Pdf":
			                desc = 'Send 10 PDFs';
			                price = 0.99;
			                icon = 'document';
			                break;
			            case "25Pdf":
			                desc = 'Send 25 PDFs';
			                price = 1.99;
			                icon = 'document';
			                break;
			            case "50Pdf":
			                desc = 'Send 50 PDFs';
			                price = 2.99;
			                icon = 'document';
			                break;
			            case "100Pdf":
			                desc = 'Send 100 PDFs';
			                price = 3.99;
			                icon = 'document';
			                break;
			            case "fb-tw-sms-whatsapp":
			                desc = 'Share 10 PDFs via Social Network';
			                price = 0.99;
			                icon = 'share';
			                break;
			            case "pdf-ibooks":
			                /*desc = 'Email 10 PDFs via Gmail';
			                price = 0.99;
			                icon = 'logo-google';*/
			                break;
			            case "email-print-save":
			                desc = '10 times Email, Print and Save as';
			                price = 0.99;
			                icon = 'more';
			                break;
		                case "email-second-print-save":
			                desc = '500 times Email, Print and Save as';
			                price = 3.99;
			                icon = 'more';
			                break;

		                case "email-third-print-save":
			                desc = '1000 times Email, Print and Save as';
			                price = 6.99;
			                icon = 'more';
			                break;
			        }
			        
			        units = parseInt(items[i].Own)-parseInt(items[i].Consumed);
			        if(units > 0 && items[i].Purchase == 'Yes'){
			        	status = true;
			        }

			        if(items[i].Feature != "pdf-ibooks"){
			        	itemsArray.push({name: items[i].Feature, units: units, id: items[i].Id, desc: desc, price: price, icon: icon, status: status });
			        }
			    }


			    /*if(window.localStorage.getItem("cloudInapp")){
			        self.cloudInapp = JSON.parse(self.getCloudInapp());
			        desc = "Sync and backup to server";
			        price = 0.99;
			        icon = 'cloud-upload';
			        var units = parseInt(self.cloudInapp[0].Own)-parseInt(self.cloudInapp[0].Consumed);
			        if(units > 0 && self.cloudInapp[0].Purchase == 'Yes'){
			            status = true;
			        }

			        itemsArray.push({name: self.cloudInapp[0].Feature, units: units, id: self.cloudInapp[0].Id, desc: desc, price: price, icon: icon, status: status });
			    }*/

			});
            observer.next(itemsArray);
            observer.complete();
		});
	}

	/* APIs for inapp items*/
	incrementCounter(index){
		return this.getInappItems().then(products =>{
			var consumed=products[index].Consumed;
		    consumed++;
		    if(consumed == products[index].Own){
		        products[index].Purchase='No';
		        products[index].Consumed=0;
		        products[index].Own=0;
		    }
		    else{
		        products[index].Consumed=consumed;
		    }

		    var left=parseInt(products[index].Own)-parseInt(products[index].Consumed);
		    console.log("Product index "+index+" updated: "+JSON.stringify(products));
		    this.setInappItems(products);
		    return left;

		});
	}

	isPDFAvailable(){
		return this.getInappItems().then(products =>{
			for(var i=0; i<4; i++){
		        if(products[i].Purchase == "Yes"){
		            var units = parseInt(products[i].Own) - parseInt(products[i].Consumed);
		            console.log("Export PDF units: "+units);
		            if(units > 0) return true;
		        }
		    }
		    return false;
		});
	}

	updatePDF(){

		return Observable.create(observer => {

			let that = this;
			this.getInappItems().then(products =>{
				// console.log(products);
				for(var i=0; i<4; i++){
			        if(products[i].Purchase == "Yes"){
			        	that.incrementCounter(i).then(units =>{
			        		observer.next(units);
				        	observer.complete();
			        	});
			        }
			    }
			});
		});
	}

	isSharePDFAvailable(){
		return this.getInappItems().then(products =>{
			// 4 is the index of the products
		    if(products[4].Purchase == "Yes"){
	            let units = parseInt(products[4].Own) - parseInt(products[4].Consumed);
	            console.log("Share PDF units: "+units);
	            if(units > 0) return true;
		    }
		    else return false;
		});
	}

	updateSharePDF(){
		return Observable.create(observer => {
			this.incrementCounter(4).then(units =>{
        		observer.next(units);
	        	observer.complete();
        	});   		
    	});
	}

	/*isSavePDFAvailable(){ // For client-side PDF
		return this.getInappItems().then(products =>{
			// 6 is the index of the products
		    if(products[6].Purchase == "Yes"){
	            let units = parseInt(products[6].Own) - parseInt(products[6].Consumed);
	            if(units > 0) return true;
	            else return false;
		    }
		    else return false;
		});
	}

	updateSavePDF(){
		return this.incrementCounter(6);
	}*/

	isSavePrintEmailAvailable(){
		return this.getInappItems().then(products =>{
			// 4 is the index of the products
		    if(products[5].Purchase == "Yes"){
	            let units = parseInt(products[5].Own) - parseInt(products[5].Consumed);
	            if(units > 0) return true;
		    }
		    else if(products[7].Purchase == "Yes"){
	            let units = parseInt(products[7].Own) - parseInt(products[7].Consumed);
	            if(units > 0) return true;
		    }
		    else if(products[8].Purchase == "Yes"){
	            let units = parseInt(products[8].Own) - parseInt(products[8].Consumed);
	            if(units > 0) return true;
			}

			return false;
		});
	}

	updateSavePrintEmail(){
		return Observable.create(observer => {
			let that = this;
			this.getInappItems().then(products =>{
				// console.log(products);
				let itemConsumed=5;
			    if(products[5].Purchase == "Yes" && products[5].Consumed <= products[5].Own){ itemConsumed = 5; }
			    else if(products[7].Purchase == "Yes" && products[7].Consumed <= products[7].Own){ itemConsumed = 7; }
			    else if(products[8].Purchase == "Yes" && products[8].Consumed <= products[8].Own){ itemConsumed = 8; }
			    else{
			    	console.log("No email, print and save as");
			        return;
			    }
				that.incrementCounter(itemConsumed).then(units =>{
	        		observer.next(units);
		        	observer.complete();
	        	});
			});  
		});
	}

	successCallback(id){
		return Observable.create(observer => {
			this.getInappItems().then(products =>{
				switch(id) {
					case PDF_10:
							products[0].Purchase="Yes";
				            products[0].Own=10 + (products[0].Own - products[0].Consumed);
				            products[0].Consumed = 0;
				            console.log('owned: '+id+', units: '+products[0].Own);
						break;

					case PDF_25:
							products[1].Purchase="Yes";
							products[1].Own=25 + (products[1].Own - products[1].Consumed);
							products[1].Consumed = 0;
							console.log('owned: '+id+', units: '+products[1].Own);
						break;

					case PDF_50:
							products[2].Purchase="Yes";
							products[2].Own=50 + (products[2].Own - products[2].Consumed);
							products[2].Consumed = 0;
							console.log('owned: '+id+', units: '+products[2].Own);
						break;

					case PDF_100:
							products[3].Purchase="Yes";
							products[3].Own=100 + (products[3].Own - products[3].Consumed);
							products[3].Consumed = 0;
							console.log('owned: '+id+', units: '+products[3].Own);
						break;
					
					case SHARE_PDF:
				            products[4].Purchase="Yes";
				            products[4].Own= 10 + (products[4].Own - products[4].Consumed);
				            products[4].Consumed = 0;
				            console.log('owned: '+id+', units: '+products[4].Own);
			            break;

		            case SPE_10:
				            let left_10 = 0;
				            if(products[8].Purchase == "Yes"){
				                left_10 = products[8].Own - products[8].Consumed;
				                products[8].Consumed = 0;
				                products[8].Own = 0;
				                products[8].Purchase = "No";
				            }
				            if(products[7].Purchase == "Yes"){
				                left_10 = left_10 + (products[7].Own - products[7].Consumed);
				                products[7].Consumed = 0;
				                products[7].Own = 0;
				                products[7].Purchase = "No";
				            }
				            
				            products[5].Purchase="Yes";
				            products[5].Own=10 + left_10 + (products[5].Own - products[5].Consumed);
				            console.log("owned now: "+products[5].Own);
				            products[5].Consumed = 0;
			            break;


		            case SPE_500:
				            let left_500 = 0;
				            if(products[8].Purchase == "Yes"){
				                left_500 = products[8].Own - products[8].Consumed;
				                products[8].Consumed = 0;
				                products[8].Own = 0;
				                products[8].Purchase = "No";
				            }
				            if(products[5].Purchase == "Yes"){
				                left_500 = left_500 + (products[5].Own - products[5].Consumed);
				                products[5].Consumed = 0;
				                products[5].Own = 0;
				                products[5].Purchase = "No";
				            }
				            
				            products[7].Purchase="Yes";
				            products[7].Own=500 + left_500 + (products[7].Own - products[7].Consumed);
				            console.log("owned now: "+products[7].Own);
				            products[7].Consumed = 0;
			            break;


		            case SPE_1000:
				            let left_1000 = 0;
				            if(products[7].Purchase == "Yes"){
				                left_1000 = products[7].Own - products[7].Consumed;
				                products[7].Consumed = 0;
				                products[7].Own = 0;
				                products[7].Purchase = "No";
				            }
				            if(products[5].Purchase == "Yes"){
				                left_1000 = left_1000 + (products[5].Own - products[5].Consumed);
				                products[5].Consumed = 0;
				                products[5].Own = 0;
				                products[5].Purchase = "No";
				            }
				            
				            products[8].Purchase="Yes";
				            products[8].Own=1000 + left_1000 + (products[8].Own - products[8].Consumed);
				            console.log("owned now: "+products[8].Own);
				            products[8].Consumed = 0;
			            break;

			        case SAVE_PDF: //Client-side PDF
			        	break;

					default:
						break;
				}

				this.setInappItems(products);
				observer.next(products);
				observer.complete();
			});

		});
	}

}
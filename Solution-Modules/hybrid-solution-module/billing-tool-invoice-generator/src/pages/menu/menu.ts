import { Component } from '@angular/core';
import { NavController, ToastController, Tabs , AlertController, ModalController } from 'ionic-angular';
import * as AppGeneral from 'socialcalc/AppGeneral';
import { APP_NAME, DATA, LINK } from '../../providers/data';
import { LocalService , File} from '../../providers/local-service';
import { CloudService} from '../../providers/cloud-service';
import { InappPurchaseService } from '../../providers/inapp-purchase-service';
import { LoginModalPage } from '../../pages/login-modal/login-modal';
import { Printer, PrintOptions, EmailComposer, SocialSharing, InAppBrowser } from 'ionic-native';

const IMG_LINK = 'www/assets/img/icon.png';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
	msc: any ;
	request: any = {};
	radioOpen: any;
	radioResult: any;
	applicationName: string;
	setting: any = {};

	constructor(public navCtrl: NavController,
				public toastCtrl: ToastController,
				public alertCtrl: AlertController,
				public modalCtrl: ModalController,
				public localService: LocalService,
				public cloudService: CloudService,
				public inapp: InappPurchaseService) {

		this.msc = DATA['home'][AppGeneral.getDeviceType()]['msc'];
		this.request = { pdf: {done: true}, allpdf: {done: true}, save: {done: true}, sharepdf: {done: true}};
		this.applicationName = APP_NAME;
		this.getSettingsForUser().then(setting =>{
    		this.setting = setting;
    	});

	}
	/********* Open a new file starts here *********/
	newFile(){
		AppGeneral.viewFile('default', JSON.stringify(this.msc));
		this.showToast("Loading new file....");
		var t: Tabs = this.navCtrl.parent;
	    this.showToast("Loading new file...")
	    setTimeout(() => {
	        t.select(0);
	    }, 2000);
	}
	/********* Open a new file ends here *********/

	/********* Save current file starts here *********/
	updateFile(){
		if(this.localService.selectedFile == 'default'){
	      this.showToast('Cannot update default file!');
	      return false;
	    }
		this.localService.getSelectedFile().then(selectedFile=>{
			let name = selectedFile;
			let content= encodeURIComponent(AppGeneral.getSpreadsheetContent());
			this.localService.getFile(name).then(data=>{
				let created = new Date(data.created).toString();
				this.localService.saveFile(new File(created, new Date().toString(), content, name));
				this.localService.setSelectedFile(name);
				this.showToast(name+' successfully updated!');
			});
		});
	}
	/********* Save current file ends here *********/

	/********* Save a new file starts here *********/
	saveAs(){
		let avail = false;
  		this.inapp.isSavePrintEmailAvailable().then(success =>{
  			avail = success;
  			console.log("Save as available ? "+success);
  			if(!avail){
	  			this.showAlert('Save As', 'Please purchase Save as, Print and Email from the In-app purchase tab to continue');
	  			return;
	  		}
			AppGeneral.saveAs().then(filename =>{
				console.log(filename);
				if(filename == "default" || filename == "Untitled"){
					this.showToast('Cannot update default file!');
					return false;
				}
				else if(filename == '' || !filename){
					this.showToast('Filename cannot be empty');
					return false;
				}
				else if(filename.length > 30) {
					this.showToast('Filename too long');
					return false;
				}
				else if(/^[a-zA-Z0-9- ]*$/.test(filename) == false) {
					this.showToast('Special Characters cannot be used');
					return false;
				}
				while(filename.indexOf(" ") != -1){
					filename = filename.replace(" ","");
				}
				console.log("continue saving "+filename);
				var content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
				//console.log(content);
				this.localService.saveFile(new File(new Date().toString(), new Date().toString(), content, filename));
				this.localService.setSelectedFile(filename);
				this.showToast(filename+' successfully saved!');

				this.inapp.updateSavePrintEmail().subscribe(units =>{
					console.log("updatePDF: "+units+" left");
					this.showToast("You have "+units+" units left");
					if(units <= 3){
						this.showAlert("Print","You have limited number of times remaining for doing Save as ,Print and Email.Kindly buy from the In-app purchase tab");
					}
				});
			}, err => JSON.stringify(err));
		});
	}
	/********* Save a new file ends here *********/

	/********* Print starts here ********/
	print(option){

		let that = this;
  		let avail = false;
  		this.inapp.isSavePrintEmailAvailable().then(success =>{
  			avail = success;
  			console.log("Print available ? "+success);
  			if(!avail){
	  			this.showAlert('Print', 'Please purchase Save as, Print and Email from the In-app purchase tab to continue');
	  			return;
	  		}
	  		var content; 
			if(option == 'all'){
				content = AppGeneral.getAllHTMLContent(this.msc);
			}
			else{
				content = AppGeneral.getCurrentHTMLContent();
			}

			let options: PrintOptions = {
			         name: APP_NAME+'.html',
			         duplex: true,
			         landscape: false,
			         grayscale: true
			   };

		    Printer.isAvailable().then(function(){
		      Printer.print(content, options).then(function(){
		          console.log("Done!");
		          that.inapp.updateSavePrintEmail().subscribe(units =>{
					console.log("updatePDF: "+units+" left");
						that.showToast("You have "+units+" units left");
						if(units <= 3){
							that.showAlert("Print","You have limited number of times remaining for doing Save as ,Print and Email.Kindly buy from the In-app purchase tab");
						}
					});
		      }, function(error){
		          console.log("Error while printing!");
		      });
		    }, function(error){
		          console.log("Failed.")
		    });
	  	});

		
    
	}

	/********* Print ends here ********/

	/********* Email start here ********/
	email(option){

		let that = this;
  		let avail = false;
  		this.inapp.isSavePrintEmailAvailable().then(success =>{
  			avail = success;
  			console.log("Email available ? "+success);
  			if(!avail){
	  			this.showAlert('Email', 'Please purchase Save as, Print and Email from the In-app purchase tab to continue');
	  			return;
	  		}
	  		var content;var subject;
			if(option == 'all'){
				content = AppGeneral.getAllHTMLContent(this.msc);
				subject = APP_NAME+' workbook attached';
			}
			else{
				content = AppGeneral.getCurrentHTMLContent();
				subject = APP_NAME+' attached';
			}

			let email = {
				to: '',
				cc: '',
				subject: subject,
				body: content,
				isHtml: true
			};

			EmailComposer.open(email).then(()=>{
				console.log("Email sent!");
				that.inapp.updateSavePrintEmail().subscribe(units =>{
					console.log("updatePDF: "+units+" left");
					that.showToast("You have "+units+" units left");
					if(units <= 3){
						that.showAlert("Email","You have limited number of times remaining for doing Save as ,Print and Email.Kindly buy from the In-app purchase tab");
					}
				});
			});
	  	});

	}
	/********* Email ends here ********/


	/********* Show toast starts here *********/
	showToast(message) { 
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
	/********* Show toast ends here *********/

	exportAsCsv(){
		let content = AppGeneral.getCSVContent();
		let email = {
			to: '',
			cc: '',
			subject: APP_NAME+" CSV attached",
			body: content,
			isHtml: true
		};

		EmailComposer.open(email);
	}

	/* Export as PDF */
  	exportAsPDF(option){
  		let that = this;
  		let avail = false;
  		this.inapp.isPDFAvailable().then(success =>{
  			avail = success;
  			console.log("Export PDF available ? "+success);
  			if(!avail){
	  			this.showAlert('Export as PDF', 'Please purchase Export as PDF from the In-app purchase tab to continue');
	  			return;
	  		}
	  		var content; 
			if(option == 'all'){
				content = AppGeneral.getAllHTMLContent(this.msc);
				this.request.allpdf.done = false;
			}
			else{
				content = AppGeneral.getCurrentHTMLContent();
				this.request.pdf.done = false;
			}

			this.cloudService.createPDF(content).subscribe(data => {
					var subject;
					if(option == 'one'){
						this.request.pdf.done = true;
						subject = APP_NAME+" PDF link available";
					}
					else{
						this.request.allpdf.done = true;
						subject = APP_NAME+" workbook PDF link available";
					}
					let result = data.result;
					if(result == "ok"){
						let pdfurl = data.pdfurl;
						console.log(pdfurl);
						this.openEmailComposer(pdfurl, subject);
						this.inapp.updatePDF().subscribe(units =>{
							console.log("updatePDF: "+units+" left");
							that.showToast("You have "+units+" units left");
						});
					}

				}, error => {
					if(option == 'one'){
						this.request.pdf.done = true;
					}
					else{
						this.request.allpdf.done = true;
					}
					console.log(JSON.stringify(error));
			}); //Cloudservice
  		});
  		
  	}

  	openEmailComposer(content, subject){
		let email = {
			to: '',
			cc: '',
			subject: subject,
			body: content,
			isHtml: true
		};

		EmailComposer.open(email);
  	}

  	/*** Supprt ***/
	write(){
	
		let email = {
			to: '',
			cc: '',
			subject: APP_NAME+': Please share your feedback',
			body: '',
			isHtml: true
		};

		EmailComposer.open(email);
	}

  	visit(){
    	// window.open('http://aspiringapps.com','_blank');
    	let browser = new InAppBrowser('http://aspiringapps.com', '_system');
    	setTimeout(()=>{
    		browser.close();
    	}, 3000);
	}

	refer(){
		let alert = this.alertCtrl.create();
	    alert.setTitle('Refer to a friend');

	    alert.addInput({ type: 'radio',label: 'Facebook',value: 'facebook',checked: false });
	    alert.addInput({ type: 'radio',label: 'Twitter',value: 'twitter',checked: false });
	    alert.addInput({ type: 'radio',label: 'Email',value: 'email',checked: false });

	    alert.addButton('Cancel');
	    alert.addButton({
	      text: 'OK',
	      handler: shareVia => {
	          this.radioOpen = false;
	          this.radioResult = shareVia;
	          let content = LINK;
	          if(shareVia == 'twitter'){
	            SocialSharing.shareViaTwitter(APP_NAME+' on the App Store', 'www/assets/img/icon.png', content).then(() => {
	                console.log("Twitter done");
	              }).catch(() => {
	                // this.showToast('Cannot share via Twitter!');
	            });
	          }
	          else if(shareVia == 'facebook'){
	            SocialSharing.shareViaFacebook(APP_NAME+' on the App Store', 'www/assets/img/icon.png' ,content).then(() => {
	              console.log("share via facebook done");
	              }).catch(() => {
	                // this.showToast('Cannot share via Facebook!');
	            });
	          }
	          else{
	              SocialSharing.canShareViaEmail().then(() => {
	                SocialSharing.shareViaEmail(content, APP_NAME+' on the App Store' ,null, null, null, null).then(() => {
	                  
	                }).catch(() => {

	                });
	              }).catch(() => {
	              console.log("email failed");

	              });
	          }
	      }
	    });
	    alert.present();
	}

	showAlert(title, subtitle) {
	    let alert = this.alertCtrl.create({
	      title: title,
	      subTitle: subtitle,
	      buttons: ['Ok']
	    });
	    alert.present();
	}

	share(){

    let avail = false;
    let alert = this.alertCtrl.create();
    alert.setTitle('Share PDF via');

    alert.addInput({ type: 'radio',label: 'Facebook',value: 'facebook',checked: false });
    alert.addInput({ type: 'radio',label: 'Twitter',value: 'twitter',checked: false });
    alert.addInput({ type: 'radio',label: 'WhatsApp',value: 'whatsapp',checked: false });
    alert.addInput({ type: 'radio',label: 'SMS',value: 'sms',checked: false });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: shareVia => {
          this.radioOpen = false;
          this.radioResult = shareVia;
          // console.log(shareVia);
          var content = AppGeneral.getCurrentHTMLContent();
          this.request.sharepdf.done = false;
          this.cloudService.createPDF(content).subscribe(data => {
                let result = data.result;
                this.request.sharepdf.done = true;
                if(result == "ok"){
                  let pdfurl = data.pdfurl;
                  this.sharePDF(pdfurl, shareVia);
                }
          }, error => {
	          	this.request.sharepdf.done = true;
                console.log(JSON.stringify(error));
          });
      }
    });

    this.inapp.isSharePDFAvailable().then(success =>{
    	avail = success;
    	console.log("Share PDF available ? "+avail);
    	if(!avail){
			this.showAlert('Share PDF', 'Please purchase Share PDF from the In-app purchase tab to continue');
			return;
		}
    	alert.present();
    });
  }

  sharePDF(pdfurl, shareVia){
    var self = this;

    var fName = APP_NAME;

    switch (shareVia) {
		case "email":
		  SocialSharing.canShareViaEmail().then(() => {

		    SocialSharing.shareViaEmail(pdfurl, fName+' PDF link available' ,null, null, null, null).then(() => {
		      console.log("email done");

		      self.inapp.updateSharePDF().subscribe(units =>{
		      	console.log("updateSharePDF: "+units+"  :left");
		      }); //Update Counter
		      //self.showToast('You have '+result+' units remaining. ');

		    }).catch(() => {

		    });

		  }).catch(() => {
		    console.log("email failed");
		    this.showToast('Cannot share via Email!');

		  });
		break;

		case "facebook":
		  SocialSharing.shareViaFacebook(fName+' PDF link available', IMG_LINK ,pdfurl).then(() => {
		      console.log("share via facebook done");

		      self.inapp.updateSharePDF().subscribe(units =>{
		      	console.log("updateSharePDF: "+units+"  :left");
		      	self.showToast('You have '+units+' units remaining. ');
		      }); 
		     

		    }).catch(() => {
		      this.showToast('Cannot share via Facebook!');
		  });
		break;

		case "twitter":
		  SocialSharing.shareViaTwitter(fName+' PDF link available', IMG_LINK ,pdfurl).then(() => {
		      console.log("Twitter done");

		       self.inapp.updateSharePDF().subscribe(units =>{
		      	console.log("updateSharePDF: "+units+"  :left");
		      	self.showToast('You have '+units+' units remaining. ');
		      }); 

		    }).catch(() => {
		      this.showToast('Cannot share via Twitter!');
		  });
		break;

		case "whatsapp":
		  SocialSharing.shareViaWhatsApp(fName+' PDF link available', IMG_LINK ,pdfurl).then(() => {
		      console.log("WhatsApp done");

		      self.inapp.updateSharePDF().subscribe(units =>{
		      	console.log("updateSharePDF: "+units+"  :left");
		      	self.showToast('You have '+units+' units remaining. ');
		      }); 

		    }).catch(() => {
		      this.showToast('Cannot share via WhatsApp!');
		  });
		break;

		case "sms":
		  SocialSharing.shareViaSMS(pdfurl, '').then(() => {
		      console.log("SMS done");

		      self.inapp.updateSharePDF().subscribe(units =>{
		      	console.log("updateSharePDF: "+units+"  :left");
		      	self.showToast('You have '+units+' units remaining. ');
		      }); 
		    
		    }).catch(() => {
		      this.showToast('Cannot share via SMS!');
		  });
		break;

		default:
		console.log('Share via not mentioned');
		break;
		}

	}

	/** Save to server */
	ionViewWillEnter(){
    	this.getSettingsForUser().then(setting =>{
    		this.setting = setting;
    	});
    	
	}

	getSettingsForUser(){
		return this.localService.getToken().then(token =>{
			if(token != null){
				return { status: true, label: APP_NAME+' Web' };
			}
			else{
				return { status: false, label: 'Login to Web' };
			}
		});
	}

	saveToServer(){
		let that = this;
		this.localService.getSelectedFile().then(selectedFile=>{
			let name = selectedFile;
			let content= encodeURIComponent(AppGeneral.getSpreadsheetContent());
			if(selectedFile == 'Untitled' || selectedFile == 'default'){
				
				let alert = this.alertCtrl.create({
				title: 'Enter the filename',
				inputs: [
				  {
				    name: 'name',
				    placeholder: 'Filename'
				  }
				],
				buttons: [
				  {
				    text: 'Cancel',
				    role: 'cancel',
				    handler: data => {
				      console.log('Cancel clicked');
				    }
				  },
				  {
				    text: 'Save',
				    handler: data => {
						if(data.name == "default" || data.name == "Untitled"){
							this.showToast('Cannot update default file!');
							return false;
						}
						else if(data.name == '' || !data.name){
							this.showToast('Filename cannot be empty');
							return false;
						}
						else if(data.name.length > 30) {
							this.showToast('Filename too long');
							return false;
						}
						else if(/^[a-zA-Z0-9- ]*$/.test(data.name) == false) {
							this.showToast('Special Characters cannot be used');
							return false;
						}
						while(data.name.indexOf(" ") != -1){
							data.name=data.name.replace(" ","");
						}
						console.log("continue saving "+data.name);
						
						let args = {
							appname: APP_NAME, filename: data.name, content: content
					    };

					    this.request.save.done = false;
					    this.cloudService.saveToServer(args).subscribe(response =>{
					        this.request.save.done = true;
					        console.log(response);
					        if(response.result == 'ok'){
					          that.showToast(data.name+' saved successfully!');
					        }
					        else if(response.result == 'fatal'){
					          this.catchFatalError();
					        }
					    }, error => {
					        this.request.save.done = true;
					        console.log(JSON.stringify(error));
					    });
						
				    }
				  }
				]
				});
				alert.present();
			}
			else{
				// Update File
				let args = {
					appname: APP_NAME, filename: name, content: content
			    };

			    this.request.save.done = false;
			    this.cloudService.saveToServer(args).subscribe(response =>{
			        this.request.save.done = true;
			        console.log(response);
			        if(response.result == 'ok'){
			          that.showToast(name+' saved successfully!');
			        }
			        else if(response.result == 'fatal'){
			          this.catchFatalError();
			        }
			    }, error => {
			        this.request.save.done = true;
			        console.log(JSON.stringify(error));
			    });
			}
		});
	}

	toggleSettings(setting){
    	console.log("Toggle: "+setting.status);
    	let loginModal = this.modalCtrl.create(LoginModalPage);
    	switch (setting.status) {
    		case true: 
    		this.localService.getToken().then(token =>{
    			if(token == null){
    				loginModal.present(); 
    				loginModal.onDidDismiss(data => {
					let action = '';
					if(data.action == 'login') action = 'Login';
					else action = 'Registration';
					if(data.status == 'ok' && data.user){
						this.setting.label = APP_NAME+' Web';
						this.setting.status = true;
						this.showToast(action+' successful!');
						this.localService.setToken(data.user);
					}
					else if(data.status == 'exists'){
						this.setting.label = 'Login to Web';
						this.setting.status = false;
						this.showToast('User already exists.Log in to continue');
					}
					else if(data.status == 'no'){
						this.setting.label = 'Login to Web';
						this.setting.status = false;
						this.showToast('User does not exists. Register to continue');
					}
					else{
						this.setting.label = 'Login to Web';
						this.setting.status = false;
						this.showToast(action+' failed.Try again');
					}

					});
    			}
    		});
    			break;

			case false:
			this.localService.getToken().then(token =>{
    			if(token == null){
    				this.setting.label = 'Login to Web';
			        this.setting.status = false;
			        return;
    			}
    			let confirm = this.alertCtrl.create({
				title: 'Log out?',
				message: 'Do you want to Log out?',
				buttons: [
				{
				  text: 'Cancel',
				  handler: () => {
				    console.log('Cancel clicked');
				    this.setting.label = APP_NAME+' Web';
				    this.setting.status = true;
				  }
				},
				{
				  text: 'Yes',
				  handler: () => {
				    console.log('Yes clicked');
				    this.cloudService.logout().subscribe(data => {
				       if(data.result == 'ok'){
				          this.showToast('Logout successful!');
				          this.setting.label = 'Login to Web';
				          this.localService.deleteToken();
				          this.setting.status = false;
				       }
				    }, error => {
				        console.log(JSON.stringify(error));
				    });
				  }
				}
				]
				});
				confirm.present();
			});
    			break;
    		
    		default:
    			break;
    	}
	}


	catchFatalError(){
    	this.setting.label = 'Login to Web';
    	this.localService.deleteToken();
    	this.setting.status = false;
    	this.showToast("Session expired. Login to continue");
	}

}
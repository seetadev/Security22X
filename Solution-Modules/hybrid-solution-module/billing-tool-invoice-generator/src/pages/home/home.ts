import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, PopoverController, AlertController } from 'ionic-angular';
import * as AppGeneral from 'socialcalc/AppGeneral';
import { DATA } from '../../providers/data';
import { LocalService, File } from '../../providers/local-service';
import { MultiService } from '../../providers/multi-service';
import { TemplatePopoverPage } from '../../pages/template-popover/template-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	footers : any = [];
	selectedFile : string ;
	msc: string ;
	device: string;
	choice: string;
	tableeditor: any;
	saveInterval : any;

	@ViewChild('tableeditor') defaultContent: ElementRef;

	constructor(public navCtrl: NavController,
				public localService: LocalService,
				public popoverCtrl:PopoverController,
				public templateService: MultiService,
				public alertCtrl: AlertController) {

		this.device = AppGeneral.getDeviceType();
		this.selectedFile = 'default';
		this.msc = DATA['home'][AppGeneral.getDeviceType()]['msc'];
		this.footers = DATA['home'][AppGeneral.getDeviceType()]['footers'];

		setInterval(() => {
			this.localService.getSelectedFile().then(selectedFile=>{
				this.selectedFile = selectedFile;
			});

		}, 1000);
	}	

	ionViewWillEnter(){

		this.localService.getSelectedFile().then(selectedFile=>{
			this.selectedFile = selectedFile;
			if(this.selectedFile != 'default'){
				this.localService.getFile(this.selectedFile).then(data => {
					AppGeneral.viewFile(this.selectedFile, decodeURIComponent(data.content));
				});				
			}
		});

		this.saveInterval = setInterval( ()=>{
			// console.log("Entering..")
			this.localService.getSelectedFile().then(selectedFile=>{
				if(selectedFile == 'default') {
					selectedFile = 'Untitled';
					let content= encodeURIComponent(AppGeneral.getSpreadsheetContent());
					this.localService.saveFile(new File(new Date().toString(), new Date().toString(), content, selectedFile));
					this.localService.setSelectedFile(selectedFile);
					return;
				}
				let name = selectedFile;
				let content= encodeURIComponent(AppGeneral.getSpreadsheetContent());
				this.localService.getFile(name).then(data=>{
					let created = new Date(data.created).toString();
					// console.log("is Phone? "+isPhone);
					this.localService.saveFile(new File(created, new Date().toString(), content, name));
					this.localService.setSelectedFile(name);
				});
			});
		}, 1000);
	}

	ionViewWillLeave(){
		clearInterval(this.saveInterval);
		this.localService.getSelectedFile().then(selectedFile=>{
			if(selectedFile == 'Untitled'){
				this.presentAlert('Save file', 'File temporary saved. Please click Save As in Menu to save file');
			}
		});
	}

	ngAfterViewInit() {
		var tableeditor: HTMLDivElement = this.defaultContent.nativeElement;
		this.tableeditor = tableeditor;
		AppGeneral.initializeApp(tableeditor, this.msc);
	}

	activateFooter(footer){
		AppGeneral.activateFooterButton(footer.index);
		// console.log("activating: "+footer.index+", name:"+footer.name);
		for(var i in this.footers){
			if(this.footers[i].index == footer.index){
				this.footers[i].isActive = true;
			}
			else{
				this.footers[i].isActive = false;
			}
		}
	}

	presentPopover(myEvent) {
		var tableeditor: HTMLDivElement = this.defaultContent.nativeElement;
		let popover = this.popoverCtrl.create(TemplatePopoverPage, {
			tableeditor: tableeditor
		});
		popover.present({
		  ev: myEvent
		});

		popover.onDidDismiss(data =>{
			if(data.footers){
				this.footers = data.footers;
			}
		});
	}
	presentAlert(title, subtitle) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: subtitle,
	    buttons: ['Ok']
	  });
	  alert.present();
	}

}

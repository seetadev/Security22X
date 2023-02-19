import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MultiService } from '../../providers/multi-service';
import { LocalService } from '../../providers/local-service';
import * as AppGeneral from 'socialcalc/AppGeneral';

@Component({
  selector: 'page-template-popover',
  templateUrl: 'template-popover.html'
})
export class TemplatePopoverPage {

	data: any;
	tableEditor: any;
	selectedTemplate: any;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public localService: LocalService,
				public templateService: MultiService,
				public viewCtrl: ViewController) {
		this.tableEditor = this.navParams.get('tableeditor');
		this.selectedTemplate = this.updateChoice();
	}

	ionViewDidLoad() {
		//console.log('Hello TemplatePopoverPage Page');
	}

	switchTemplate(choice){
		let device = AppGeneral.getDeviceType();
		// var msc_sales = this.sales.nativeElement.innerHTML;
		this.templateService.getDataByChoice(choice, device).subscribe(data => {
            	let args = {
            		msc: encodeURIComponent(JSON.stringify(data.msc)), tableeditor: this.tableEditor
            	};
            	// console.log(JSON.stringify(args));
            	AppGeneral.switchTemplate(args);
            	this.localService.setChoice(choice);
            	console.log(choice);
            	this.selectedTemplate = this.updateChoice();
            	this.localService.setSelectedFile('default');
            	this.viewCtrl.dismiss({
            		footers: data.footers
            	});
            },
            error => {
            	console.log(JSON.stringify(error));
            	this.viewCtrl.dismiss({
            		footers : null
            	});
            }
        );

	}

	updateChoice(){
		let choice;
		this.localService.getChoice().then(data =>{
			choice = data;
			switch (choice) {
				case "ledger":
					choice = "Ledger";
					break;
				case "home":
					choice = "Sales Activity";
					break;
			}
			return choice;
		});
	}

}

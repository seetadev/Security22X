import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { MultiService } from './multi-service';
import * as AppGeneral from 'socialcalc/AppGeneral';

export class File{
	
	created: string;
	modified: string;
	name: string
	content: string;

	constructor(created: string, modified: string, content: string, name: string) {
		this.created = created;
		this.modified = modified;
		this.content = content;
		this.name = name;
	}

}
@Injectable()
export class LocalService {
	public selectedFile: string;
	public choice: string;
	public token: string;

	constructor(public http: Http, public storage: Storage,
				public templateService: MultiService) {
		this.storage = storage;
		this.choice = 'home';
		this.getSelectedFile().then(selectedFile=>{
			this.selectedFile = selectedFile;
		});
		this.token = null;
	}

	saveFile(file: File){
		var fileData = {created: file.created, modified: file.modified, content: file.content};
		this.storage.set(file.name, fileData);
	}

	getAllFiles(){
		var files = new Array();
		this.storage.forEach( (value, key, index) => {
			// console.log(JSON.stringify(value));
			switch(key) {
				case "selectedFile":
				case "choice":
				case "inapplocal":
				case "token":
				case "cloudInapp":
					// do nothing...
					break;
				
				default:
					files.push({name: key, created: value.created, modified: new Date(value.modified).toLocaleString(), content: decodeURIComponent(value.content)});
					break;
			}
		});

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// console.log(JSON.stringify(files));
				this.getChoice().then(choice =>{
					this.choice = choice;
					this.templateService.getDataByChoice(choice, AppGeneral.getDeviceType()).subscribe(data => {
			            	files.push({name: 'default', created: new Date().toLocaleString(), modified: new Date().toLocaleString(), content: JSON.stringify(data.msc)});
							resolve(files);

			            },
			            error => {
			            	console.log(JSON.stringify(error));
			            }
        			);	
				});
			}, 500);
		});
	}

	getFile(name: string){
		return this.storage.get(name);
	}

	deleteFile(name: string){
		this.storage.remove(name);
	}

	setSelectedFile(selectedFile){
		this.storage.set('selectedFile', selectedFile);
		this.selectedFile = selectedFile;
		console.log("selectedFile updated: "+selectedFile);
	}

	getSelectedFile(){
		return this.storage.get('selectedFile').then(name=>{
			if(!name){
				this.storage.set('selectedFile', 'default');
				name = 'default';
			}
			this.selectedFile = name;
			return this.selectedFile;
		});
	}

	setChoice(choice){
		this.storage.set('choice', choice);
		this.choice = choice;
		console.log("choice updated: "+choice);
	}

	getChoice(){
		return this.storage.get('choice').then(choice=>{
			if(!choice){
				this.storage.set('choice', 'home');
				choice = 'home';
			}
			this.choice = choice;
			return this.choice;
		});
	}

	getToken(){
		return this.storage.get('token').then(token =>{
			if(!token){
				this.token = null;
				return null;
			}
			else{
				this.token = token;
				return this.token;
			}

		});
	}

	setToken(token){
		this.storage.set('token', token);
		this.token = token;
		console.log("token updated: "+token);
	}

	deleteToken(){
		this.storage.remove('token');
	}

}

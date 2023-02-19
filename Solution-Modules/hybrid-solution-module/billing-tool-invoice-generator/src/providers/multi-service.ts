import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DATA } from './data';

@Injectable()
export class MultiService {

	constructor(private http: Http) {
		
	}

	getDataByChoice(choice, device){
		return Observable.create(observer => {
	        observer.next(DATA[choice][device]);
	        observer.complete();
	});
	}

	getFootersByChoice(choice, device){
		return Observable.create(observer => {
	        observer.next(DATA[choice][device]['footers']);
	        observer.complete();
	});
	}


}

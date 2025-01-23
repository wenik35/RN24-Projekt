//api.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EntryModel } from './entry-model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public dataArray: EntryModel[];

    public updateSubject: Subject<EntryModel>;

    private updateDelay;

    constructor(private apiService: ApiService) {
        this.updateDelay = 1000;
        this.updateSubject = new Subject();
        this.dataArray = [];
        this.update();
    }

    private update(){
        try{
            this.apiService.getData(0, this.dataArray.length).subscribe(data => {
                (data as EntryModel[]).forEach((entry) => {
                    this.updateSubject.next(entry);
                    this.dataArray.push(entry);
                });

                this.updateDelay =
                Date.parse(this.dataArray[this.dataArray.length-1].timestamp)
                -
                Date.parse(this.dataArray[this.dataArray.length-2].timestamp);
            });


        } catch (e) {
            console.log(e);
        }
        
        setTimeout(this.update.bind(this), this.updateDelay);
    }
}
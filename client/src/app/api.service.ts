//api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    postRandomData(){
        const body = {
            timestamp: new Date(),
            value: Math.random()
        }

        this.http.post("http://localhost:3000/api/data/", body).subscribe(res => {
            console.log(res);
        });
    }

    getData(amount?: number, offset?: number) {
        return this.http.get(
            `http://localhost:3000/api/data/${amount ?? 0}/${offset ?? 0}`);
    }
}
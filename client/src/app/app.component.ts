import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';

interface EntryModel {
  timestamp: Date;
  value: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';

  data: EntryModel[] = [];

  constructor(private apiService: ApiService) { };

  public postRand(){
    this.apiService.postRandomData();
  }

  ngOnInit() {
    try{
      this.apiService.getData().subscribe(data => {
          this.data = (data as any[]);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

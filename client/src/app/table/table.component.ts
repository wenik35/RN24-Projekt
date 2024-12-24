import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EntryModel } from '../entry-model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  data: EntryModel[] = [];

  constructor(private apiService: ApiService) {};
  
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

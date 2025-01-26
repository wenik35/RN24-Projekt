import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../data-helpers/data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  public dataService: DataService;
  constructor(dataService: DataService) {
    this.dataService = dataService;
  };
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';

  message: any;
  constructor(private apiService: ApiService) { };
  ngOnInit() {
    this.apiService.getMessage().subscribe(data => {
        this.message = data;
    });
  }
}

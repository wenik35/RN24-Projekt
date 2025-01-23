import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './data-helpers/api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  public status?: string;

  constructor(private api: ApiService){
    this.api.getStatus().subscribe(status => {
      this.status = status.toString();
    })
  }
}

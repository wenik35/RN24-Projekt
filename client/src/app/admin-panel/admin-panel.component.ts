import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterState, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  constructor(
    private apiService: ApiService,
    private router: Router
  ){}

  public postRand(){
    const amount = Number((document.getElementById("amount") as HTMLInputElement).value);
    this.apiService.postRandomData(amount);

    this.router.navigate([""]);
  }

  public delete(){
    this.apiService.deleteData();

    this.router.navigate([""]);
  }
}

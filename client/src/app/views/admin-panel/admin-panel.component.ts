import { Component } from '@angular/core';
import { ApiService } from '../../data-helpers/api.service';
import { RouterState, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  public amount: number = 1;

  constructor(
    private apiService: ApiService,
    private router: Router
  ){}

  public postRand(){
    if (this.amount < 1){
      window.alert("Scherzkeks ( ° ͜ʖ͡°)╭∩╮");
    } else {
      this.apiService.postRandomData(this.amount);
  
      this.router.navigate([""]);
    }
  }

  public delete(){
    this.apiService.deleteData();

    this.router.navigate([""]);
  }
}

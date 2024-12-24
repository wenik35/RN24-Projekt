import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    {path: "", component: TableComponent},
    {path: "admin", component: AdminPanelComponent}
];

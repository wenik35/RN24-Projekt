import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TableComponent } from './table/table.component';
import { GraphComponent } from './graph/graph.component';

export const routes: Routes = [
    {path: "", component: TableComponent},
    {path: "admin", component: AdminPanelComponent},
    {path: "graph", component: GraphComponent}
];

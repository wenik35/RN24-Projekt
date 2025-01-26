import { Routes } from '@angular/router';
import { AdminPanelComponent } from './views/admin-panel/admin-panel.component';
import { TableComponent } from './views/table/table.component';
import { GraphComponent } from './views/graph/graph.component';

export const routes: Routes = [
    {path: "", component: TableComponent},
    {path: "admin", component: AdminPanelComponent},
    {path: "graph", component: GraphComponent}
];

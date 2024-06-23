import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ExpenseListComponent } from '../../expense-list/expense-list.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {ItemListComponent} from "../../item-list/item-list.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',        component: DashboardComponent },
    { path: 'expense-list',     component: ExpenseListComponent },
    { path: 'notifications',    component: NotificationsComponent },
    { path: 'item-list',        component: ItemListComponent }
];

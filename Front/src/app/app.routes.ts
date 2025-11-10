import { Routes } from '@angular/router';
import { reflectionGuard } from './core/guards/reflection.guard';

export const routes: Routes = [
  {
    path: 'reflection',
    loadComponent: () => import('./pages/reflection/reflection.component').then(m => m.ReflectionComponent),
    canActivate: [reflectionGuard]
  }
];

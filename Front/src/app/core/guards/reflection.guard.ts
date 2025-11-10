import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { CounterService } from '../services/counter.service';

export const reflectionGuard: CanActivateFn = (route, state) => {
  const counterService = inject(CounterService);
  const router = inject(Router);

  if (counterService.canAccess()) {
    counterService.increment();
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};


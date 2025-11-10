import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReflectionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5248/api/reflection/importers';

  getImporters(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}



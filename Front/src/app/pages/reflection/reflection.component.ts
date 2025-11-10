import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../../core/services/counter.service';
import { ReflectionService } from '../../core/services/reflection.service';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrl: './reflection.component.css'
})
export class ReflectionComponent implements OnInit {
  private counterService = inject(CounterService);
  private reflectionService = inject(ReflectionService);

  importers: string[] = [];
  loading: boolean = false;
  error: string | null = null;

  ngOnInit(): void {}

  loadImporters(): void {
    this.loading = true;
    this.error = null;
    this.importers = [];

    this.reflectionService.getImporters().subscribe({
      next: (data) => {
        this.importers = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error loading importers:', err);
        
        if (err.status === 0 || !err.status) {
          this.error = 'No se pudo conectar con el servidor.';
        } else if (err.status === 404) {
          this.error = 'Endpoint no encontrado. Verifica que la ruta del backend sea correcta.';
        } else if (err.status >= 500) {
          this.error = `Error del servidor (${err.status}). Por favor, revisa los logs del backend.`;
        } else if (err.status === 401 || err.status === 403) {
          this.error = 'No tienes permisos para acceder a este recurso.';
        } else {
          this.error = `Error al cargar los importadores: ${err.message || err.error?.message || 'Error desconocido'}`;
        }
      }
    });
  }

  get accessCount(): number {
    return this.counterService.getCount();
  }
}


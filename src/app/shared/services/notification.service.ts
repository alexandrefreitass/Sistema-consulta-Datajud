// src/app/shared/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  
  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  /**
   * Mostra uma notificação de sucesso
   */
  showSuccess(message: string, duration: number = 5000): void {
    this.addNotification({
      id: this.generateId(),
      message,
      type: 'success',
      duration
    });
  }

  /**
   * Mostra uma notificação de erro
   */
  showError(message: string, duration: number = 7000): void {
    this.addNotification({
      id: this.generateId(),
      message,
      type: 'error',
      duration
    });
  }

  /**
   * Mostra uma notificação de aviso
   */
  showWarning(message: string, duration: number = 5000): void {
    this.addNotification({
      id: this.generateId(),
      message,
      type: 'warning',
      duration
    });
  }

  /**
   * Mostra uma notificação informativa
   */
  showInfo(message: string, duration: number = 5000): void {
    this.addNotification({
      id: this.generateId(),
      message,
      type: 'info',
      duration
    });
  }

  /**
   * Remove uma notificação
   */
  removeNotification(id: string): void {
    const current = this.notifications$.value;
    const updated = current.filter(notification => notification.id !== id);
    this.notifications$.next(updated);
  }

  /**
   * Remove todas as notificações
   */
  clearAll(): void {
    this.notifications$.next([]);
  }

  private addNotification(notification: Notification): void {
    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    // Auto-remove notification after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.duration);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
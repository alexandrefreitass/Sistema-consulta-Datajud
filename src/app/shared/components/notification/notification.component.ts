// src/app/shared/components/notification/notification.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    imports: [CommonModule],
    template: `
    <div class="notification-container">
      @for (notification of notifications; track notification.id) {
        <div class="notification" [ngClass]="'notification--' + notification.type">
          <span class="notification__message">{{ notification.message }}</span>
          <button 
            class="notification__close" 
            (click)="removeNotification(notification.id)"
            aria-label="Fechar notificação">
            ×
          </button>
        </div>
      }
    </div>
  `,
    styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }

    .notification {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    }

    .notification--success {
      background-color: #d4edda;
      color: #155724;
      border-left: 4px solid #28a745;
    }

    .notification--error {
      background-color: #f8d7da;
      color: #721c24;
      border-left: 4px solid #dc3545;
    }

    .notification--warning {
      background-color: #fff3cd;
      color: #856404;
      border-left: 4px solid #ffc107;
    }

    .notification--info {
      background-color: #d1ecf1;
      color: #0c5460;
      border-left: 4px solid #17a2b8;
    }

    .notification__message {
      flex: 1;
      margin-right: 8px;
    }

    .notification__close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;
    }

    .notification__close:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription?: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotifications().subscribe(
      notifications => this.notifications = notifications
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }
}
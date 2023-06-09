import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  inboxCount: number = 0;
  @Output() isWriteModalOpen = new EventEmitter();

  constructor(
    private readonly messageService: MessageService,
    private readonly cookieService: CookieService,
    private readonly webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    this.messageService.getInBoxUnViewedMessagesCount(userId).subscribe({
      next: (res) => {
        this.inboxCount = res as number;
      },
      error: (err) => {
        console.log(err.error);
      },
    });

    this.webSocketService.getInComingCount().subscribe((data) => {
      this.inboxCount = data;
    });
  }

  openWriteModal() {
    this.isWriteModalOpen.emit(true);
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { EventAnalysisFacade } from '../../state/event-analysis.facade';
import { Event } from '../../../../shared/models/event';

@Component({
  selector: 'app-popular-event',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="popular-event-container">
      <h2>Most Popular Event</h2>

      <div *ngIf="analysisFacade.mostPopularEvent$ | async as popularEvent; else noEventTemplate" class="event-card">
        <h3>{{ popularEvent.title }}</h3>
        <p>{{ popularEvent.description }}</p>
        <p class="event-id">ID: {{ popularEvent.id }}</p>
      </div>

      <div *ngIf="analysisFacade.events$ | async as allEvents" class="all-events">
        <h4>All Available Events</h4>
        <ul>
          <li *ngFor="let eventItem of allEvents; trackBy: trackByEventId">
            {{ eventItem.title }}
          </li>
        </ul>
      </div>

      <ng-template #noEventTemplate>
        <p>No events available or no RSVPs yet.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .popular-event-container {
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .event-card {
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .event-id {
      color: #666;
      font-size: 0.9rem;
    }

    .all-events {
      margin-top: 1.5rem;
    }
  `]
})
export class PopularEventComponent implements OnInit {
  constructor(public analysisFacade: EventAnalysisFacade) {}

  ngOnInit(): void {
    this.analysisFacade.loadInitialData();
  }

  // TrackBy function for better performance with ngFor
  trackByEventId(index: number, eventItem: Event): string {
    return eventItem.id;
  }
}
import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';

import { Event } from '../../../shared/models/event';
import { Rsvp } from '../../../shared/models/rsvp';
import { Player } from '../../../shared/models/player';
import { RsvpService } from './rsvp.service';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class EventAnalysisFacade {
  // Exposed observables for components to consume
  readonly events$: Observable<Event[]> = this.rsvpService.events$;
  readonly rsvps$: Observable<Rsvp[]> = this.rsvpService.rsvps$;
  readonly players$: Observable<Player[]> = this.rsvpService.players$;

  // Derived state
  readonly mostPopularEvent$: Observable<Event | undefined> = combineLatest([
    this.events$,
    this.rsvps$
  ]).pipe(
    map(([availableEvents, eventRsvps]) =>
      this.analyticsService.findMostPopularEvent(eventRsvps, availableEvents)
    )
  );

  constructor(
    private rsvpService: RsvpService,
    private analyticsService: AnalyticsService
  ) {}

  // Public API methods for components
  loadInitialData(): void {
    this.loadEvents();
    this.loadRsvps();
    this.loadPlayers();
  }

  loadEvents(): void {
    this.rsvpService.loadEvents();
  }

  loadRsvps(): void {
    this.rsvpService.loadRsvps();
  }

  loadPlayers(): void {
    this.rsvpService.loadPlayers();
  }

  addRsvpToEvent(rsvp: Rsvp): void {
    this.rsvpService.addRsvp(rsvp);
  }

  removeRsvpFromEvent(playerId: string, eventId: string): void {
    this.rsvpService.removeRsvp(playerId, eventId);
  }
}
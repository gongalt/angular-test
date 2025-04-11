import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../../shared/models/event';
import { Rsvp } from '../../shared/models/rsvp';
import { Player } from '../../shared/models/player';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  private rsvpsSubject = new BehaviorSubject<Rsvp[]>([]);
  private playersSubject = new BehaviorSubject<Player[]>([]);

  events$: Observable<Event[]> = this.eventsSubject.asObservable();
  rsvps$: Observable<Rsvp[]> = this.rsvpsSubject.asObservable();
  players$: Observable<Player[]> = this.playersSubject.asObservable();


  loadEvents(): void {
    const events: Event[] = [
      { id: '1', title: 'Pickup Soccer', description: '5v5 game at the park' },
      { id: '2', title: 'Yoga Class', description: 'Outdoor yoga in the morning' },
    ];
    this.eventsSubject.next(events);
  }

  loadRsvps(): void {
    const rsvps: Rsvp[] = [
      { playerId: 'a1', eventId: '1' },
      { playerId: 'a2', eventId: '1' },
      { playerId: 'a3', eventId: '2' },
      { playerId: 'a4', eventId: '1' },
    ];
    this.rsvpsSubject.next(rsvps);
  }

  loadPlayers(): void {
    const players: Player[] = [
      { id: 'a1', name: 'Alex', age: 25 },
      { id: 'a2', name: 'Sam', age: 30 },
      { id: 'a3', name: 'Taylor', age: 28 },
      { id: 'a4', name: 'Jordan', age: 32 },
    ];
    this.playersSubject.next(players);
  }

  addRsvp(rsvp: Rsvp): void {
    const currentRsvps = this.rsvpsSubject.getValue();
    const exists = currentRsvps.some(
      r => r.playerId === rsvp.playerId && r.eventId === rsvp.eventId
    );

    if (!exists) {
      this.rsvpsSubject.next([...currentRsvps, rsvp]);
    }
  }

  removeRsvp(playerId: string, eventId: string): void {
    const currentRsvps = this.rsvpsSubject.getValue();
    const updatedRsvps = currentRsvps.filter(
      r => !(r.playerId === playerId && r.eventId === eventId)
    );
    this.rsvpsSubject.next(updatedRsvps);
  }

  getCurrentEvents(): Event[] {
    return this.eventsSubject.getValue();
  }

  getCurrentRsvps(): Rsvp[] {
    return this.rsvpsSubject.getValue();
  }
}
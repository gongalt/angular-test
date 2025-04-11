import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../../../shared/models/event';
import { Rsvp } from '../../../shared/models/rsvp';
import { Player } from '../../../shared/models/player';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private eventsDataSubject = new BehaviorSubject<Event[]>([]);
  private rsvpsDataSubject = new BehaviorSubject<Rsvp[]>([]);
  private playersDataSubject = new BehaviorSubject<Player[]>([]);

  events$: Observable<Event[]> = this.eventsDataSubject.asObservable();
  rsvps$: Observable<Rsvp[]> = this.rsvpsDataSubject.asObservable();
  players$: Observable<Player[]> = this.playersDataSubject.asObservable();

  loadEvents(): void {
    const eventsList: Event[] = [
      { id: '1', title: 'Pickup Soccer', description: '5v5 game at the park' },
      { id: '2', title: 'Yoga Class', description: 'Outdoor yoga in the morning' },
    ];
    this.eventsDataSubject.next(eventsList);
  }

  loadRsvps(): void {
    const rsvpsList: Rsvp[] = [
      { playerId: 'a1', eventId: '1' },
      { playerId: 'a2', eventId: '1' },
      { playerId: 'a3', eventId: '2' },
      { playerId: 'a4', eventId: '1' },
    ];
    this.rsvpsDataSubject.next(rsvpsList);
  }

  loadPlayers(): void {
    const playersList: Player[] = [
      { id: 'a1', name: 'Alex', age: 25 },
      { id: 'a2', name: 'Sam', age: 30 },
      { id: 'a3', name: 'Taylor', age: 28 },
      { id: 'a4', name: 'Jordan', age: 32 },
    ];
    this.playersDataSubject.next(playersList);
  }

  addRsvp(newRsvp: Rsvp): void {
    const currentRsvps = this.rsvpsDataSubject.getValue();
    const rsvpAlreadyExists = currentRsvps.some(
      existingRsvp => existingRsvp.playerId === newRsvp.playerId && existingRsvp.eventId === newRsvp.eventId
    );

    if (!rsvpAlreadyExists) {
      this.rsvpsDataSubject.next([...currentRsvps, newRsvp]);
    }
  }

  removeRsvp(playerId: string, eventId: string): void {
    const currentRsvps = this.rsvpsDataSubject.getValue();
    const filteredRsvps = currentRsvps.filter(
      existingRsvp => !(existingRsvp.playerId === playerId && existingRsvp.eventId === eventId)
    );
    this.rsvpsDataSubject.next(filteredRsvps);
  }

  getCurrentEvents(): Event[] {
    return this.eventsDataSubject.getValue();
  }

  getCurrentRsvps(): Rsvp[] {
    return this.rsvpsDataSubject.getValue();
  }
} 
import { Injectable } from '@angular/core';
import { LoggerService } from '../../../shared/services/logger.service';
import { Event } from '../../../shared/models/event';
import { Rsvp } from '../../../shared/models/rsvp';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private loggerService: LoggerService) {}

  findMostPopularEvent(eventRsvps: Rsvp[], availableEvents: Event[]): Event | undefined {
    if (!eventRsvps.length || !availableEvents.length) {
      this.loggerService.log('No RSVPs or events to analyze');
      return undefined;
    }

    const rsvpCountByEventMap = this.countRsvpsByEvent(eventRsvps);
    const mostPopularEventId = this.findEventIdWithMostRsvps(rsvpCountByEventMap);

    if (!mostPopularEventId) {
      return undefined;
    }

    const mostPopularEvent = availableEvents.find(event => event.id === mostPopularEventId);
    this.loggerService.log(`Most popular event found: ${mostPopularEvent?.title}`);

    return mostPopularEvent;
  }

  private countRsvpsByEvent(eventRsvps: Rsvp[]): Map<string, number> {
    return eventRsvps.reduce((countMap, rsvp) => {
      const currentCount = countMap.get(rsvp.eventId) || 0;
      countMap.set(rsvp.eventId, currentCount + 1);
      return countMap;
    }, new Map<string, number>());
  }

  private findEventIdWithMostRsvps(rsvpCountMap: Map<string, number>): string | undefined {
    if (!rsvpCountMap.size) {
      return undefined;
    }

    let highestRsvpCount = 0;
    let mostPopularEventId: string | undefined = undefined;

    rsvpCountMap.forEach((count, eventId) => {
      if (count > highestRsvpCount) {
        highestRsvpCount = count;
        mostPopularEventId = eventId;
      }
    });

    return mostPopularEventId;
  }
}
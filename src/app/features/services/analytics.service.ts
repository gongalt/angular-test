import { Injectable } from '@angular/core';
import { Event } from '../../shared/models/event';
import { Rsvp } from '../../shared/models/rsvp';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private logger: LoggerService) {}

  findMostPopularEvent(rsvps: Rsvp[], events: Event[]): Event | undefined {
    if (!rsvps.length || !events.length) {
      this.logger.log('No RSVPs or events to analyze');
      return undefined;
    }

    const rsvpCountMap = this.countRsvpsByEvent(rsvps);

    const mostPopularEventId = this.findEventIdWithMostRsvps(rsvpCountMap);

    if (!mostPopularEventId) {
      return undefined;
    }

    const mostPopularEvent = events.find(event => event.id === mostPopularEventId);

    this.logger.log(`Most popular event found: ${mostPopularEvent?.title}`);
    return mostPopularEvent;
  }

  private countRsvpsByEvent(rsvps: Rsvp[]): Map<string, number> {
    return rsvps.reduce((countMap, rsvp) => {
      const currentCount = countMap.get(rsvp.eventId) || 0;
      countMap.set(rsvp.eventId, currentCount + 1);
      return countMap;
    }, new Map<string, number>());
  }

  private findEventIdWithMostRsvps(rsvpCountMap: Map<string, number>): string | undefined {
    if (!rsvpCountMap.size) {
      return undefined;
    }

    let maxCount = 0;
    let maxEventId: string | undefined = undefined;

    rsvpCountMap.forEach((count, eventId) => {
      if (count > maxCount) {
        maxCount = count;
        maxEventId = eventId;
      }
    });

    return maxEventId;
  }
}
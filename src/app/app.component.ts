import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { PopularEventComponent } from './features/event-analysis/components/popular-event/popular-event.component';
import { LoggerService } from './shared/services/logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopularEventComponent, NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-container">
      <header>
        <h1>RSVP Analysis</h1>
      </header>

      <main>
        <app-popular-event></app-popular-event>
      </main>

      <footer>
        <p>Gametime Hero RSVP Analysis Challenge</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }

    header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      text-align: center;
      color: #666;
    }
  `]
})
export class AppComponent {
  constructor(private loggerService: LoggerService) {
    this.loggerService.log('App initialized with features-first structure');
  }
}
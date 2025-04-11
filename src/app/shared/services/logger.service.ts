import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string): void {
    console.log(`[Logger]: ${message}`);
  }

  error(message: string): void {
    console.error(`[Logger Error]: ${message}`);
  }
} 
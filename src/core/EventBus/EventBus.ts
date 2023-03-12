import { EventBusSkeleton, EventBusListeners, EventListener } from "./types";

class EventBus<T extends string = string> implements EventBusSkeleton<T> {
  private listeners: EventBusListeners<T> = {} as EventBusListeners<T>;

  on(event: T, callback: EventListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: T, callback: EventListener) {
    if (!this.listeners[event]) {
      throw new Error(`Event is not exists: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: T, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Event is not exists: ${event}`);
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }
}

export default EventBus;

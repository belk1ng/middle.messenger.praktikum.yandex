export type EventListener = (...args: unknown[]) => void;

export type EventBusListeners<T extends string = string> = {
  [key in T]: EventListener[];
};

export interface EventBusSkeleton<T extends string> {
  on(event: T, callback: EventListener): void;
  off(event: T, callback: EventListener): void;
  emit(event: T, ...args: unknown[]): void;
}

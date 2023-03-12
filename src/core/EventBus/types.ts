export type EventListener = (...args: unknown[]) => void;

export type EventBusListeners<T extends string = string> = {
  [key in T]: EventListener[];
};

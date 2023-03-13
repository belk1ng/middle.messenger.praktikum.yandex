import Block from "./Block";

export interface BlockProps {
  events?: Record<
    string,
    (event: KeyboardEvent | MouseEvent, ...args: unknown[]) => void
  >;
  settings?: {
    withInternalID?: boolean;
  };

  [key: string]: unknown;
}

export interface BlockMeta<T> {
  tagName: string;
  props: T;
}

export type BlockChildren = Record<string, Block>;

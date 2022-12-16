export declare type PayloadAction<
  P = void,
  T extends string = string,
  M = never,
  E = never,
> = {
  payload: P;
  type: T;
} & ([M] extends [never]
  ? {}
  : {
      meta: M;
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E;
      });

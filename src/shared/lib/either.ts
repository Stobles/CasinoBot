export type Left<L> = {
  readonly type: "Left";
  readonly value: L;
};

export type Right<R> = {
  readonly type: "Right";
  readonly value: R;
};

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R = never>(value: L): Either<L, R> => ({
  type: "Left",
  value,
});

export const right = <R, L = never>(value: R): Either<L, R> => ({
  type: "Right",
  value,
});

export const mapRight =
  <L, R, U>(fn: (r: R) => U) =>
  (e: Either<L, R>): Either<L, U> => {
    return e.type === "Right" ? right(fn(e.value)) : e;
  };

export const mapLeft =
  <L, R, U>(fn: (l: L) => U) =>
  (e: Either<L, R>): Either<U, R> => {
    return e.type === "Left" ? left(fn(e.value)) : e;
  };

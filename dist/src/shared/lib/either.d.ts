export type Left<L> = {
    readonly type: "Left";
    readonly value: L;
};
export type Right<R> = {
    readonly type: "Right";
    readonly value: R;
};
export type Either<L, R> = Left<L> | Right<R>;
export declare const left: <L, R = never>(value: L) => Either<L, R>;
export declare const right: <R, L = never>(value: R) => Either<L, R>;
export declare const mapRight: <L, R, U>(fn: (r: R) => U) => (e: Either<L, R>) => Either<L, U>;
export declare const mapLeft: <L, R, U>(fn: (l: L) => U) => (e: Either<L, R>) => Either<U, R>;
export declare const matchEither: <L, R, V>(either: Either<L, R>, matchers: {
    left: (error: NoInfer<L>) => V;
    right: (value: NoInfer<R>) => V;
}) => V;
//# sourceMappingURL=either.d.ts.map
export const left = (value) => ({
    type: "Left",
    value,
});
export const right = (value) => ({
    type: "Right",
    value,
});
export const mapRight = (fn) => (e) => {
    return e.type === "Right" ? right(fn(e.value)) : e;
};
export const mapLeft = (fn) => (e) => {
    return e.type === "Left" ? left(fn(e.value)) : e;
};
export const matchEither = (either, matchers) => {
    if (either.type === "Left") {
        return matchers.left(either.value);
    }
    return matchers.right(either.value);
};
//# sourceMappingURL=either.js.map
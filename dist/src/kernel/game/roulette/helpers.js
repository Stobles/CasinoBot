import { left, right } from "@/shared/lib/either.js";
const ROULETTE_COLORS = ["black", "red", "green"];
const ROULETTE_NUMBERS = Array.from({ length: 37 }, (_, i) => i);
export const ROULETTE_VALUES = {
    black: [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26],
    red: [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3],
    green: [0],
};
function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export function getRouletteGameResult() {
    const number = getRandomFromArray(ROULETTE_NUMBERS);
    const entry = Object.entries(ROULETTE_VALUES).find(([, values]) => values.includes(number));
    if (!entry) {
        return left("no-valid-entry");
    }
    const [color] = entry;
    return right({ color, number });
}
//# sourceMappingURL=helpers.js.map
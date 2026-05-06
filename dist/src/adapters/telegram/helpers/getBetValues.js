import { left, matchEither, right } from "@/shared/lib/either.js";
const COLOR_MAP = {
    черное: "black",
    чёрное: "black",
    черный: "black",
    чёрный: "black",
    black: "black",
    красное: "red",
    красный: "red",
    red: "red",
};
export function parseBetCommand(input, values) {
    const parts = input.trim().split(/\s+/);
    if (parts.length < 3) {
        return left("not-enough-args");
    }
    const colorRaw = parts[1].toLowerCase();
    const color = COLOR_MAP[colorRaw];
    if (!color || !values[color]) {
        return left("wrong-color");
    }
    let bet;
    let number = null;
    let amountRaw;
    if (parts.length === 3) {
        bet = {
            type: "color",
            value: color,
        };
        amountRaw = parts[2];
    }
    else {
        number = Number(parts[2]);
        if (!Number.isInteger(number)) {
            return left("wrong-number");
        }
        if (!values[color].includes(number)) {
            return left("wrong-number");
        }
        bet = {
            type: "number",
            value: number,
        };
        amountRaw = parts[3];
    }
    const amount = Number(amountRaw);
    if (!Number.isFinite(amount) || amount <= 0) {
        return left("wrong-amount");
    }
    return right({
        color,
        number,
        bet,
        amount,
    });
}
export function getParseBetCommandError(result) {
    return matchEither(result, {
        right: () => null,
        left: (e) => ({
            "not-enough-args": "Неверный формат команды: /dep <цвет> [число] <ставка>",
            "wrong-color": "Такого цвета нет",
            "wrong-number": "Этот цвет не содержит такого числа",
            "wrong-amount": "Невалидная сумма для ставки",
        })[e],
    });
}
//# sourceMappingURL=getBetValues.js.map
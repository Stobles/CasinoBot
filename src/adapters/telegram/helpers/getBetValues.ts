import type { BetData } from "@/entities/bet/index.js";
import type { RouletteColors } from "@/kernel/game/roulette/types.js";
import { left, matchEither, right, type Either } from "@/shared/lib/either.js";

type ParsedBet = {
  color: RouletteColors;
  amount: number;
  number: number | null;
  bet: BetData;
};

const COLOR_MAP: Record<string, RouletteColors> = {
  черное: "black",
  чёрное: "black",
  черный: "black",
  чёрный: "black",
  black: "black",

  красное: "red",
  красный: "red",
  red: "red",

  зелёное: "green",
  зеленое: "green",
  green: "green",
};

export function parseBetCommand(
  input: string,
  values: Record<RouletteColors, number[]>,
): Either<
  "not-enough-args" | "wrong-color" | "wrong-number" | "wrong-amount",
  ParsedBet
> {
  const parts = input.trim().split(/\s+/);

  if (parts.length < 3) {
    return left("not-enough-args");
  }

  const colorRaw = parts[1]!.toLowerCase();
  const color = COLOR_MAP[colorRaw];

  if (!color || !values[color]) {
    return left("wrong-color");
  }

  let bet: BetData;
  let number: number | null = null;
  let amountRaw: string;

  if (parts.length === 3) {
    bet = {
      type: "color",
      value: color,
    };

    amountRaw = parts[2]!;
  } else {
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

    amountRaw = parts[3]!;
  }
  if (!/^\d+$/.test(amountRaw)) {
    return left("wrong-amount");
  }

  const amount = Number(amountRaw);

  if (!Number.isFinite(amount) || amount <= 0 || amount >= 1000000) {
    return left("wrong-amount");
  }

  return right({
    color,
    number,
    bet,
    amount,
  });
}

export function getParseBetCommandError(
  result: Either<
    "not-enough-args" | "wrong-color" | "wrong-number" | "wrong-amount",
    ParsedBet
  >,
) {
  return matchEither(result, {
    right: () => null,
    left: (e) =>
      ({
        "not-enough-args":
          "Неверный формат команды: /dep <цвет> [число] <ставка>",
        "wrong-color": "Такого цвета нет",
        "wrong-number": "Этот цвет не содержит такого числа",
        "wrong-amount": "Невалидная сумма для ставки",
      })[e],
  });
}

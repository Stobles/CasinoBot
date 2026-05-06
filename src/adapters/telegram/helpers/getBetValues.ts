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

function isNumberish(value: string): boolean {
  return /^\d+$/.test(value);
}

function toInt(value: string): number | null {
  const n = Number(value);
  return Number.isInteger(n) ? n : null;
}

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

  if (!color) {
    return left("wrong-color");
  }

  const amountRaw = parts[parts.length - 1]!;

  if (!isNumberish(amountRaw)) {
    return left("wrong-amount");
  }

  const amount = Number(amountRaw);

  if (!Number.isFinite(amount) || amount <= 0 || amount >= 1_000_000) {
    return left("wrong-amount");
  }

  let number: number | null = null;
  let bet: BetData;

  /**
   * 🟢 SPECIAL CASE: green color → number bet 0
   */
  if (color === "green") {
    number = 0;

    if (!values.green.includes(0)) {
      return left("wrong-number");
    }

    bet = {
      type: "number",
      value: 0,
    };

    return right({
      color,
      number,
      bet,
      amount,
    });
  }

  /**
   * CASE 1: /dep red 100
   */
  if (parts.length === 3) {
    bet = {
      type: "color",
      value: color,
    };

    return right({
      color,
      number: null,
      bet,
      amount,
    });
  }

  /**
   * CASE 2: /dep red 12 100
   */
  const maybeNumber = toInt(parts[2]!);

  if (maybeNumber === null) {
    return left("wrong-number");
  }

  if (!values[color].includes(maybeNumber)) {
    return left("wrong-number");
  }

  bet = {
    type: "number",
    value: maybeNumber,
  };

  number = maybeNumber;

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

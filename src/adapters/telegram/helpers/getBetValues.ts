import { left, right, type Either } from "@/shared/lib/either.js";

type BetColor = "black" | "red";

type ParsedBet = {
  color: BetColor;
  number: number | undefined;
  amount: number;
};

const COLOR_MAP: Record<string, BetColor> = {
  черное: "black",
  чёрное: "black",
  черный: "black",
  чёрный: "black",
  black: "black",

  красное: "red",
  красный: "red",
  red: "red",
};

export function parseBetCommand(
  input: string,
  values: Record<string, number[]>,
): Either<
  "not-enough-args" | "wrong-command" | "wrong-color" | "wrong-number",
  ParsedBet
> {
  const parts = input.trim().split(/\s+/);

  // ожидаем: /bet <color> [number] <amount>
  if (parts.length < 3) {
    return left("not-enough-args");
  }

  if (parts[0] !== "/bet") {
    return left("wrong-command");
  }

  // --- COLOR ---
  const colorRaw = parts[1]!.toLowerCase();
  const color = COLOR_MAP[colorRaw];

  if (!color || !values[color]) {
    return left("wrong-color");
  }

  // --- NUMBER / AMOUNT ---
  let number: number | undefined;
  let amountRaw: string;

  if (parts.length === 3) {
    // /bet красное 100
    amountRaw = parts[2]!;
  } else {
    // /bet красное 12 100
    number = Number(parts[2]);

    if (!Number.isInteger(number)) {
      return left("wrong-number");
    }

    // ✅ ключевая проверка через values
    if (!values[color].includes(number)) {
      return left("wrong-number");
    }

    amountRaw = parts[3]!;
  }

  // --- AMOUNT ---
  const amount = Number(amountRaw);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Некорректная ставка");
  }

  return right({
    color,
    number,
    amount,
  });
}

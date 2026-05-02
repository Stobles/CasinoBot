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
): Either<
  | "not-enough-args"
  | "wrong-command"
  | "wrong-color"
  | "wrong-number"
  | "wrong-red"
  | "wrong-black",
  ParsedBet
> {
  const parts = input.trim().split(/\s+/);

  // ожидаем: /bet <color> [number] <amount>
  if (parts.length < 3) {
    return left("not-enough-args");
  }

  if (parts[0] !== "/dep") {
    return left("wrong-command");
  }

  // --- COLOR ---
  const colorRaw = parts[1]!.toLowerCase();
  const color = COLOR_MAP[colorRaw];

  if (!color) {
    return left("wrong-color");
  }

  // --- дальше нужно понять: есть ли число ---
  let number: number | undefined;
  let amountRaw: string;

  if (parts.length === 3) {
    // /bet красное 100
    amountRaw = parts[2]!;
  } else {
    // /bet красное 12 100
    number = Number(parts[2]);

    if (!Number.isInteger(number) || number < 1 || number > 36) {
      return left("wrong-number");
    }

    amountRaw = parts[3]!;
  }

  // --- AMOUNT ---
  const amount = Number(amountRaw);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Некорректная ставка");
  }

  // --- ДОП. ВАЛИДАЦИЯ (твое правило) ---
  if (number !== undefined) {
    const isEven = number % 2 === 0;

    if (color === "red" && !isEven) {
      return left("wrong-red");
    }

    if (color === "black" && isEven) {
      return left("wrong-black");
    }
  }

  return right({
    color,
    number,
    amount,
  });
}

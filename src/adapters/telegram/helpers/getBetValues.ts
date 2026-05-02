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

export function parseBetCommand(input: string): ParsedBet {
  const parts = input.trim().split(/\s+/);

  // ожидаем: /bet <color> [number] <amount>
  if (parts.length < 3) {
    throw new Error("Недостаточно аргументов");
  }

  if (parts[0] !== "/dep") {
    throw new Error("Неверная команда");
  }

  // --- COLOR ---
  const colorRaw = parts[1]!.toLowerCase();
  const color = COLOR_MAP[colorRaw];

  if (!color) {
    throw new Error("Некорректный цвет");
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
      throw new Error("Число должно быть от 1 до 36");
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
      throw new Error("Красное должно быть на четных числах");
    }

    if (color === "black" && isEven) {
      throw new Error("Черное должно быть на нечетных числах");
    }
  }

  return {
    color,
    number,
    amount,
  };
}

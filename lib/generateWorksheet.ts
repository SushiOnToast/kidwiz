import { Question } from "./types";

function getRandomInt(max: number, min: number = 0) {
  return Math.max(min, Math.floor(Math.random() * (max + 1)));
}

function generateMultiplication(min: number = 1, max: number = 12): Question {
  const num1 = getRandomInt(max, min);
  const num2 = getRandomInt(max, min);

  return { question: `${num1} x ${num2}`, answer: num1 * num2 };
}

export function generateWorksheet(
  questions: number,
  min: number,
  max: number,
  method: string,
) {
  let ws: Question[] = [];
  let operation = null;

  switch (method) {
    case "multiplication":
        operation = generateMultiplication;
  }

  if (!operation) {
    throw new Error("Method invalid or not selected!!");
  }

  for (let i = 1; i < questions + 1;) {
    const q = operation(min, max);

    if (!ws.some((existing) => existing.question === q.question)) {
        ws.push(q);
        i++;
    }
  }

  return ws;
}

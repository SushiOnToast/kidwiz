"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { generateWorksheet } from "@/lib/generateWorksheet";
import { Question } from "@/lib/types";
import QuestionCard from "@/components/QuestionCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import WorksheetPdf from "@/components/WorsheetPdf";

const METHODS = [
  { label: "Select a method", value: null },
  { label: "Addition", value: "addition" },
  { label: "Subtraction", value: "subtraction" },
  { label: "Multiplication", value: "multiplication" },
  { label: "Division", value: "division" },
];

export default function Home() {
  const [numQuestions, setNumQuestions] = useState<number>(12);
  const [numRange, setNumRange] = useState([4, 12]);
  const [method, setMethod] = useState<string | null>(null);
  const [methodError, setMethodError] = useState(false);

  const [showAllAnswer, setShowAllAnswer] = useState(false);
  const [questions, setQuestions] = useState<Question[]>();

  const [worksheetAnswers, setWorksheetAnswers] = useState(false);

  const handleSubmit = () => {
    if (!method) {
      setMethodError(true);
    } else {
      setQuestions(
        generateWorksheet(numQuestions, numRange[0], numRange[1], method),
      );
    }
  };

  return (
    <>
      <h1>Generate Worksheet</h1>

      {/* Options */}

      <FieldGroup className="grid max-w-full grid-cols-3">
        <Field>
          <FieldLabel htmlFor="questions">Questions</FieldLabel>
          <Input
            id="questions"
            type="number"
            value={numQuestions}
            onChange={(e) => {
              setNumQuestions(Number(e.target.value));
            }}
            min={1}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="num-range">Number Range</FieldLabel>
          <span className="text-sm text-muted-foreground">
            {numRange.join(" - ")}
          </span>
          <Slider
            id="num-range"
            value={numRange}
            onValueChange={(value) => setNumRange(value as number[])}
            min={0}
            max={20}
            step={1}
          />
        </Field>
        <Field data-invalid={methodError}>
          <FieldLabel htmlFor="method">Method</FieldLabel>
          <Select
            items={METHODS}
            value={method}
            onValueChange={(value) => {
              setMethod(value);
              setMethodError(false);
            }}
          >
            <SelectTrigger
              aria-invalid={methodError}
              className="w-full max-w-48"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Method</SelectLabel>
                {METHODS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {methodError && <FieldError>Please select a method.</FieldError>}
        </Field>
        <Field orientation="horizontal" onSubmit={handleSubmit}>
          <Button type="submit" onClick={handleSubmit}>
            Generate Worksheet
          </Button>
        </Field>
      </FieldGroup>

      {/* Worksheet */}
      {questions && (
        <div>
          <div>
            <Button onClick={() => setShowAllAnswer(!showAllAnswer)}>
              {showAllAnswer ? "Hide Answers" : "Show Answers"}
            </Button>
            <Field orientation="horizontal">
              <Button>
                <PDFDownloadLink
                  document={
                    <WorksheetPdf
                      questions={questions}
                      answers={worksheetAnswers}
                      title={`${method ? method.charAt(0).toUpperCase() + method.slice(1) : ""} Practice`}
                    />
                  }
                  fileName={`${method}-worksheet.pdf`}
                >
                  {({ loading }) =>
                    loading ? "Generating PDF..." : "Download Worksheet"
                  }
                </PDFDownloadLink>
              </Button>

              <Checkbox
                checked={worksheetAnswers}
                onCheckedChange={setWorksheetAnswers}
              />
              <FieldLabel>With Answers</FieldLabel>
            </Field>
          </div>

          <ol>
            {questions?.map((question, num) => (
              <QuestionCard
                key={num}
                num={num + 1}
                question={question}
                showAnswer={showAllAnswer}
              />
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

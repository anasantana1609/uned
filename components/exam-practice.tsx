"use client";
import { ExamHub } from "./exam-hub";
export function ExamPractice({ code }: { code: string }) {
  return <ExamHub code={code} />;
}

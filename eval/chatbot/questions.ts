import { CASE_STUDIES } from "../../lib/caseStudies";
import { certificateData } from "../../lib/certificates";
import { projects } from "../../lib/projects";

/**
 * Questions for the chat assistant. The questions are written by hand, but
 * every expected answer is read from the site's data, so when a number on the
 * site changes the expected answer changes with it.
 */

export type Check =
  /** Every number in `numbers` must appear in the answer. */
  | { kind: "numbers"; numbers: string[] }
  /** The answer must mention `text` (case-insensitive). */
  | { kind: "mentions"; text: string };

export interface Question {
  id: string;
  /** "th" questions also check that the answer is in Thai. */
  lang: "en" | "th";
  question: string;
  /** What a correct answer must contain, shown in the report. */
  expected: string;
  check: Check;
}

/** Numbers in a stat value: "17 / 20" gives ["17", "20"], "55%" gives ["55"]. */
export function numbersIn(value: string): string[] {
  return (value.match(/\d[\d,]*(?:\.\d+)?/g) ?? []).map((n) => n.replace(/,/g, ""));
}

function stat(slug: string, index: number): string {
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  const value = study?.stats[index]?.value;
  if (!value) throw new Error(`No stat ${index} in case study "${slug}"`);
  return value;
}

function statQuestion(id: string, lang: "en" | "th", question: string, slug: string, index: number): Question {
  const value = stat(slug, index);
  return { id, lang, question, expected: value, check: { kind: "numbers", numbers: numbersIn(value) } };
}

function countQuestion(id: string, lang: "en" | "th", question: string, count: number): Question {
  return { id, lang, question, expected: String(count), check: { kind: "numbers", numbers: [String(count)] } };
}

function projectTitle(title: string): string {
  if (!projects.some((p) => p.title === title)) throw new Error(`No project titled "${title}"`);
  return title;
}

function mentionQuestion(id: string, lang: "en" | "th", question: string, text: string): Question {
  return { id, lang, question, expected: text, check: { kind: "mentions", text } };
}

export function buildQuestions(): Question[] {
  return [
    statQuestion("th-prs", "en", "How many merged pull requests does Tournament Hub have?", "tournament-hub", 1),
    statQuestion("th-migrations", "th", "Tournament Hub มี SQL migration กี่ไฟล์", "tournament-hub", 2),
    statQuestion("th-formats", "en", "How many bracket formats does Tournament Hub support?", "tournament-hub", 0),
    statQuestion("rag-refused", "en", "In Thai RAG with Evaluation, how many out-of-corpus questions were refused?", "thai-rag-eval", 2),
    statQuestion("agents-correct", "th", "Thai RAG Agents ตอบถูกกี่ข้อ จากทั้งหมดกี่ข้อ", "thai-rag-agents", 0),
    statQuestion("mu-tests", "en", "How many Playwright smoke tests does the MU Esports Website run in CI?", "mu-esports-website", 1),
    statQuestion("mu-images", "th", "เว็บ MU Esports ลดขนาดรูปลงได้กี่เปอร์เซ็นต์", "mu-esports-website", 0),
    countQuestion("cert-count", "en", "How many certificates does Wish have?", certificateData.length),
    countQuestion("project-count", "en", "How many projects are in Wish's portfolio?", projects.length),
    mentionQuestion("mlp", "en", "Does Wish have a handwritten digit recognition project? What is it called?", projectTitle("MLP Digit Recognition")),
    mentionQuestion("fuwari", "th", "วิชญ์มีแอปช่วยอ่านหนังสือแบบ Pomodoro ไหม ชื่ออะไร", projectTitle("Fuwari Time")),
    mentionQuestion("th-case-study", "en", "Where can I read the Tournament Hub case study?", "/projects/tournament-hub"),
  ];
}

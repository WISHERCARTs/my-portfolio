export interface CaseStudyTable {
  caption: string;
  head: string[];
  rows: string[][];
}

export interface CaseStudySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: CaseStudyTable;
}

export interface CaseStudy {
  slug: string;
  /** Matches the project card's title on /projects. */
  title: string;
  intro: string;
  github: string;
  stats: { value: string; label: string }[];
  sections: CaseStudySection[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "thai-rag-eval",
    title: "Thai RAG with Evaluation",
    intro:
      "Thai question answering over 40 Wikipedia articles, built so that its quality can be measured instead of judged from a few demo questions.",
    github: "https://github.com/WISHERCARTs/thai-rag-eval",
    stats: [
      { value: "80 / 80", label: "questions where Gemini embeddings put the source passage in the top 3" },
      { value: "4 of 80", label: "questions where BM25 missed it in its top 3" },
      { value: "10 / 10", label: "out-of-corpus questions refused" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A RAG demo that answers three questions well proves very little. I wanted to know which way of finding passages works best for Thai, and to see exactly where each one fails.",
          "Thai has no spaces between words, so ordinary keyword search needs word segmentation first, and the choice between keyword, embedding and hybrid search is not obvious.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "A corpus of 40 Thai Wikipedia articles (provinces and well-known places), cut into 1,698 section-aware chunks of up to 700 characters.",
          "Three retrievers: BM25 over PyThaiNLP word segmentation, Gemini embeddings with cosine similarity, and both merged with reciprocal rank fusion.",
          "Answers written by Gemini from the retrieved passages only, with numbered citations, and \"ไม่พบข้อมูลในเอกสาร\" (not found in the documents) when the passages do not hold the answer.",
          "33 tests that run without an API key.",
        ],
      },
      {
        heading: "How I measured it",
        bullets: [
          "80 questions generated from sampled passages, one per passage and at most three per article. Each question records its source passage as the gold answer.",
          "Retrieval: whether the exact source passage is in the top 1, 3 or 5 (hit@k), mean reciprocal rank (MRR), and whether any passage from the right article was found.",
          "10 hand-written questions about things outside the corpus, to test refusal.",
          "Answer quality judged by Gemini for correctness and faithfulness to the passages.",
        ],
        table: {
          caption: "Retrieval results on the 80 questions",
          head: ["Retriever", "Hit@1", "Hit@3", "Hit@5", "MRR"],
          rows: [
            ["BM25", "0.838", "0.950", "0.963", "0.898"],
            ["Vector", "0.887", "1.000", "1.000", "0.942"],
            ["Hybrid", "0.900", "0.988", "0.988", "0.942"],
          ],
        },
      },
      {
        heading: "What I found",
        bullets: [
          "Vector search found the source passage in the top 3 for every question. BM25 missed 4 of 80.",
          "Hybrid put the exact passage first most often, but it tied vector on MRR and was slightly worse at picking the right article. On this question set hybrid did not clearly beat vector, and one question is 1.25 points, so I treat the gaps as noise.",
          "BM25 typically fails on a shared word with another meaning: a question about when Wat Phra Kaew was built ranked a section about Khao Yai's \"เขาแก้ว\" second, because both contain \"แก้ว\".",
          "The system refused all 10 out-of-corpus questions instead of using outside knowledge.",
          "My first answer-quality run scored 39 of 40 correct, but reading every miss showed the measurement was the weak part. One reference answer was wrong, and the judge accepted 540 km against a reference of 520 km because the article states both. I corrected the reference and made the judge match numbers, years and names exactly.",
        ],
      },
      {
        heading: "Next steps and limits",
        bullets: [
          "Re-run the answer-quality numbers with the stricter judge and the corrected reference on all 80 questions. The repository notes this re-run is still to do.",
          "The same model family writes the questions, answers them and judges them, so the results show relative differences between retrievers better than absolute quality.",
          "40 articles and 80 questions is a small benchmark, so differences of a few points are noise.",
        ],
      },
    ],
  },
  {
    slug: "thai-rag-agents",
    title: "Thai RAG Agents",
    intro:
      "A multi-agent question answering system on Google's Agent Development Kit, with a trace of every call and an evaluation set that I ran twice.",
    github: "https://github.com/WISHERCARTs/thai-rag-agents",
    stats: [
      { value: "17 / 20", label: "answers judged correct, in both runs" },
      { value: "10 to 17", label: "answerable questions carrying citations after one instruction change" },
      { value: "3 / 3", label: "unanswerable questions refused" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Some questions need more than one lookup, such as which of two provinces is closer to Bangkok. A single retrieve-then-answer pass handles these badly, and when it fails I want to see which step went wrong.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "A coordinator that splits a question into one sub-question per place.",
          "A researcher that searches the articles with the hybrid retriever from Thai RAG and writes findings with citations.",
          "A fact checker, a separate agent that sees only the draft and the collected passages, and verifies the draft before it is returned.",
          "Sub-agents used as tools instead of hand-offs, so the coordinator can call the researcher several times before it writes the draft. All agents share one list of sources in the session state, so the fact checker reads exactly the passages the researcher found.",
          "A tracing plugin that records every model and tool call as a call tree, and 54 tests that use scripted models and need no API key.",
        ],
      },
      {
        heading: "How I measured it",
        bullets: [
          "20 questions with reference answers taken from the articles: 8 single-fact, 8 comparisons that need two lookups, 3 unanswerable and 1 partly answerable.",
          "Per question: were the right articles found, is the answer correct and faithful (judged by Gemini), were comparisons split across enough lookups, did the fact checker run, plus model calls and time.",
          "Every run costs Gemini calls, so the command prints an estimate and refuses to start without an explicit flag.",
        ],
        table: {
          caption: "First run against the second, after one change to the coordinator's instruction",
          head: ["", "Run 1", "Run 2"],
          rows: [
            ["Answers judged correct", "17 / 20", "17 / 20"],
            ["Answerable questions with a citation", "10 / 17", "17 / 17"],
            ["Fact checker ran on answerable questions", "15 / 17", "17 / 17"],
            ["Unanswerable questions refused", "3 / 3", "3 / 3"],
            ["Model calls / seconds per question", "7.7 / 19.6", "8.1 / 22.0"],
            ["Tokens", "117,029", "132,331"],
          ],
        },
      },
      {
        heading: "What I found",
        bullets: [
          "Run 1 showed two process problems: only 10 of 17 answers cited a source, and the fact checker was skipped on two answerable questions. I tightened one coordinator instruction and ran again. Citations and fact-check use became complete at the cost of about 13% more tokens, and accuracy did not move, so I am not claiming the change made answers more correct.",
          "All three misses are explained. One is a reference problem: the article gives the distance to Nakhon Ratchasima as 259 km in one place and about 256 km in another. One is a real retrieval failure: the agent reported that Nong Khai's distance was not in the documents, although the article says 615 km, and the saved queries show the wording the researcher chose does not reach that passage. One is borderline: the judge probably counted a decimal rounding as wrong.",
          "Faithfulness is left out of the headline. Run 1's 0.70 included a bug of mine, a citation parser that read only single references. Run 2 scored 15 of 17 judged answers, but the two numbers are not comparable.",
        ],
      },
      {
        heading: "Next steps and limits",
        bullets: [
          "Fix the Nong Khai miss in retrieval or in how the researcher words its queries, not in the coordinator.",
          "One run per setup, so a one-question difference is within noise.",
          "The same model family answers and judges, and Wikipedia text can contradict itself between sections.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

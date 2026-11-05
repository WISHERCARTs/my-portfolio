import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSystemPrompt } from "../lib/chatPrompt";
import { CASE_STUDIES } from "../lib/caseStudies";
import { certificateData } from "../lib/certificates";
import { projects } from "../lib/projects";
import { buildQuestions } from "../eval/chatbot/questions";

const prompt = buildSystemPrompt();

test("every project card is in the prompt, with its links", () => {
  for (const project of projects) {
    assert.ok(prompt.includes(project.title), `missing project: ${project.title}`);
    assert.ok(prompt.includes(project.description), `stale description: ${project.title}`);
    if (project.demo) assert.ok(prompt.includes(project.demo), `missing demo link: ${project.title}`);
    if (project.github) assert.ok(prompt.includes(project.github), `missing GitHub link: ${project.title}`);
  }
  assert.ok(prompt.includes(`มีทั้งหมด ${projects.length} โปรเจกต์`));
});

test("every case study is linked, with its headline numbers", () => {
  for (const study of CASE_STUDIES) {
    assert.ok(prompt.includes(`/projects/${study.slug}`), `missing case study link: ${study.slug}`);
    for (const stat of study.stats) {
      assert.ok(prompt.includes(`${stat.value} (${stat.label})`), `missing stat in ${study.slug}: ${stat.value}`);
    }
  }
});

test("every case study has a project card that links to it", () => {
  for (const study of CASE_STUDIES) {
    assert.ok(
      projects.some((p) => p.caseStudy === study.slug),
      `no project card links to case study: ${study.slug}`,
    );
  }
});

test("every certificate is in the prompt, with its link", () => {
  for (const cert of certificateData) {
    assert.ok(prompt.includes(cert.title), `missing certificate: ${cert.title}`);
    assert.ok(prompt.includes(cert.link), `missing certificate link: ${cert.title}`);
  }
  assert.ok(prompt.includes(`มีทั้งหมด ${certificateData.length} ใบ`));
});

test("projects without public code tell the assistant not to link GitHub", () => {
  for (const project of projects.filter((p) => !p.github)) {
    const line = prompt.split("\n").find((l) => l.includes(`. ${project.title} — `));
    assert.ok(line?.includes("ห้ามให้ลิงก์ GitHub"), `no private-code note: ${project.title}`);
  }
});

test("every eval question resolves its expected answer from the site's data", () => {
  const questions = buildQuestions();
  assert.equal(new Set(questions.map((q) => q.id)).size, questions.length, "duplicate question id");
  for (const q of questions) {
    if (q.check.kind === "numbers") assert.ok(q.check.numbers.length > 0, `no numbers expected: ${q.id}`);
    else assert.ok(q.check.text.length > 0, `no text expected: ${q.id}`);
  }
});

test("the prompt ends with the answer language of the latest message", () => {
  const english = buildSystemPrompt("How many merged pull requests does Tournament Hub have?");
  assert.ok(english.trimEnd().endsWith("even though the information above is in Thai."));
  assert.ok(english.includes("The user wrote in English"));
  const thai = buildSystemPrompt("Tournament Hub มี PR กี่อัน");
  assert.ok(thai.trimEnd().endsWith("ให้ตอบเป็นภาษาไทย"));
  assert.ok(!buildSystemPrompt().includes("[Answer language]"));
});

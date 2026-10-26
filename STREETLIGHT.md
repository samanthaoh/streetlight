# Streetlight

A personal project: an AI road safety research and audit preparation assistant, starting with Blake Lane in Fairfax County, Virginia.

## Purpose

Help residents, community advocates, and eventually transportation staff answer:

> What has already been investigated on this road, what changed, and what remains unresolved?

The assistant gathers and explains evidence to help people prepare an investigation. Transportation professionals conduct formal audits and make engineering decisions.

## First milestone

Build a document-backed assistant for one corridor. Ask five Blake Lane questions and verify that every factual claim is supported by its cited source. Questions the documents cannot answer should receive an explicit “not found in these sources.”

## Getting started

1. Collect 3–5 relevant reports or studies from the [Blake Lane corridor safety updates page](https://www.fairfaxcounty.gov/providence/blake-lane-corridor-safety-updates).
2. Record each source's title, URL, publication date, and downloaded filename. Read enough to write five questions with known answers.
3. Extract document text while preserving page numbers.
4. Build a question-answering workflow that finds supporting passages, answers with citations, and identifies questions the sources cannot answer.
5. Build a simple corridor page: questions and answers on the left, supporting excerpts on the right, plus a document list.
6. After cited answers work, add a sourced timeline and an editable investigation brief.

Example initial question: “What speed measurements were collected, and when?” Clicking its citation should show the supporting passage.

## Initial technical direction

- Next.js and TypeScript for the application.
- Local document storage initially.
- A model API for source-grounded answers.
- For a handful of documents, supply their text directly if it fits. Add retrieval when needed; a vector database is not required at the outset.
- Keep API credentials on the server and out of version control.

These are starting choices, not finalized implementation decisions.

## Later features

- A sourced timeline of studies, community meetings, concerns, improvements, and follow-up evaluations.
- Structured evidence with exact page or passage citations.
- Open questions: missing information, conflicting findings, and improvements whose effects have not been evaluated.
- An editable, downloadable investigation brief.
- Additional Fairfax corridors and a map linking evidence to locations.
- Monitoring selected public sources for new reports and project updates.
- Separate document discovery, evidence extraction, and claim-checking agents if the workflow eventually benefits from them.

## Initial scope boundaries

Defer accounts, automated web discovery, risk scores, multiple agents, and a complex map. First establish that answers are faithful to the documents and citations are useful.

## Research status

The prior discussion suggested Fairfax already has safety maps and prioritization processes, making evidence gathering and audit preparation a promising focus. Specific claims about county procedures, audit frequency, crash statistics, and the Blake Lane timeline still need verification against primary sources before appearing in the product.

## Where to resume

Start by collecting the Blake Lane sources and writing five answerable evaluation questions, plus at least one question those sources cannot answer. Then scaffold the smallest application that can answer them with inspectable citations.

Saved October 21, 2026. No application has been implemented yet.

# Streetlight

A small corridor research workspace for transportation planners. The prototype connects historical Blake Lane findings to source pages and a draft investigation brief.

## Run locally

Requires Node.js 20 or newer. No packages or API keys are needed.

```sh
npm start
```

Open http://localhost:3000. To use another port, run `PORT=3001 npm start`.

## What works

- Three sample questions and a field-review starting answer.
- Citation buttons that highlight the related evidence card.
- Links to the original presentation at the cited PDF page.
- An editable investigation brief, saved in browser storage, with Markdown export.
- A source library and responsive layouts.

Answers are curated, not AI-generated. Free-text input recognizes the displayed sample questions and “What should I review before the next field visit?” Other questions receive an explicit scope message. This keeps the demo usable without an API key while making its limitations visible.

## Evidence and limitations

The demo uses selected text from the [May 30, 2023 Blake Lane community presentation](https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Documents/PDF/Blake%20Lane%20RSA%20-%20Outreach%20Meeting%201.pdf). Evidence cards contain paraphrases, not verbatim excerpts. Page numbers refer to physical PDF pages, which differ from printed slide numbers.

The full final audit is not included in answers. Page images have not been verified because the available reader failed to render them. Historical observations do not establish current road conditions, project completion, or causal safety effects. Investigation tasks are proposed follow-up questions, not engineering recommendations.

To download the original reports from a network-enabled environment:

```sh
python3 scripts/download_sources.py
```

The script checks PDF signatures and records SHA-256 hashes. Reports are ignored by Git; the app links to county-hosted originals.

## Push to a new GitHub repository

Create an empty GitHub repository, then run these commands **from this project folder**:

```sh
git init
git add .
git commit -m "Build Streetlight corridor review demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/streetlight.git
git push -u origin main
```

Replace `YOUR_USERNAME` and the repository name with your own. No repository has been created or pushed automatically.

## Optional GitHub Pages hosting

The app is static. In the repository's Settings → Pages, select **Deploy from a branch**, `main`, and `/ (root)`. Relative asset paths support hosting under a repository URL. The Node server is only for local preview. Google Fonts are optional; system fonts are used if that service is unavailable.

## Project structure

- `index.html`, `styles.css`, `app.js`: complete browser application.
- `server.mjs`: dependency-free local server with an explicit public-file allowlist.
- `data/evaluation.json`: provisional evidence evaluation cases for a future model workflow.
- `STREETLIGHT.md`, `STARTER.md`: research notes and project direction.
- `scripts/download_sources.py`: optional original-document downloader.

## Checks and next steps

Run `npm run check` for JavaScript syntax checks. The most useful next feature is a server-side, source-grounded question-answering endpoint with page-level citations and evaluation against the research questions. Keep model credentials on the server. Complete source verification before presenting new factual findings.

# Streetlight: portfolio prototype

## Product direction

Primary user: a transportation planner preparing a corridor review.

Demonstration: understand previous work on Blake Lane, inspect supporting evidence, and prepare the next investigation.

Build the evidence explorer first. Add a corridor timeline and editable investigation brief once cited answers work. Treat possible improvements as candidates for staff review, with the supporting evidence and missing inputs made explicit.

## Initial source register

Located October 25, 2026. Dates below are document or listing dates, not verified file creation dates. Files have not yet been downloaded.

| ID | Source | Date | Local filename to use | Review status |
| --- | --- | --- | --- | --- |
| county-updates | [Blake Lane Corridor Safety Updates](https://www.fairfaxcounty.gov/providence/blake-lane-corridor-safety-updates) | Undated, accessed October 25, 2026 | county-updates.html | Read web page; preserve a snapshot before using as an application source |
| final-rsa | [Final Blake Lane Road Safety Audit Report](https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Documents/Blake%20Lane%20RSA%20Final%20Report_508c.pdf) | November 2024 listing; cover date unverified | blake-lane-final-rsa.pdf | Link located; web reader rejected the 12.5 MB file; contents not reviewed |
| outreach-2023 | [Blake Lane Pedestrian Road Safety Audit: Community Meeting](https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Documents/PDF/Blake%20Lane%20RSA%20-%20Outreach%20Meeting%201.pdf) | May 30, 2023 | blake-lane-outreach-2023.pdf | Text inspected; page images and tables still need review |
| improvements-2022 | [Blake Lane Safety Improvements](https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Blake%20Lane%20Presentation%20June%2023%202022%20%28VDOT-FCDOT%20Final%29%20fixed.pdf) | June 23, 2022 | blake-lane-improvements-2022.pdf | Initial text inspected; complete review pending |

## Evaluation questions

These are starting checks, not a completed evaluation set. PDF page numbers below are one-based physical pages; printed slide numbers may differ. Verify full pages before treating expected answers as gold-standard labels.

1. **What corridor-wide concerns were presented in May 2023?**
   - Source: outreach-2023, PDF page 8.
   - Expected points: accessibility, pedestrian visibility cues, vehicle speeds, turning geometry, and trail connections.
2. **What pedestrian crossing concerns were documented?**
   - Source: outreach-2023, PDF page 9.
   - Expected points: exposure at uncontrolled crossings, crossing width, and transit-stop alignment.
3. **What nighttime concern was observed?**
   - Source: outreach-2023, PDF page 11.
   - Expected point: difficulty seeing pedestrians in darkness.
4. **Which crossing improvements were described as upcoming in May 2023?**
   - Source: outreach-2023, PDF page 17.
   - Expected points: flashing beacons at Bushman Drive and Bel Glade Street, and Sutton Road enhancements. The answer must retain the historical planned status.
5. **When does the county page say the school zone and speed camera were established?**
   - Source: county-updates, Past Events section.
   - Expected answer: April 2024. Identify this as the county page's account.
6. **How many pedestrian crashes did the speed camera prevent?**
   - Expected behavior: do not infer causation from before/after speed measurements. Confirm whether any downloaded source supports a causal estimate; otherwise answer "not found in these sources."

## Answer requirements

- Attach a source and page or section to every factual claim.
- Show the supporting passage when its citation is selected.
- Preserve source dates and distinguish observations, recommendations, plans, and documented completion.
- Missing completion evidence means status is unknown, not that work was never completed.
- Keep AI-proposed investigation questions separate from report recommendations.
- Show disagreements between sources rather than silently selecting one.

## Next implementation step

### Working prototype

A dependency-free static demo is now implemented in `index.html`, `styles.css`, and `app.js`. Run `npm start` and open http://localhost:3000. It supports curated sample answers, evidence selection, source links, and editable Markdown brief export. See `README.md` for setup and GitHub instructions. No model API is connected.

JavaScript syntax and interaction logic checks passed. This workspace denied binding the local preview port, so browser layout verification remains pending.

### Progress on October 25, 2026

- Added `scripts/download_sources.py` to download and validate the three original PDFs and record checksums.
- Direct download attempts failed because this workspace could not resolve the county hostname. No PDFs are saved locally.
- Rechecked the 2023 presentation's web-reader text and saved five provisional checks in `data/evaluation.json`.
- Attempted page screenshots; the web reader returned cache errors. Visual verification remains pending.
- No model evaluation or application has run yet.

Download the three PDFs, preserve originals, and extract text into page records containing source ID, physical page number, and text. Visually verify the evaluation pages. Review the final audit before making any claim about current implementation status. Then build a question-and-evidence view using this fixed source set.

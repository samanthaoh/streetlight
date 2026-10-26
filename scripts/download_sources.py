"""Download original public PDFs. Run from any directory with Python 3."""

import hashlib
import json
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "blake-lane-final-rsa.pdf": "https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Documents/Blake%20Lane%20RSA%20Final%20Report_508c.pdf",
    "blake-lane-outreach-2023.pdf": "https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Documents/PDF/Blake%20Lane%20RSA%20-%20Outreach%20Meeting%201.pdf",
    "blake-lane-improvements-2022.pdf": "https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Blake%20Lane%20Presentation%20June%2023%202022%20%28VDOT-FCDOT%20Final%29%20fixed.pdf",
}


def main():
    folder = ROOT / "sources"
    folder.mkdir(exist_ok=True)
    manifest = []
    for filename, url in SOURCES.items():
        target = folder / filename
        try:
            if target.exists():
                content = target.read_bytes()
            else:
                with urlopen(url, timeout=60) as response:
                    content = response.read()
            if not content.startswith(b"%PDF-"):
                raise ValueError("Response is not a PDF")
            if not target.exists():
                temporary = target.with_suffix(".pdf.part")
                temporary.write_bytes(content)
                temporary.replace(target)
            manifest.append({"filename": filename, "url": url,
                             "sha256": hashlib.sha256(content).hexdigest(),
                             "bytes": len(content), "status": "downloaded"})
            print(f"Ready: {filename} ({len(content)} bytes)")
        except Exception as error:
            manifest.append({"filename": filename, "url": url,
                             "status": "failed", "error": str(error)})
            print(f"Failed: {filename}: {error}")
    (folder / "download-status.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return 1 if any(item["status"] == "failed" for item in manifest) else 0


if __name__ == "__main__":
    raise SystemExit(main())

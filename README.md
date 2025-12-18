# Haushaltsetat-Planung

End-to-End-Projekt zur privaten Budgetverwaltung.

- React Native App (Eingabe mobil)  
- Laravel API + MySQL (Persistenz, Auswertung)  
- Web-View (geplant)

---

## 1) Projektüberblick & Zielsetzung

Dieses Projekt dient als praxisnahe Arbeitsprobe für eine End-to-End-Architektur aus mobiler App, Backend-API und Datenpersistenz.

Die mobile App (Expo + React Native + TypeScript) ermöglicht das schnelle Erfassen von Ausgaben. Datensätze werden zunächst lokal gespeichert und später an ein Laravel-Backend (MySQL) synchronisiert.

Optional ist ein separater Python-Dienst (FastAPI) vorgesehen, der Beleg-Fotos
per OCR/LLM verarbeitet und strukturierte Felder extrahiert.

### Leitprinzipien
* Offline‑first, zuverlässige Sync‑Strategie
* Datensouveränität: Speicherung ausschließlich auf eigener Hardware
* Minimaler Benutzeraufwand bei der Eingabe (manuell oder automatisiert per Foto)
* Modulare Architektur: App, Laravel‑API, Python‑OCR‑Service getrennt versionierbar

### High‑Level‑Architektur
* Mobile App: Expo + TypeScript, lokaler SQLite‑Speicher, Sync‑Queue, Kamera‑Capture, WLAN‑Erkennung
* Backend (Repo #2): Laravel 11, MySQL 8, Token‑Auth, REST‑API für Ausgaben
* Beleg‑Service (Repo #3): Python/FastAPI, OCR + LLM‑Extraktion, Callback/Webhook an Laravel
* Später Web‑Frontend: Reporting, Filter, Export, evtl. Grafana/Metabase oder eigenes UI

---

## 2) Roadmap & Releases

Wir verwenden **semantische Versionierung** (`MAJOR.MINOR.PATCH`) und halten das Changelog nach **Keep a Changelog**‑Konventionen.

### Geplante Meilensteine

* **v0.1.0 – App Skeleton**: RN + TS Setup, Beispielbildschirm, Basisnavigation, ESLint/Prettier, Unit‑Test‑Setup
* **v0.2.0 – Eingabe & lokaler Speicher**: Formular „Ausgabe anlegen“, Validierung, SQLite‑Schema, Liste & Detailansicht
* **v0.3.0 – Sync‑Grundlage**: WLAN‑Heimnetz‑Check, konfigurierbare Base‑URL, Health‑Check, Hintergrund‑Sync manuell
* **v0.4.0 – Backend MVP**: [Backend-Repository](https://github.com/Twist1978/budget-store) Laravel Projekt, MySQL Migration „expenses“, API Endpoints (CRUD), Token‑Auth, CORS
* **v0.5.0 – Vollständige Synchronisation**: Konfliktstrategie, Delta‑Sync, Retry/Backoff, visuelles Sync‑Log
* **v0.6.0 – Kategorien & Reports**: Kategorien, Filter, einfache Diagramme, Export CSV
* **v0.7.0 – Belege/Anhänge + KI‑Extraktion:** Kamera‑Capture, JPEG‑Kompression, Größenlimit (z. B. ≤2 MB), Upload zum Raspberry Pi, Python‑Service (FastAPI) extrahiert Felder via OCR/LLM (Betrag, Datum, Händler, Kategorie‑Vorschlag), Vorschaubilder und Status‑Rückmeldung an App
* **v1.0.0 – Stable:** Stabilisierung, Performance, Dokumentation, Backups, Security‑Review

### Changelog (Auszug)

> Ausführlichere Einträge folgen bei den jeweiligen Releases.

#### [Unreleased]

* Projektgerüst, README, Konventionen, CI‑Platzhalter

#### [0.1.0] – 2025-11-06

* React Native + TypeScript initialisiert
* ESLint/Prettier konfiguriert
* Beispielscreen + Navigation
* Jest/React Testing Library Basis

**Release‑Prozess**

1. Versionsnummer in `package.json` (App) und ggf. `composer.json` (Backend) erhöhen.
2. Changelog pflegen.
3. Git‑Tag erstellen: `git tag vX.Y.Z && git push --tags`.
4. Release Notes im Repo anlegen.
5. Optional: Build‑Artefakte (Android/iOS) anhängen.

---

## 3) Tech‑Stack

* **App:** Expo (Managed), React Native, TypeScript, Expo Router (optional), `expo-sqlite` oder `@sqlite.org/sqlite-wasm-expo` (wenn Web geplant), AsyncStorage, Jest + React Testing Library
* **Backend:** Separates Repository (Laravel 11, MySQL, Raspberry Pi Deployment). Link folgt nach Erstellung.

---

## 4) Setup: App (Expo + TypeScript)

### Voraussetzungen

* Node.js LTS, npm oder pnpm/yarn
* Android Studio Emulator oder ein echtes Gerät mit Expo Go
* Xcode optional für iOS Builds
* EAS CLI für produktive Builds: `npm i -g eas-cli`

### Lokales Starten

```bash
# Dependencies
npm ci

# Dev-Server starten
npx expo start

# Im Emulator/Gerät öffnen
# a = Android, i = iOS, w = Web (falls Webziel gewünscht)
```

### Nützliche Skripte (Beispiel)

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "lint": "eslint .",
    "test": "jest",
    "typecheck": "tsc --noEmit",
    "eas:build:android": "eas build -p android",
    "eas:build:ios": "eas build -p ios"
  }
}
```

### Ordnerstruktur (Vorschlag)

```
app/                # optional: Expo Router
  (tabs)/
  _layout.tsx
  components/
  screens/
  navigation/
  hooks/
  store/
  services/
    api/
    db/
  utils/
  types/
assets/
__tests__/
```

### Expo‑Konfiguration

* `app.json` oder `app.config.ts` pflegen (Name, Slug, Icons, Splash, Permissions).
* Für native Module im Managed Workflow nach Möglichkeit Expo‑APIs verwenden.

### EAS Build (optional für Releases)

```bash
eas login
eas build -p android --profile preview
eas build -p ios --profile preview
```

---

## 5) Domänenmodell & Speicherung

### Ausgaben‑Entität (App‑Seite)

* `id` (UUID v4, client‑seitig erzeugt)
* `amount` (number, in Cent)
* `currency` (string, default "EUR")
* `date` (ISO‑8601)
* `category` (string)
* `note` (string optional)
* `attachmentUri` (string optional, Foto‑Pfad)
* `syncStatus` (`pending|synced|failed`)
* `updatedAt` (ISO‑8601)

### SQLite in Expo

* Verwende `expo-sqlite` für iOS/Android. Für Web wahlweise den WASM‑Adapter.

```sql
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  note TEXT,
  attachment_uri TEXT,
  sync_status TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_expenses_updated_at ON expenses(updated_at);
```

---

## 6) API‑Vertrag (MVP)

**Base URL:** `http://<raspberry-ip-or-host>/api`

### Health

* `GET /health` → `{ status: "ok", service: "expenses", version: "x.y.z" }`

### Auth

* Token‑basiert (z. B. Laravel Sanctum). Token in `Authorization: Bearer <token>`.

### Ausgaben

* `POST /expenses` → Body: obenstehendes Modell ohne `syncStatus`; Server speichert und antwortet mit Server‑`updated_at`.
* `GET /expenses?since=<ISO8601>` → geänderte Datensätze seit Zeitstempel.
* `PUT /expenses/{id}` → Update vorhandener Datensätze.

**Konflikte**

* Last‑Write‑Wins für MVP, später Merge‑Strategie.

---

## 7) Sync‑Strategie

* **Queue‑Ansatz:** lokale Änderungen in eine Outbox‑Tabelle schreiben.
* **Trigger:** manuell in v0.3.0, später automatisch bei Heimnetz.
* **Retry/Backoff:** exponentiell, Max‑Versuche konfigurierbar.
* **Netzwerk‑Check:** SSID‑Allowlist oder feste IP‑Range des Heimnetzes.

---

## 8) Konfiguration & Umgebungsvariablen

### App (Expo)

Verwende `app.config.ts` + `expo-constants` oder `expo-env` für Variablen.

```
API_BASE_URL=http://192.168.178.50
API_TOKEN=<token>
HOME_SSID=MeinHeimWLAN
```

> Sensible Werte nicht committen. In EAS Profiles als Secrets pflegen.

---

## 9) Qualitätssicherung

* **Linting:** ESLint + Prettier, `npm run lint`
* **Typprüfung:** `npm run typecheck`
* **Tests:** Jest + React Testing Library
* **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:` …)
* **CI (Platzhalter):** Lint, Typecheck, Tests bei PRs; Build Job optional

---

## 10) Security & Datenschutz

* App sendet Daten nur im Heimnetz (SSID/IP‑Check).
* HTTPS im Heimnetz empfohlen (self‑signed Zertifikat + Pinning optional).
* Token‑Auth, kurze Token‑Lebensdauer, Gerätebindung denkbar.
* Backups der MySQL‑DB, Rotation, Verschlüsselung im Ruhezustand optional.

---

## 11) Troubleshooting

* Expo Dev‑Server hängt → `expo start -c` zum Cache reset.
* Android Emulator findet Dev‑Server nicht → `adb reverse tcp:8081 tcp:8081` oder via QR in Expo Go öffnen.
* iOS: Pods selten nötig im Managed Workflow; bei `expo run:ios` ggf. `cd ios && pod install`.
* Permissions (Kamera, Medien) in `app.json/app.config.ts` konfigurieren.

---

## 12) Lizenz

Privatprojekt.

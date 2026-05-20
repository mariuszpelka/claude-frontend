# Releasowanie paczek

Ten dokument opisuje, jak wersjonować i publikować paczki z tego monorepo na
npm. Setup opiera się na **[Changesets]** (rekord intencji bumpu) +
**[pnpm workspaces]** (instalacja) + **[Nx]** (build orchestration).

[Changesets]: https://github.com/changesets/changesets
[pnpm workspaces]: https://pnpm.io/workspaces
[Nx]: https://nx.dev

---

## 1. Stan setupu (TL;DR)

| Element | Konfiguracja |
| --- | --- |
| Paczki publikowane | `@p4/crm-mvp-components-{tokens,tailwind-preset,react,vue,angular}` |
| Konfig Changesets | `.changeset/config.json` |
| `linked` | `tokens` ↔ `tailwind-preset` (releasują się **razem**) |
| `updateInternalDependencies` | `"patch"` — automatyczny patch bump zależnych paczek workspace |
| `access` | `"restricted"` (paczki prywatne, scope `@p4`) |
| `baseBranch` | `main` |
| Komendy npm | `pnpm changeset`, `pnpm version-packages`, `pnpm release` |
| `preVersionCommand` (Nx) | `pnpm dlx nx run-many -t build` |

**Konsekwencje:**
- Możesz releasować Angular / React / Vue **niezależnie** — każda paczka ma własny numer wersji.
- Bump `tokens` **zawsze** ciągnie bump `tailwind-preset` (linked).
- Bump `tailwind-preset` ciągnie automatyczny **patch** w paczkach frameworkowych (przez `updateInternalDependencies: patch`).
- Release jest **manualny** — wykonywany lokalnie przez release managera. CI (`.github/workflows/ci.yml`) robi tylko lint/test/build/typecheck na PR-ach, **nie publikuje**.

---

## 2. Mental model — co to jest changeset

`Changeset` to plik markdown w `.changeset/` opisujący:
- które paczki należy bumpnąć,
- jakiego rodzaju bump (`patch` / `minor` / `major`),
- co się zmieniło (changelog entry).

Plik tworzony jest na PR-ze przez autora zmiany, **przed mergem**. Sam plik
**nie zmienia** wersji — robi to dopiero `pnpm version-packages` w momencie
releasu.

Przykład wygenerowanego pliku `.changeset/curly-foxes-jump.md`:

```md
---
"@p4/crm-mvp-components-angular": minor
---

Migrated Tooltip/Tabs/DropdownMenu/Dialog to @radix-ng/primitives.
```

Wskazówka — jedna PR-ka może zawierać **wiele** plików changeset (np. gdy
jedna zmiana dotyczy `@p4/crm-mvp-components-react` jako `minor`, a
`@p4/crm-mvp-components-tokens` jako `patch`).

---

## 3. Workflow developera (na każdym PR-ze)

1. Skończ pracę nad zmianą.
2. Uruchom:
   ```bash
   pnpm changeset
   ```
3. Interaktywnie wybierz:
   - **które paczki** zmieniłeś (spacja zaznacza, enter zatwierdza),
   - **typ bumpu** dla każdej (`patch` / `minor` / `major`),
   - **opis** — pisz dla użytkownika paczki, nie dla siebie. Trafi do CHANGELOG.md.
4. Commituj wygenerowany plik `.changeset/*.md` razem z resztą zmian.
5. Wypchnij PR-a.

**Reguły kciuka dla typu bumpu (semver):**

| Typ | Kiedy | Przykład |
| --- | --- | --- |
| `patch` | bugfix, refactor pod maską, zmiana typów wstecznie kompatybilna | naprawa stylów Tooltipa |
| `minor` | nowa funkcja, nowy komponent, nowy input wstecznie kompatybilny | dodanie `<p4-toast>` |
| `major` | **breaking change** — usunięcie/zmiana publicznego API, zmiana semantyki | usunięcie `defaultOpen` z `DropdownMenu` |

> Każda paczka ma osobny semver. Zmiana, która jest `major` dla Angulara, **nie musi** być `major` dla Reacta, jeśli nie dotyka jego API.

**Jeśli zmiana nie wymaga releasu** (czysty refactor wewnętrzny, dokumentacja, testy) — uruchom `pnpm changeset --empty` żeby utworzyć pusty changeset (zapis informacji że PR był świadomie nie-bumpujący).

---

## 4. Workflow release managera

Wykonywany lokalnie, z czystego `main` zawierającego zmergowane changesety.

### 4.1 Pre-flight

```bash
git checkout main
git pull
git status            # czysto
pnpm install          # lock w sync
ls .changeset/*.md    # są pliki do uwzględnienia (poza README.md / config.json)
```

### 4.2 Dry-run (zalecane przed pierwszą publikacją)

```bash
# 1) Symulacja bumpu wersji + zmian CHANGELOG.md (lokalnie, bez publikacji)
pnpm version-packages

# Sprawdź co się zmieniło:
git diff packages/*/package.json
cat packages/angular/CHANGELOG.md
cat packages/react/CHANGELOG.md

# 2) Symulacja publikacji bez wysyłania na npm
pnpm changeset publish --dry-run
```

Jeśli coś wygląda źle — `git restore .` i nie merge'uj.

### 4.3 Release

```bash
# 1) Bumpa wersje w package.json + wygeneruj CHANGELOG.md + skonsumuj pliki .changeset/*.md
pnpm version-packages

# 2) Zacommituj wynik (lub od razu otwórz "Release PR" — patrz sekcja 7)
git add .
git commit -m "chore(release): version packages"
git push

# 3) Po mergu do main:
git checkout main && git pull
pnpm release          # = nx run-many -t build && changeset publish
```

`pnpm release` zrobi:
1. **Build wszystkich paczek** (`nx run-many -t build`) — Nx odpali tylko paczki, których cache jest nieaktualny.
2. **Publikację** — `changeset publish` publikuje tylko paczki, których wersja w `package.json` jest świeższa niż na npm. Czyli paczki bez zmiany wersji są **pominięte automatycznie**.
3. Utworzenie i wypchnięcie **gitowych tagów** (`@p4/crm-mvp-components-angular@1.2.0` itd.).

Po publikacji:

```bash
git push --follow-tags
```

---

## 5. Scenariusze

### 5.1 Release tylko Angulara

PR z zmianą w `packages/angular`:

```bash
pnpm changeset
# wybierz tylko: @p4/crm-mvp-components-angular  → minor
# opis: "Add Toast component"
```

Po mergu i `pnpm version-packages`:
- `@p4/crm-mvp-components-angular` 1.4.0 → 1.5.0
- React/Vue/tokens/preset — **bez zmian** (nie pojawią się w `changeset publish`)

### 5.2 Release tylko Reacta

Analogicznie — wybierasz w `pnpm changeset` tylko `@p4/crm-mvp-components-react`. Pozostałe paczki nawet nie zostaną zbudowane do publikacji (changesets pominie je, bo wersja na npm jest aktualna).

### 5.3 Zmiana w `tokens` — co się dzieje

PR z zmianą koloru w `packages/tokens`:

```bash
pnpm changeset
# wybierz: @p4/crm-mvp-components-tokens → patch
```

Po `pnpm version-packages` (przez **linked + updateInternalDependencies**):
- `tokens` 0.3.4 → 0.3.5 **(patch)**
- `tailwind-preset` 0.3.4 → 0.3.5 **(patch, bo `linked`)** — wymuszony lockstep
- `@p4/crm-mvp-components-angular` 1.4.0 → 1.4.1 **(patch, bo `updateInternalDependencies: patch` i preset jest w jego deps)**
- `@p4/crm-mvp-components-react` 2.1.0 → 2.1.1 **(patch, j.w.)**
- `@p4/crm-mvp-components-vue` 1.8.0 → 1.8.1 **(patch, j.w.)**

Tak ma być: zmiana motywu propaguje się do wszystkich konsumentów jako patch, więc apki same dostaną nowy motyw po `pnpm update`.

### 5.4 Breaking change w jednej paczce

PR z usunięciem inputu z `<p4-tooltip>`:

```bash
pnpm changeset
# wybierz: @p4/crm-mvp-components-angular → major
# opis: "BREAKING: removed `legacyMode` input from Tooltip; use new `mode` prop"
```

Po `pnpm version-packages`:
- `@p4/crm-mvp-components-angular` 1.4.0 → 2.0.0
- React/Vue/tokens/preset — **bez zmian** (każda paczka ma własny semver, breaking w jednej nie pociąga drugiej)

### 5.5 Hotfix patch tylko na jedną paczkę

```bash
git checkout -b hotfix/angular-tooltip-crash
# zmiany...
pnpm changeset                 # @p4/crm-mvp-components-angular → patch
git push                       # PR → review → merge
# po mergu:
git checkout main && git pull
pnpm version-packages
git commit -am "chore(release): version packages"
pnpm release
git push --follow-tags
```

---

## 6. Pre-releasy (alpha / beta / next)

Gdy chcesz wypuścić wersję `@p4/crm-mvp-components-angular@2.0.0-alpha.0` przed
stabilnym `2.0.0`:

```bash
# 1) Wejdź w tryb pre-release
pnpm changeset pre enter alpha

# 2) Normalne dodawanie changesetów (jak zwykle)
pnpm changeset

# 3) Version + publish wewnątrz pre mode wygeneruje 2.0.0-alpha.0, alpha.1 itd.
pnpm version-packages
pnpm release

# 4) Gdy gotowy do stabilnego releasu:
pnpm changeset pre exit
pnpm version-packages          # ostatecznie wygeneruje 2.0.0
pnpm release
```

> Pre-release tworzy plik `.changeset/pre.json` — **nie usuwaj go ręcznie**.
> Eksit z pre mode robi to za Ciebie.

---

## 7. Wzorzec "Release PR" (opcjonalny)

Zamiast wykonywać `pnpm version-packages` lokalnie i pushować do `main`,
można otwierać osobny PR z bumpem wersji:

```bash
git checkout -b chore/release-2025-W42
pnpm version-packages
git add .
git commit -m "chore(release): version packages"
git push -u origin chore/release-2025-W42
gh pr create --title "chore(release): version packages" --body "Auto-bumped from accumulated changesets"
```

Po merge → checkout main → `pnpm release`. Zaleta: peer review przed bumpem,
łatwy rollback (revert PR).

---

## 8. Automatyzacja w CI (opcjonalnie, na przyszłość)

[`changesets/action`](https://github.com/changesets/action) potrafi
**automatycznie**:
- otwierać "Release PR" gdy w `main` pojawi się changeset,
- publikować na npm po zmergowaniu Release PR.

Szkielet workflow do dodania jako `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write
  id-token: write   # dla npm provenance

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install --frozen-lockfile

      - uses: changesets/action@v1
        with:
          publish: pnpm release        # = nx build + changeset publish
          version: pnpm version-packages
          commit: "chore(release): version packages"
          title: "chore(release): version packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> Wymaga sekretu `NPM_TOKEN` (granular access token z uprawnieniem do publikacji w scope `@p4`).
> Dopóki tego nie wdrożysz — release pozostaje manualny (sekcja 4).

---

## 9. Troubleshooting

| Problem | Diagnostyka | Fix |
| --- | --- | --- |
| `changeset publish` mówi "No unreleased packages to publish" | Brak różnicy między `package.json` w repo a wersją na npm | Najpierw `pnpm version-packages` (konsumuje pliki z `.changeset/`) |
| `changeset publish` pyta o login do npm | `NPM_TOKEN` nieustawiony / `npm whoami` zwraca błąd | `npm login --scope=@p4 --registry=https://registry.npmjs.org` lub wyeksportuj `NPM_TOKEN=…` |
| Paczka bumpnięta o jeden poziom za dużo | `updateInternalDependencies: patch` zadziałało zgodnie z konfiguracją | To **feature, nie bug**. Jeśli chcesz inny zakres dla konkretnej paczki — dodaj ręcznie changeset z silniejszym bumpem |
| `tokens` i `tailwind-preset` rozjechały się wersjami | `linked` powinno trzymać je razem | Sprawdź `.changeset/config.json` — sekcja `linked` musi zawierać obie nazwy |
| Build w `pnpm release` failuje na paczce, której nie zmieniam | `preVersionCommand` / `release` script puszcza build na wszystkich | Tymczasowo: `pnpm changeset publish` (pominięcie buildu). Docelowo: napraw broken build |
| Tag git już istnieje | Próba ponownego releasu tej samej wersji | `pnpm changeset publish --no-git-tag` lub bumpuj wersję dalej |
| `pnpm install` po `pnpm version-packages` zmienia `pnpm-lock.yaml` | Wersje workspace-zależnych paczek (`workspace:*`) się odświeżyły | Normalne — commituj lockfile razem z bumpem |

---

## 10. Komendy — ściąga

```bash
# Developer (na PR)
pnpm changeset                    # dodaj opis bumpu
pnpm changeset --empty            # PR bez bumpu (intencjonalnie)

# Release manager (na main)
pnpm version-packages             # zjedz .changeset/*.md, bumpa wersje, wygeneruj CHANGELOG
pnpm release                      # build + publish na npm
pnpm changeset publish --dry-run  # podgląd co poleci na npm

# Pre-release
pnpm changeset pre enter alpha    # wejdź w tryb alpha
pnpm changeset pre exit           # wyjdź z trybu pre
```

# Indonesia by the Numbers — National Statistics

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/sura19/indonesia-stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/sura19/indonesia-stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: population, economy, prices, work and poverty, with real figures from BPS (Statistics Indonesia) and the World Bank, charts drawn in the browser, and every number naming its source.

## What it covers

- **Overview** — six headline indicators, GDP growth and population charts, a year picker (2021–2025) and the latest releases.
- **Economy** — quarterly growth, GDP by sector, and an annual table. The growth chart switches between bars and a line.
- **People** — population from the 2020 census and the SUPAS 2025 survey, and the Java share of the population.
- **Provinces** — all 38 provinces compared: population (mid-2024) and poverty rate (March 2025), with a sortable, searchable table.
- **Prices** — inflation by year and by month, against Bank Indonesia's 2.5% ± 1 point target.
- **Work** — unemployment, youth unemployment, informal work and wages from Sakernas.
- **Poverty** — the poverty rate, the poverty line, urban vs rural, and the Gini ratio, with a sortable release table.
- **Sources** — every figure traced to its release, with a filter box.

## Run it

```sh
node serve.ts            # http://localhost:8080
node main.ts             # builds /output (or $MAKEFUN_OUTPUT_DIR)
```

The site is static files under `app/` with no network requests: no fonts, libraries or images loaded from anywhere else. Charts are plain canvas, drawn from `app/js/data.js`.

## Data

All figures are from official releases as of November 2026: BPS national accounts, SUPAS 2025, CPI, Sakernas August 2026 and the March 2026 poverty release, plus the World Bank's World Development Indicators. Province figures are BPS mid-2024 population projections and the March 2025 Susenas poverty release. See the Sources page in the site for the full list.

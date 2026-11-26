// Indonesia by the Numbers — data layer.
// Every figure below comes from an official release (BPS — Statistics
// Indonesia — or the World Bank) as reported in November 2026. Each series
// carries its source so the Sources view can cite it. Figures are stored
// once here; every view reads from this module and nothing else.

export const META = {
  country: "Indonesia",
  updated: "November 2026",
  currency: "IDR",
};

// Annual headline indicators, 2021-2025. Growth is real GDP growth (yoy, %).
// Inflation is the annual average CPI change (%). Population is mid-year
// (millions). GDP nominal is in Rp trillion, current prices.
export const ANNUAL = [
  { year: 2021, gdpGrowth: 3.70, inflation: 1.87, population: 272.25, gdpNominal: 16977, gdpPerCapitaRp: 62.2, poverty: 9.71, unemployment: 6.49 },
  { year: 2022, gdpGrowth: 5.31, inflation: 5.51, population: 275.77, gdpNominal: 19588, gdpPerCapitaRp: 71.0, poverty: 9.57, unemployment: 5.86 },
  { year: 2023, gdpGrowth: 5.05, inflation: 2.61, population: 278.69, gdpNominal: 20892, gdpPerCapitaRp: 75.0, poverty: 9.36, unemployment: 5.45 },
  { year: 2024, gdpGrowth: 5.03, inflation: 1.57, population: 281.60, gdpNominal: 22139, gdpPerCapitaRp: 78.6, poverty: 8.57, unemployment: 4.91 },
  { year: 2025, gdpGrowth: 5.11, inflation: 1.90, population: 284.67, gdpNominal: 23821, gdpPerCapitaRp: 83.7, poverty: 8.25, unemployment: 4.85 },
];

// Quarterly real GDP growth (yoy, %) through 2026.
export const QUARTERLY_GROWTH = [
  { label: "Q1 2025", value: 4.87 },
  { label: "Q2 2025", value: 5.12 },
  { label: "Q3 2025", value: 5.04 },
  { label: "Q4 2025", value: 5.39 },
  { label: "Q1 2026", value: 5.61 },
  { label: "Q2 2026", value: 5.29 },
  { label: "Q3 2026", value: 5.47 },
];

// GDP by sector, share of GDP (%), Q1 2026 — BPS.
export const SECTORS = [
  { name: "Manufacturing", share: 19.07 },
  { name: "Trade", share: 13.28 },
  { name: "Agriculture", share: 12.67 },
  { name: "Construction", share: 9.81 },
  { name: "Mining & quarrying", share: 8.69 },
  { name: "All other sectors", share: 36.48 },
];

// Consumer-price inflation, year on year (%), latest months — BPS.
export const INFLATION_MONTHLY = [
  { label: "Aug 2026", value: 3.19 },
  { label: "Sep 2026", value: 3.28 },
  { label: "Oct 2026", value: 3.23 },
];

// Labour market — Sakernas (National Labour Force Survey), BPS.
export const LABOUR = {
  latest: { period: "Aug 2026", unemployment: 4.75, unemployedMillions: 7.38, employedMillions: 147.99, labourForceMillions: 155.37, informalShare: 57.93, informalMillions: 85.73, avgWageRp: 3420000, youthUnemployment: 17.50 },
  series: [
    { period: "Aug 2025", unemployment: 4.85, unemployedMillions: 7.46, employedMillions: 146.54 },
    { period: "May 2026", unemployment: 4.65, unemployedMillions: 7.22, employedMillions: 148.19 },
    { period: "Aug 2026", unemployment: 4.75, unemployedMillions: 7.38, employedMillions: 147.99 },
  ],
  youth: [
    { period: "Aug 2025", value: 16.89 },
    { period: "Aug 2026", value: 17.50 },
  ],
};

// Poverty — BPS. Rates are % of population; counts are millions of people.
export const POVERTY = {
  latest: { period: "Mar 2026", rate: 8.07, peopleMillions: 22.93, lineRp: 669235, urban: 6.34, rural: 10.67, gini: 0.368 },
  series: [
    { period: "Mar 2025", rate: 8.47, peopleMillions: 23.85, lineRp: 609160 },
    { period: "Sep 2025", rate: 8.25, peopleMillions: 23.36, lineRp: 641443 },
    { period: "Mar 2026", rate: 8.07, peopleMillions: 22.93, lineRp: 669235 },
  ],
};

// Population — 2020 Population Census and SUPAS 2025 (Intercensal Survey), BPS.
export const PEOPLE = {
  census2020: 270.20,
  supas2025: 284.67,
  javaShare: 55.65,
  growthPerYear: 1.08,
  worldRank: 4,
  worldBank2025: 285.7,
  lifeExpectancy: 71.3,
  urbanShare: 59.4,
};

// Headline figures shown on the overview, with the period each refers to.
export const HEADLINES = [
  { key: "population", label: "Population", value: "284.7M", sub: "SUPAS 2025 · 4th largest in the world", format: "people" },
  { key: "gdp", label: "GDP, nominal", value: "Rp 23,821T", sub: "2025 · about $1.45 trillion", format: "money" },
  { key: "growth", label: "Economic growth", value: "5.47%", sub: "Q3 2026, year on year", format: "pct" },
  { key: "inflation", label: "Inflation", value: "3.23%", sub: "October 2026, year on year", format: "pct" },
  { key: "unemployment", label: "Unemployment", value: "4.75%", sub: "August 2026 · 7.38M people", format: "pct" },
  { key: "poverty", label: "Poverty rate", value: "8.07%", sub: "March 2026 · 22.93M people", format: "pct" },
];

// Every source cited on the site, in the order the Sources view shows them.
export const SOURCES = [
  { publisher: "BPS — Statistics Indonesia", title: "Pendapatan Nasional Indonesia 2021–2025", note: "GDP growth 5.11% in 2025; nominal GDP Rp 23,821 trillion; GDP per capita Rp 83.7 million." },
  { publisher: "BPS — Statistics Indonesia", title: "Economic growth, Q1–Q3 2026 releases", note: "Quarterly growth 5.61% (Q1), 5.29% (Q2) and 5.47% (Q3) 2026; sector shares for Q1 2026." },
  { publisher: "BPS — Statistics Indonesia", title: "SUPAS 2025 (Intercensal Population Survey)", note: "Population 284.67 million; 55.65% on Java; growth 1.08% a year. 2020 census: 270.20 million." },
  { publisher: "BPS — Statistics Indonesia", title: "Consumer Price Index, October 2026", note: "Inflation 3.23% year on year (September 3.28%, August 3.19%). Bank Indonesia target 2.5% ± 1 point." },
  { publisher: "BPS — Statistics Indonesia", title: "Keadaan Ketenagakerjaan Indonesia, August 2026", note: "Open unemployment 4.75%; 147.99 million employed; informal work 57.93%; average wage Rp 3.42 million a month; youth unemployment 17.50%." },
  { publisher: "BPS — Statistics Indonesia", title: "Poverty profile, March 2026", note: "Poverty 8.07% (22.93 million people); poverty line Rp 669,235 per person a month; urban 6.34%, rural 10.67%; Gini ratio 0.368." },
  { publisher: "World Bank", title: "World Development Indicators, November 2026", note: "Population 285.7 million (2025); GDP $1.45 trillion, 17th in the world; GDP per capita $5,060; inflation 1.9% in 2025." },
];

export function annualByYear(year) {
  return ANNUAL.find((r) => r.year === year) || ANNUAL[ANNUAL.length - 1];
}

export function formatRpTrillion(v) {
  return "Rp " + v.toLocaleString("en-US") + "T";
}

export function formatMillions(v) {
  return v.toFixed(2).replace(/\.00$/, "") + "M";
}

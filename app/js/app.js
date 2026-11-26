// Indonesia by the Numbers — views and routing.
// One hash route per section. Charts are drawn after each render so the
// canvas always matches the numbers on the page.
import { ANNUAL, QUARTERLY_GROWTH, SECTORS, INFLATION_MONTHLY, LABOUR, POVERTY, PEOPLE, HEADLINES, SOURCES, annualByYear, formatRpTrillion } from "./data.js";
import { drawBarChart, drawLineChart, drawDonut } from "./charts.js";

const root = document.getElementById("view");

const ROUTES = {
  "": { title: "Overview", render: renderOverview },
  economy: { title: "Economy", render: renderEconomy },
  people: { title: "People", render: renderPeople },
  prices: { title: "Prices", render: renderPrices },
  work: { title: "Work", render: renderWork },
  poverty: { title: "Poverty", render: renderPoverty },
  sources: { title: "Sources", render: renderSources },
};

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}

function statCard(h) {
  return `<article class="stat-card"><p class="stat-label">${h.label}</p><p class="stat-value">${h.value}</p><p class="stat-sub">${h.sub}</p></article>`;
}

function sectionHead(kicker, title, intro) {
  return `<header class="section-head"><p class="kicker">${kicker}</p><h1>${title}</h1><p class="lede">${intro}</p></header>`;
}

function sourceNote(text) {
  return `<p class="source-note">Source: ${text}</p>`;
}

// ---------- Overview ----------
function renderOverview() {
  root.appendChild(el(`
    ${sectionHead("Indonesia · November 2026", "Indonesia by the numbers", "The headline figures for the world's fourth most populous country — its people, its economy, its prices, its jobs and its poverty rate — each with the release it comes from.")}
    <div class="stat-grid">${HEADLINES.map(statCard).join("")}</div>
    <div class="panel-row">
      <section class="panel wide">
        <h2>Economic growth, 2021–2025</h2>
        <p class="panel-sub">Real GDP growth, % a year</p>
        <canvas id="chart-growth" aria-label="Bar chart of GDP growth 2021 to 2025"></canvas>
        ${sourceNote("BPS, Pendapatan Nasional Indonesia 2021–2025.")}
      </section>
      <section class="panel">
        <h2>Population</h2>
        <p class="panel-sub">Millions of people, mid-year</p>
        <canvas id="chart-pop" aria-label="Line chart of population 2021 to 2025"></canvas>
        ${sourceNote("BPS, SUPAS 2025.")}
      </section>
    </div>
    <section class="panel">
      <h2>A year at a glance <span class="year-pick">Year <select id="year-pick" aria-label="Choose a year">${ANNUAL.map((r) => `<option value="${r.year}"${r.year === 2025 ? " selected" : ""}>${r.year}</option>`).join("")}</select></span></h2>
      <div id="year-snapshot"></div>
      ${sourceNote("BPS national accounts, CPI, Sakernas and poverty releases; World Bank WDI for 2025 inflation.")}
    </section>
    <section class="panel">
      <h2>Latest releases</h2>
      <ul class="releases">
        <li><strong>5 Nov 2026</strong> — Economy grew 5.47% in Q3 2026; open unemployment 4.75% in August 2026. <span class="tag">BPS</span></li>
        <li><strong>Oct 2026</strong> — Inflation 3.23% year on year, inside Bank Indonesia's 2.5% ± 1 point target. <span class="tag">BPS</span></li>
        <li><strong>Mar 2026</strong> — Poverty 8.07%, or 22.93 million people; Gini ratio 0.368. <span class="tag">BPS</span></li>
        <li><strong>2025</strong> — Population 284.67 million in the SUPAS intercensal survey; 55.65% live on Java. <span class="tag">BPS</span></li>
      </ul>
    </section>`));
  drawBarChart(document.getElementById("chart-growth"), ANNUAL.map((r) => ({ label: String(r.year), value: r.gdpGrowth })), { unit: "%", highlightLast: true });
  drawLineChart(document.getElementById("chart-pop"), ANNUAL.map((r) => ({ label: String(r.year), value: r.population })), { unit: "M" });
  const pick = document.getElementById("year-pick");
  const showYear = () => {
    const r = annualByYear(Number(pick.value));
    document.getElementById("year-snapshot").innerHTML = `
      <dl class="fact-list">
        <div><dt>GDP growth</dt><dd>${r.gdpGrowth.toFixed(2)}%</dd></div>
        <div><dt>Inflation</dt><dd>${r.inflation.toFixed(2)}%</dd></div>
        <div><dt>Population</dt><dd>${r.population.toFixed(2)} million</dd></div>
        <div><dt>GDP, nominal</dt><dd>${formatRpTrillion(r.gdpNominal)}</dd></div>
        <div><dt>GDP per person</dt><dd>Rp ${r.gdpPerCapitaRp.toFixed(1)} million</dd></div>
        <div><dt>Poverty rate</dt><dd>${r.poverty.toFixed(2)}%</dd></div>
        <div><dt>Unemployment</dt><dd>${r.unemployment.toFixed(2)}%</dd></div>
      </dl>`;
  };
  pick.addEventListener("change", showYear);
  showYear();
}

// ---------- Economy ----------
let economyChartMode = "bar";
function renderEconomy() {
  root.appendChild(el(`
    ${sectionHead("Economy", "Growth that stayed above 5%", "Indonesia's economy grew 5.11% in 2025 and 5.47% in the third quarter of 2026. Household consumption carries most of it; manufacturing is the largest single sector.")}
    <div class="stat-grid">
      ${statCard({ label: "GDP, nominal 2025", value: "Rp 23,821T", sub: "About $1.45 trillion · 17th in the world" })}
      ${statCard({ label: "GDP per person 2025", value: "Rp 83.7M", sub: "About $5,060" })}
      ${statCard({ label: "Growth, Q3 2026", value: "5.47%", sub: "Year on year · Q2 was 5.29%" })}
      ${statCard({ label: "Largest sector", value: "19.07%", sub: "Manufacturing share of GDP, Q1 2026" })}
    </div>
    <div class="panel-row">
      <section class="panel wide">
        <h2>Quarterly growth <span class="year-pick"><button id="chart-toggle" type="button">Show as line</button></span></h2>
        <p class="panel-sub">Real GDP growth, % year on year</p>
        <canvas id="chart-quarterly" aria-label="Quarterly GDP growth chart"></canvas>
        ${sourceNote("BPS quarterly releases, Q1 2025 – Q3 2026.")}
      </section>
      <section class="panel">
        <h2>Where GDP comes from</h2>
        <p class="panel-sub">Share of GDP by sector, Q1 2026</p>
        <canvas id="chart-sectors" aria-label="Donut chart of GDP by sector"></canvas>
        ${sourceNote("BPS. The five named sectors sum to 63.52%; the rest is 36.48%.")}
      </section>
    </div>
    <section class="panel">
      <h2>Annual growth, 2021–2025</h2>
      <table class="data-table"><thead><tr><th>Year</th><th>Growth</th><th>GDP, nominal</th><th>GDP per person</th></tr></thead>
      <tbody>${ANNUAL.map((r) => `<tr><td>${r.year}</td><td>${r.gdpGrowth.toFixed(2)}%</td><td>${formatRpTrillion(r.gdpNominal)}</td><td>Rp ${r.gdpPerCapitaRp.toFixed(1)} million</td></tr>`).join("")}</tbody></table>
      ${sourceNote("BPS, Pendapatan Nasional Indonesia 2021–2025.")}
    </section>`));
  const drawQ = () => {
    const data = QUARTERLY_GROWTH.map((q) => ({ label: q.label, value: q.value }));
    if (economyChartMode === "bar") drawBarChart(document.getElementById("chart-quarterly"), data, { unit: "%", highlightLast: true });
    else drawLineChart(document.getElementById("chart-quarterly"), data, { unit: "%" });
  };
  drawQ();
  document.getElementById("chart-toggle").addEventListener("click", (e) => {
    economyChartMode = economyChartMode === "bar" ? "line" : "bar";
    e.currentTarget.textContent = economyChartMode === "bar" ? "Show as line" : "Show as bars";
    drawQ();
  });
  drawDonut(document.getElementById("chart-sectors"), SECTORS.map((s) => ({ label: s.name, value: s.share })));
}

// ---------- People ----------
function renderPeople() {
  root.appendChild(el(`
    ${sectionHead("People", "284.67 million people", "The 2025 intercensal survey counted 284.67 million Indonesians — the world's fourth largest population — and more than half of them live on Java.")}
    <div class="stat-grid">
      ${statCard({ label: "Population, SUPAS 2025", value: "284.67M", sub: "2020 census: 270.20 million" })}
      ${statCard({ label: "On Java", value: "55.65%", sub: "About 158 million people" })}
      ${statCard({ label: "Growth a year", value: "1.08%", sub: "Slower than 1.10% in 2020" })}
      ${statCard({ label: "Life expectancy", value: "71.3 yrs", sub: "World Bank, 2025" })}
    </div>
    <div class="panel-row">
      <section class="panel wide">
        <h2>Population, 2021–2025</h2>
        <p class="panel-sub">Millions of people, mid-year</p>
        <canvas id="chart-people" aria-label="Line chart of population 2021 to 2025"></canvas>
        ${sourceNote("BPS, SUPAS 2025.")}
      </section>
      <section class="panel">
        <h2>Where people live</h2>
        <p class="panel-sub">Share of population by island group</p>
        <canvas id="chart-java" aria-label="Donut chart of Java versus the rest of Indonesia"></canvas>
        ${sourceNote("BPS, SUPAS 2025.")}
      </section>
    </div>
    <section class="panel">
      <h2>Population by year</h2>
      <table class="data-table"><thead><tr><th>Year</th><th>Population</th><th>Change</th></tr></thead>
      <tbody>${ANNUAL.map((r, i) => `<tr><td>${r.year}</td><td>${r.population.toFixed(2)} million</td><td>${i === 0 ? "—" : "+" + (r.population - ANNUAL[i - 1].population).toFixed(2) + " million"}</td></tr>`).join("")}</tbody></table>
      ${sourceNote("BPS. 2020 census: 270.20 million.")}
    </section>`));
  drawLineChart(document.getElementById("chart-people"), ANNUAL.map((r) => ({ label: String(r.year), value: r.population })), { unit: "M" });
  drawDonut(document.getElementById("chart-java"), [
    { label: "Java", value: PEOPLE.javaShare },
    { label: "Rest of Indonesia", value: 100 - PEOPLE.javaShare },
  ], { centerTop: "55.65%", centerSub: "live on Java" });
}

// ---------- Prices ----------
function renderPrices() {
  root.appendChild(el(`
    ${sectionHead("Prices", "Inflation 3.23% in October", "Consumer prices rose 3.23% in the year to October 2026 — inside Bank Indonesia's 2.5% ± 1 point target, after 3.28% in September.")}
    <div class="stat-grid">
      ${statCard({ label: "Inflation, Oct 2026", value: "3.23%", sub: "Year on year · Sep 3.28%, Aug 3.19%" })}
      ${statCard({ label: "Bank Indonesia target", value: "2.5% ± 1", sub: "Percentage points" })}
      ${statCard({ label: "Inflation, 2024", value: "1.57%", sub: "Annual average, the low of the decade" })}
      ${statCard({ label: "Food inflation, Oct 2026", value: "5.61%", sub: "Year on year, the fastest group" })}
    </div>
    <div class="panel-row">
      <section class="panel wide">
        <h2>Inflation by year</h2>
        <p class="panel-sub">Annual average CPI change, %</p>
        <canvas id="chart-inflation" aria-label="Bar chart of inflation 2021 to 2025"></canvas>
        ${sourceNote("BPS for 2021–2024; World Bank for 2025.")}
      </section>
      <section class="panel">
        <h2>Latest months</h2>
        <p class="panel-sub">Inflation, % year on year</p>
        <canvas id="chart-inflation-months" aria-label="Line chart of inflation August to October 2026"></canvas>
        ${sourceNote("BPS, Consumer Price Index releases.")}
      </section>
    </div>
    <section class="panel">
      <h2>How to read it</h2>
      <p class="body-text">Inflation is the yearly change in the consumer price index — what households actually pay. The 2022 spike to 5.51% followed the fuel-price adjustment that September; by 2024 it had fallen back to 1.57%. In 2026 it is running just above 3%, with food prices rising faster than the average at 5.61% in October.</p>
    </section>`));
  drawBarChart(document.getElementById("chart-inflation"), ANNUAL.map((r) => ({ label: String(r.year), value: r.inflation })), { unit: "%", highlightLast: true });
  drawLineChart(document.getElementById("chart-inflation-months"), INFLATION_MONTHLY.map((m) => ({ label: m.label, value: m.value })), { unit: "%" });
}

// ---------- Work ----------
function renderWork() {
  const L = LABOUR.latest;
  root.appendChild(el(`
    ${sectionHead("Work", "4.75% unemployed — but most work is informal", "Open unemployment fell to 4.75% in August 2026, yet 57.93% of the 147.99 million people in work are informal workers, and youth unemployment is 17.50%.")}
    <div class="stat-grid">
      ${statCard({ label: "Unemployment, Aug 2026", value: "4.75%", sub: "7.38 million people" })}
      ${statCard({ label: "People in work", value: "147.99M", sub: "Labour force 155.37 million" })}
      ${statCard({ label: "Informal workers", value: "57.93%", sub: "85.73 million people" })}
      ${statCard({ label: "Average wage", value: "Rp 3.42M", sub: "A month, August 2026" })}
    </div>
    <div class="panel-row">
      <section class="panel wide">
        <h2>Unemployment, latest surveys</h2>
        <p class="panel-sub">Open unemployment rate, %</p>
        <canvas id="chart-unemp" aria-label="Bar chart of unemployment in recent surveys"></canvas>
        ${sourceNote("BPS, Sakernas.")}
      </section>
      <section class="panel">
        <h2>Youth unemployment</h2>
        <p class="panel-sub">Ages 15–24, %</p>
        <canvas id="chart-youth" aria-label="Bar chart of youth unemployment"></canvas>
        ${sourceNote("BPS, Sakernas August 2025 and August 2026.")}
      </section>
    </div>
    <section class="panel">
      <h2>Labour force surveys</h2>
      <table class="data-table"><thead><tr><th>Survey</th><th>Unemployment</th><th>Unemployed</th><th>Employed</th></tr></thead>
      <tbody>${LABOUR.series.map((s) => `<tr><td>${s.period}</td><td>${s.unemployment.toFixed(2)}%</td><td>${s.unemployedMillions.toFixed(2)} million</td><td>${s.employedMillions.toFixed(2)} million</td></tr>`).join("")}</tbody></table>
      ${sourceNote("BPS, Keadaan Ketenagakerjaan Indonesia.")}
    </section>`));
  drawBarChart(document.getElementById("chart-unemp"), LABOUR.series.map((s) => ({ label: s.period, value: s.unemployment })), { unit: "%" });
  drawBarChart(document.getElementById("chart-youth"), LABOUR.youth.map((y) => ({ label: y.period, value: y.value })), { unit: "%", color: "#c8102e" });
}

// ---------- Poverty ----------
let povertySortDesc = true;
function renderPoverty() {
  const P = POVERTY.latest;
  root.appendChild(el(`
    ${sectionHead("Poverty", "8.07% — the lowest on record", "Poverty fell to 8.07% in March 2026, or 22.93 million people, down from 8.47% a year earlier. Rural poverty, 10.67%, is still well above urban poverty at 6.34%.")}
    <div class="stat-grid">
      ${statCard({ label: "Poverty rate, Mar 2026", value: "8.07%", sub: "22.93 million people" })}
      ${statCard({ label: "Poverty line", value: "Rp 669,235", sub: "Per person a month" })}
      ${statCard({ label: "Urban vs rural", value: "6.34 / 10.67%", sub: "Poverty rate by area" })}
      ${statCard({ label: "Gini ratio", value: "0.368", sub: "March 2026 · 0 is perfectly equal" })}
    </div>
    <div class="panel-row">
      <section class="panel wide">
        <h2>Poverty rate, falling</h2>
        <p class="panel-sub">% of population below the poverty line</p>
        <canvas id="chart-poverty" aria-label="Line chart of the poverty rate"></canvas>
        ${sourceNote("BPS poverty releases.")}
      </section>
      <section class="panel">
        <h2>Urban vs rural</h2>
        <p class="panel-sub">Poverty rate by area, March 2026</p>
        <canvas id="chart-urban-rural" aria-label="Bar chart of urban and rural poverty"></canvas>
        ${sourceNote("BPS, March 2026.")}
      </section>
    </div>
    <section class="panel">
      <h2>Poverty releases <span class="year-pick"><button id="poverty-sort" type="button">Sort: newest first</button></span></h2>
      <table class="data-table"><thead><tr><th>Release</th><th>Rate</th><th>People</th><th>Poverty line</th></tr></thead>
      <tbody id="poverty-rows"></tbody></table>
      ${sourceNote("BPS. Click the button to flip the order.")}
    </section>`));
  drawLineChart(document.getElementById("chart-poverty"), POVERTY.series.map((s) => ({ label: s.period, value: s.rate })), { unit: "%" });
  drawBarChart(document.getElementById("chart-urban-rural"), [
    { label: "Urban", value: P.urban },
    { label: "Rural", value: P.rural },
  ], { unit: "%", color: "#0e7c6b" });
  const drawRows = () => {
    const rows = [...POVERTY.series];
    if (!povertySortDesc) rows.reverse();
    document.getElementById("poverty-rows").innerHTML = rows.map((s) => `<tr><td>${s.period}</td><td>${s.rate.toFixed(2)}%</td><td>${s.peopleMillions.toFixed(2)} million</td><td>Rp ${s.lineRp.toLocaleString("en-US")}</td></tr>`).join("");
  };
  drawRows();
  document.getElementById("poverty-sort").addEventListener("click", (e) => {
    povertySortDesc = !povertySortDesc;
    e.currentTarget.textContent = povertySortDesc ? "Sort: newest first" : "Sort: oldest first";
    drawRows();
  });
}

// ---------- Sources ----------
function renderSources() {
  root.appendChild(el(`
    ${sectionHead("Sources", "Where every number comes from", "All figures on this site are from official releases, quoted as published. Nothing here is estimated by this site, and no figure is invented.")}
    <section class="panel">
      <h2>Filter sources <span class="year-pick"><input id="source-filter" type="search" placeholder="Type to filter, e.g. BPS" aria-label="Filter sources"></span></h2>
      <ol id="source-list" class="source-list">
        ${SOURCES.map((s) => `<li><strong>${s.publisher} — ${s.title}.</strong> ${s.note}</li>`).join("")}
      </ol>
      <p id="source-count" class="source-note">${SOURCES.length} sources listed.</p>
    </section>
    <section class="panel">
      <h2>How this site is made</h2>
      <p class="body-text">This is a static site: every page, chart and table is a file in this repository, and it works with no network connection. Charts are drawn in the browser from the data file, so the numbers you see in a chart are the same numbers in the tables. Figures are shown with the period they refer to, because a statistic without a date is not a statistic.</p>
      <p class="body-text">Where two official sources disagree — for example the 2025 inflation figure — the site uses the World Bank figure and says so. Population uses the BPS intercensal survey (SUPAS 2025) as the headline and the World Bank estimate as a cross-check.</p>
    </section>`));
  const input = document.getElementById("source-filter");
  const list = document.getElementById("source-list");
  const count = document.getElementById("source-count");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    list.querySelectorAll("li").forEach((li) => {
      const hit = !q || li.textContent.toLowerCase().includes(q);
      li.style.display = hit ? "" : "none";
      if (hit) shown += 1;
    });
    count.textContent = shown + " of " + SOURCES.length + " sources shown.";
  });
}

// ---------- Router ----------
function route() {
  const key = (location.hash || "#/").replace(/^#\/?/, "").split("/")[0];
  const r = ROUTES[key] || ROUTES[""];
  root.innerHTML = "";
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + key);
  });
  document.getElementById("page-title").textContent = r.title + " — Indonesia by the Numbers";
  r.render();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();

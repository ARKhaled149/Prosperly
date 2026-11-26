# Prosperly — Cockpit MVP Dashboard

A case study test built using React, CSS and Bootstrap.

Prosperly's case study "IT Outline: MVP Cockpit" (11.11.2024) describes a customer cockpit as the front end of its MVP: property investors see their portfolio, while Prosperly maintains the data in the back end, most probably in Excel or Google Sheets. This repository holds the case study and a working React dashboard built for it. The dashboard reads its figures live from a published Google Sheet, so the numbers can be changed in the sheet without touching the code.

## Dashboard Demo video Link

https://drive.google.com/file/d/1CGm3A77W4psiSdFZLypySbgI49lcr0jK/view?usp=sharing

The same recording is in the repository: [`Website/Dashboard Demo.mp4`](Website/Dashboard%20Demo.mp4).

## Features

- **Portfolio Overview — Cashflow**: KPI cards for total value, monthly income, monthly expenses, number of properties and occupancy rate, plus an income and expenses area chart by month.
- **Loan Overview**: one card per property with monthly payment, interest rate (with a progress bar), remaining amount and years remaining.
- **Property Value**: current value, value change in percent (green when positive, red when negative) and a value-over-time line chart.
- **Break-Even Analysis**: break-even year and a costs versus revenue area chart by year.
- **Google Sheets as the back end**: seven sheet tabs are fetched as CSV in parallel and parsed with PapaParse; failed fetches fall back to empty data instead of crashing the page.
- Loading, error and empty-data states.

The case study also describes a log-in area, a document centre and Stripe payments. This build covers the dashboard view; the navigation bar items (Properties, Reports & Documents, Contact, Logout) are placeholders.

## Tech stack

| Area | Used in this project |
|---|---|
| Framework | React 18, Create React App (`react-scripts` 5) |
| UI | React-Bootstrap 2, Bootstrap 5, custom CSS per component, Font Awesome icons |
| Charts | Recharts |
| Data | PapaParse reading a published Google Sheet (CSV) |
| Routing | React Router DOM 6 |

## Repository structure

```
.
├── CaseStudy_prosperly_Cockpit MVP_Eng.pdf    case study brief (English)
├── Bildschirmfoto 2024-11-18 um 21.48.08.pdf  screenshot
├── Bildschirmfoto 2024-11-18 um 21.48.27.pdf  screenshot
└── Website/                                   React dashboard
    ├── Dashboard Demo.mp4                     demo recording
    ├── package.json
    ├── public/
    └── src/
        ├── App.js                             page layout and data loading
        ├── data.js                            Google Sheets fetch and CSV parsing
        ├── components/                        PortfolioOverview, LoanOverview, PropertyValue, BreakEvenAnalysis (JS + CSS)
        └── Images/prosperlyLogo.png
```

## Run locally

Requires Node.js with npm and an internet connection (the data comes from Google Sheets).

```
cd Website
npm install
npm start
```

The app opens at http://localhost:3000. `npm run build` creates a production build in `Website/build/`.

To point the dashboard at another sheet, change `GOOGLE_SHEETS_BASE_URL` and the tab `gid` values in `Website/src/data.js`.

## Documents

- [Case study: IT Outline, MVP Cockpit](CaseStudy_prosperly_Cockpit%20MVP_Eng.pdf)
- [Screenshot 1 (PDF)](Bildschirmfoto%202024-11-18%20um%2021.48.08.pdf)
- [Screenshot 2 (PDF)](Bildschirmfoto%202024-11-18%20um%2021.48.27.pdf)

## Author

Abdelrahman Abdelrahman — https://abdelrahman.eu

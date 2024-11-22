// src/data.js
import Papa from 'papaparse';

const GOOGLE_SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSG4my8I-r4QQvKuKqm_AQx7rGgmJ0YoCj2oqeIFwXOvLlHCi_BnyVV_0RtGNnfH7qpGBct2uC-pbNl/pub?output=csv';

const fetchDataFromSheet = async (sheetName, gid) => {
  const url = `${GOOGLE_SHEETS_BASE_URL}&gid=${gid}`; // Construct URL with gid
  try {
    const response = await fetch(url);
    const text = await response.text();
    const { data } = Papa.parse(text, { header: true, dynamicTyping: true });

    // More robust empty row and single-row data handling
    const cleanedData = data.filter(row => Object.keys(row).length > 0 && Object.values(row).some(value => value !== null && value !== undefined && value !== ""));
    
    // console.log(`Raw data from ${sheetName}:`, data); // Log raw data from Papa.parse
    // console.log(`Cleaned data from ${sheetName}:`, cleanedData); // Log after filtering

    return cleanedData.length === 1 && typeof cleanedData[0] === 'object' && !Array.isArray(cleanedData[0]) ? cleanedData[0] : cleanedData;
  } catch (error) {
    console.error(`Error fetching data from ${sheetName}:`, error);
    // Return appropriate empty data structure based on sheet
    return (sheetName === "portfolioOverview" || sheetName === "propertyValue" || sheetName === "breakEvenAnalysis") ? {} : [];
  }
};


export const fetchData = async () => {
  const data = {};
  try {
    // Use Promise.all correctly to fetch data concurrently
    const results = await Promise.all([
      fetchDataFromSheet('portfolioOverview', '0'),
      fetchDataFromSheet('cashflowData', '48090446'),
      fetchDataFromSheet('loanOverview', '1520397900'),
      fetchDataFromSheet('propertyValue', '1596123295'),
      fetchDataFromSheet('propertyValueData', '1975353447'),
      fetchDataFromSheet('breakEvenAnalysis', '1936262477'),
      fetchDataFromSheet('breakEvenData', '786110728'),
    ]);

    // Assign results to the data object
    data.portfolioOverview = results[0];
    data.cashflowData = results[1];
    data.loanOverview = results[2];
    data.propertyValue = results[3];
    data.propertyValueData = results[4];
    data.breakEvenAnalysis = results[5];
    data.breakEvenData = results[6];

    // console.log("breakEvenData:", data.breakEvenData);
    // console.log("DataJs: ",data);


    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { // Return default empty data on error
      portfolioOverview: {},
      cashflowData: [],
      loanOverview: [],
      propertyValue: {},
      propertyValueData: [],
      breakEvenAnalysis: {},
      breakEvenData: [],
    };
  }
};


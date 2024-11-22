// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button, Card, Image } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { fetchData } from './data';
import PortfolioOverview from './components/PortfolioOverview';
import LoanOverview from './components/LoanOverview';
import PropertyValue from './components/PropertyValue';
import BreakEvenAnalysis from './components/BreakEvenAnalysis';
import './styles.css';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        console.log("APP Fetched Data:", fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // VERY IMPORTANT: Check if data is null before accessing properties
  if (!data) {
    return <div>No data available.</div>;
  }
  // console.log("APP: portfolioOverview: ", data.portfolioOverview);
  return (
    <Router>      
      
      <nav className="navbar">  
            <div className="navbar-logo">Prosperly</div>
            <ul className="navbar-list">
                <li className="navbar-item">Dashboard</li>
                <li className="navbar-item">Properties</li>
                <li className="navbar-item">Reports & Documents</li>
                <li className="navbar-item">Contact</li>
                <li className="navbar-item">Logout</li>
            </ul>
        </nav>

        <div>
          <Container fluid className="p-4">
          <Row className="mb-4">
              <Col xs={12} className="d-flex justify-content-between align-items-center">
                <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
                <div>
                  <Button variant="dark" className="me-2">Portfolio Overview</Button>
                  <Button variant="light" style={{border: '1px solid black'}}>Single Property</Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <PortfolioOverview data={data.portfolioOverview} cashflowData={data.cashflowData} />
              </Col>
            </Row>

          <Container fluid>
              <Row>
                <Col md={6}> {/* Loan Overview takes up half the row */}
                  <LoanOverview data={data.loanOverview} />
                </Col>
                <Col md={6}> {/* Property Value takes up the other half */}
                  <PropertyValue data={data.propertyValue} propertyValueData={data.propertyValueData} />
                  <BreakEvenAnalysis data={data.breakEvenAnalysis} breakEvenData={data.breakEvenData} />
                </Col>
              </Row>
            </Container>
          </Container>
      </div>


    </Router>
  );
}

export default App;
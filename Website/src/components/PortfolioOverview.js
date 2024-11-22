import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PortfolioOverview.css';

const PortfolioOverview = ({ data, cashflowData }) => {
  const formatNumber = (num) => {
    if (!num) return 0; 
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    return num.toLocaleString();
  };

  if (!data || !cashflowData) {
    return <div>Loading portfolio overview...</div>;
  }

  const totalValue = data?.totalValue;
  const monthlyIncome = data?.monthlyIncome;
  const monthlyExpenses = data?.monthlyExpenses;
  const properties = data?.properties;
  const occupancyRate = data?.occupancyRate;

  const cardData = [
    { label: "Total Value", value: data.totalValue, format: '€' },
    { label: "Monthly Income", value: data.monthlyIncome, format: '€' },
    { label: "Monthly Expenses", value: data.monthlyExpenses, format: '€' },
    { label: "Properties", value: data.properties, format: '' }, // No format for properties
    { label: "Occupancy Rate", value: data.occupancyRate, format: '%' },
  ];
  return (
    <Card className="mb-4 p-4 portfolio-overview-card">
          <Card.Body>
              <Card.Title className="mb-4 portfolio-overview-title">Portfolio Overview - Cashflow</Card.Title>

              <div className="d-flex flex-column mb-4">
                  <div className="mini-cards-container"> {/* Added a class for styling */}
                      {cardData.map((item, index) => (
                          <div key={index} className="mini-card">  {/* Added a class for styling */}
                              <Card className="h-100">
                                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                      <Card.Text className="text-muted small mini-card-label">{item.label}</Card.Text>
                                      <Card.Title className="mb-0 font-weight-bold h5 mt-2 mini-card-value">
                                          {formatNumber(item.value)}{item.format}  {/* Format placed AFTER the value */}
                                      </Card.Title>
                                  </Card.Body>
                              </Card>
                          </div>
                        ))}
                    </div>
                <div className="chart-container" style={{ width: '40%', height: 200, marginLeft: '20px', marginRight: '20px', marginBottom: '20px', marginTop: '20px' }}>
                    <ResponsiveContainer>
                        <AreaChart data={cashflowData} margin={{ top: 10, right: 30, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="income" stackId="1" stroke="#f08080" fill="#f08080" fillOpacity={0.5} />
                            <Area type="monotone" dataKey="expenses" stackId="1" stroke="#98D89E" fill="#98D89E" fillOpacity={0.5} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card.Body>
    </Card>
);


};

export default PortfolioOverview;

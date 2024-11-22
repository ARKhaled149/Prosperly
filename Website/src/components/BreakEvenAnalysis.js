import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './BreakEvenAnalysis.css';

const BreakEvenAnalysis = ({ data, breakEvenData }) => {
    const formatNumber = (num) => {
        if (num === null || num === undefined) return 0;
        return num.toLocaleString();
    };

    if (!data || !breakEvenData || breakEvenData.length === 0) {
        return <div>Loading break-even analysis...</div>;
    }

    return (
        <Card className="break-even-analysis-card">
            <Card.Body>
                <Card.Title className="mb-4">Break-Even Analysis</Card.Title>
                <Row className="mini-cards-container">
                    <Col xs={12}>
                        <Card className="mini-card">
                            <Card.Body>
                                <div className="label">Break-Even Year</div>
                                <div className="value">{data?.breakEvenYear}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={breakEvenData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="costs" stroke="#8884d8" fillOpacity={0.3} fill="url(#colorCosts)" />
                                <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fillOpacity={0.3} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default BreakEvenAnalysis;

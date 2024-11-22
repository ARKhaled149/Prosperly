import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PropertyValue.css';

const PropertyValue = ({ data, propertyValueData }) => {
    const formatNumber = (num) => {
        if (num === null || num === undefined) return 0;
        return num.toLocaleString();
    };

    if (!data || !propertyValueData || propertyValueData.length === 0) {
        return <div>Loading property value...</div>;
    }

    return (
      <div>
        <Card className="property-value-card">
            <Card.Body>
                <Card.Title className="mb-4">Property Value</Card.Title>
                <Row className="mini-cards-container">
                    <Col xs={6} md={4}>
                        <Card className="mini-card">
                            <Card.Body>
                                <div className="label">Current Value</div>
                                <div className="value">€{formatNumber(data?.currentValue)}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={4}>
                        <Card className="mini-card">
                            <Card.Body>
                                <div className="label">Value Change</div>
                                <div className="value" style={{ color: data?.valueChange > 0 ? 'green' : 'red' }}>
                                    {data?.valueChange > 0 && '+'}
                                    {data?.valueChange}%
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={propertyValueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
      </div>
    );
};

export default PropertyValue;

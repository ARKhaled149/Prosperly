import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import './LoanOverview.css';

const LoanOverview = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>Loading loan overview...</div>;
    }

    const formatNumber = (num) => {
        return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Consistent formatting
    };

    return (
        <div>
        <Card className="loan-overview-card">
            <Card.Body>
                <Card.Title className="loan-overview-title">Loan Overview</Card.Title>
                {data.map((loan) => (
                    <Card key={loan.property} className="property-card mb-3">
                        <Card.Body>
                            <Row className="property-duration-row align-items-center mb-2">
                                <Col xs={12} md={6}>
                                    <span className="property-name">{loan.property}</span>
                                </Col>
                                {/* <Col xs={12} md={6}></Col> Empty column for spacing */}
                                <Col xs={12} md={6} className="text-end">
                                    <span className="duration">
                                        <FontAwesomeIcon icon={faClock} className="clock-icon me-1" />
                                        {loan.duration} years remaining
                                    </span>
                                </Col>
                            </Row>

                            <Row className="interest-rate-container mb-2">
                                <Col>
                                    <ProgressBar
                                        now={loan.interestRate}
                                        min={0}
                                        max={5}
                                        style={{ borderRadius: '0px', height: '10px' }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={3} md={3}>
                                    <Card className="mini-card">
                                        <Card.Body>
                                            <div className="label">Monthly Payment</div>
                                            <div className="value">€{formatNumber(loan.monthlyPayment)}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={3} md={3}>
                                    <Card className="mini-card">
                                        <Card.Body>
                                            <div className="label">Interest Rate</div>
                                            <div className="value">{loan.interestRate.toFixed(2)}%</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={3} md={3}>
                                    <Card className="mini-card">
                                        <Card.Body>
                                            <div className="label">Remaining</div>
                                            <div className="value">€{formatNumber(loan.remaining)}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={3} md={3}>
                                    <Card className="mini-card">
                                        <Card.Body>
                                            <div className="label">Duration</div>
                                            <div className="value">{loan.duration} years</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Card.Body>
        </Card>
        </div>
    );
};

export default LoanOverview;


import React, { useState } from 'react';
import Carous from './Carous';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    const [isHover1, setIsHover1] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);

    const handleMouseEnter1 = () => {
        setIsHover1(true);
    };

    const handleMouseLeave1 = () => {
        setIsHover1(false);
    };

    const handleMouseEnter2 = () => {
        setIsHover2(true);
    };

    const handleMouseLeave2 = () => {
        setIsHover2(false);
    };

    const handleMouseEnter3 = () => {
        setIsHover3(true);
    };

    const handleMouseLeave3 = () => {
        setIsHover3(false);
    };

    const boxStyle1 = {
        padding: '4px',
        borderRadius: '12px',
        marginLeft: '3px',
        backgroundColor: isHover1 ? '#ffc107' : 'white',
        color: isHover1 ? 'white' : '#ffc107',
        height: '250px',
        border: '2px solid #ffc107'
    };

    const boxStyle2 = {
        padding: '4px',
        borderRadius: '12px',
        marginLeft: '3px',
        backgroundColor: isHover2 ? '#ffc107' : 'white',
        color: isHover2 ? 'white' : '#ffc107',
        height: '250px',
        border: '2px solid #ffc107'
    };

    const boxStyle3 = {
        padding: '4px',
        borderRadius: '12px',
        marginLeft: '3px',
        backgroundColor: isHover3 ? '#ffc107' : 'white',
        color: isHover3 ? 'white' : '#ffc107',
        height: '250px',
        border: '2px solid #ffc107'
    };

    return (
        <div>
            <div style={{ width: '90%', margin: 'auto' }}>
                <Carous />
            </div>

            <div className="my-5" style={{ fontSize: '1.5em' }}>
                <Row>
                    <Col md="4" sm="4" xs="12">
                        <Link to="/savingAccount" style={{ textDecoration: 'none' }}>
                            <div
                                style={boxStyle1}
                                onMouseEnter={handleMouseEnter1}
                                onMouseLeave={handleMouseLeave1}
                            >
                                <p className="text-center font-weight-bolder">SAVINGS ACCOUNT</p>
                                <p>Put some money aside. Our Savings account is a safe, easy way for you to save</p>
                                <p className="text-center">
                                    <u>Read more</u>
                                </p>
                            </div>
                        </Link>
                    </Col>
                    <Col md="4" sm="4" xs="12">
                        <Link to="/cashLoan" style={{ textDecoration: 'none' }}>
                            <div
                                style={boxStyle2}
                                onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2}
                            >
                                <p className="text-center font-weight-bolder">CASH LOAN</p>
                                <p>In no time take cash with repayment period of up to 83 months</p>
                                <p className="text-center">
                                    <u>Read more</u>
                                </p>
                            </div>
                        </Link>
                    </Col>
                    <Col md="4" sm="4" xs="12">
                        <Link to="/standingOrder" style={{ textDecoration: 'none' }}>
                            <div
                                style={boxStyle3}
                                onMouseEnter={handleMouseEnter3}
                                onMouseLeave={handleMouseLeave3}
                            >
                                <p className="text-center font-weight-bolder">STANDING ORDER</p>
                                <p>This is a simple way to make automatic payments from your bank account</p>
                                <p className="text-center">
                                    <u>Read more</u>
                                </p>
                            </div>
                        </Link>
                    </Col>
                    <Col md="4" sm="4" xs="12"></Col>
                </Row>
            </div>

            <div
                className="border border-warning text-warning"
                style={{ width: '75%', padding: '3em', margin: 'auto', fontSize: '1.7em' }}
            >
                <div className="text-center display-4 font-weight-bold" style={{ margin: '0 0 30px 0' }}>
                    <p>Become our client now!</p>
                    <p>018/233-666</p>
                </div>
                <p className="font-italic text-center">- Make an appointment -</p>
                <p>
                    Login and make an appointment. First you have to make your free registration. If you want
                    any assistance, please call us
                </p>
            </div>
        </div>
    );
}

import React from 'react'
import { Jumbotron, Row, Col } from 'reactstrap'
export default function Footer() {
    return (
        <div className="mt-5">

            <div className="border-top border-warning bg-warning" style={{ paddingBottom: "0", marginBottom: "0", paddingTop: "1em" }} >
                <Row>
                    <Col md="4 " sm="4" xs="12">
                        <div className="d-flex mb-3">
                            {/* <img src="logo.png" width="100" height="100" /> */}
                            <p className="text-white  border-bottom border-white " style={{ fontFamily: "Arial , sans-serif", fontSize: "2em" }}>tf-Banking</p>
                            <hr className="text-white" style={{ borderTop: "3px solid yellow" }}></hr>
                        </div>
                        <p className="text-white p-3 font-italic" style={{ fontSize: "1.2em" }}>
                            We and our professional team are looking forward to seeing you, at your disposal for top service and expert
                            advice from all areas of online banking
                        </p>


                    </Col>
                    <Col md="4 " sm="4" xs="12">
                        <p className="text-white" style={{ fontSize: "1.5em", fontWeight: "100" }}>
                            Address
                        </p>
                        <div>
                            <Row>
                                <Col sm="1" md="1">
                                    <i className="fa fa-home text-white" style={{ fontSize: "1.5em" }} />
                                </Col>
                                <Col sm="11" md="11">
                                    <p className="text-white">
                                        <a className="border-white text-white" color="white" outline href="https://www.google.com/maps?q=1600 Nikole Pašića 63, Niš">Nikole Pašića 63 18105 Niš</a>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col sm="1" md="1">
                                    <i className="fa fa-phone text-white" style={{ fontSize: "1.5em" }} />
                                </Col>
                                <Col sm="11" md="11">
                                    <p className="text-white">
                                        018 233 666  /  063 233 666
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col sm="1" md="1">
                                    <i className="fa fa-envelope text-white" style={{ fontSize: "1.5em" }} />
                                </Col>
                                <Col sm="11" md="11">
                                    <p className="text-white">
                                        <a className="border-white text-white" color="white" outline href="mailto:info@tfbanking.rs">info@tfbanking.rs</a>
                                    </p>
                                    <p className="text-white">
                                        <a className="border-white text-white" color="white" outline href="mailto:tfbanking@gmail.com">tfbanking@gmail.com</a>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md="4 " sm="4" xs="12">
                        <p className="text-white" style={{ fontSize: "1.5em", fontWeight: "100" }}>
                            Visiting hours
                        </p>
                        <p className="text-white" >
                            Monday-Friday: 08-17
                        </p>
                    </Col>
                </Row>
                {/* <p className="text-center text-white font-weight-bold text-uppercase mt-3">Follow us</p>
        <p className="text-center pb-2" style={{ fontSize:"1.5em" }}> <i class="fa fa-facebook-f text-white mr-3"></i> <i class="fa fa-twitter text-white mr-3"></i> <i class="fa fa-instagram text-white mr-3"></i> <i class="fa fa-youtube text-white mr-3"></i> </p> */}
            </div>
        </div>
    )
}
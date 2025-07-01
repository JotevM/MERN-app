import React from 'react'
import { Row, Col } from 'reactstrap'
export default function About() {
    return (
        <div>

            <Row>
                <Col md="6" sm="6" xa="12">

                    <img className="pl-3 img-fluid" src="about.jpg" />
                </Col>

                <Col md="3" sm="3" xs="12">
                    <div className=" p-3 text-justify">


                        <h1 className="display-4 text-center mb-5 font-italic" style={{ fontWeight: "100" }}>tf-Banking</h1>
                        <p style={{ fontSize: "1.2em" }}>
                            We live in an increasingly complex world. Companies these days are
                            either born global or are going global at record speed. Business and
                            geopolitics are forging an entirely new dynamic and consumers now
                            expect financial services to be a seamless part of their digital lives.
                            tf-Banking is a bank that’s uniquely positioned for this moment. Through our
                            vast global network and our on-the-ground expertise, we can connect
                            the dots, anticipate change and empathize the needs of our clients
                            and customers in ways that other banks simply cannot.
                        </p>
                    </div>

                </Col>
                <Col md="3" sm="3" xs="12">
                    <div className=" p-3 text-justify">

                        <h3 className="display-5 text-center mb-4 font-italic" style={{ fontWeight: "100" }}>Our Mission</h3>
                        <p className="my-4 p-3 text-justify" style={{ fontSize: "1.2em" }}>
                            tf-Banking's mission is to serve as a trusted partner to our clients by
                            responsibly providing financial services that enable growth and economic
                            progress. We have set expectations for how we must act to bring our
                            mission to life. These expectations are at the heart of our Leadership
                            Principles – we take ownership, we deliver with pride and we succeed together.
                        </p>
                    </div>
                </Col>

            </Row>

            <div className="mt-5">
                <Row>
                    <Col md="7" sm="7" xs="12">
                        <h2 className="font-weight-bold text-center my-5">
                            Your trust and your time are valuable.
                        </h2>
                        <p className="about">
                            We strive to earn and maintain the public’s trust by constantly
                            adhering to the highest ethical standards. We ask our colleagues
                            to ensure that their decisions pass three tests: they are in our
                            clients’ interests, create economic value and are always systemically
                            responsible. When we do these things well, we make a positive financial
                            and social impact in the communities we serve and show what a global bank can do.
                        </p>
                        <p className="about">
                            We protect people’s savings and help them make the purchases — from everyday
                            transactions to buying a home — that improve the quality of their lives. We
                            advise people on how to invest for future needs, such as their children’s
                            education and their own retirement, and help them buy securities such as stocks and bonds.
                        </p>
                        <p className="about font-weight-bold">
                            Everyone deserves a trouble free Banking!
                        </p>
                    </Col>

                    <Col md="5" sm="5" xs="12">
                        <div className="bg-warning text-white mt-5 py-4" style={{ borderRadius: "35px" }}>
                            <p className="my-5 font-weight-bold text-center" style={{ fontSize: "1.7em" }} >
                                During your first visit to our bank, our team will:
                            </p>
                            <ul className="about">
                                <li> Explain all types of accounts we have </li>
                                <li> Discuss your needs and expectations </li>
                                <li> Answer any questions you may have </li>
                                <li> Give you our opinion on best banking plan just for you! </li>

                            </ul>

                        </div>
                    </Col>
                </Row>
            </div>



            <div
                className="text-center  font-weight-light"
                style={{ width: "70%", fontSize: "2em", marginTop: "150px", marginLeft: "auto", marginRight: "auto" }}
            >
                “We are confident we have put tf-Banking on the right path to improve returns
                over the long term and deliver the full benefits of our firm to all our
                stakeholders.”
            </div>
            <p className="text-center font-weight-bolder"> Paco Ybarra - Chief Executive Officer</p>
        </div>
    )
}

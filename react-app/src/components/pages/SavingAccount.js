import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap'
export default function SavingAccount() {
    return (
        <div>
            <h1 className="m-5 ">SAVING ACCOUNT</h1>
            <Row>
                <Col md="5" sm="5" xs="12">
                    <img src="saving.jpg" className="p-3 img-fluid" />
                </Col>
                <Col md="7" sm="7" xs="12">
                    <div className="p-3" style={{ fontSize: "1.2em" }}>
                        <p>
                            Savings and other deposit accounts are important sources
                            of funds that financial institutions use for loans. For that reason,
                            you can find savings accounts at virtually every bank or credit union,
                            whether they are traditional brick-and-mortar institutions or operate
                            exclusively online. In addition, you can find savings accounts
                            at some investment and brokerage firms.
                        </p>
                        <p>
                            Savings account interest rates vary. With the exception of promotions
                            promising a fixed rate until a certain date, banks and credit unions
                            might change their rates at any time. Typically, the more competitive
                            the rate, the more likely it is to fluctuate.
                        </p>
                        <p>
                            Changes in the federal funds rate can trigger institutions to adjust
                            their deposit rates. Some institutions offer high-yield savings
                            accounts with significantly higher interest rates for larger minimum
                            deposits, which may be worth investigating.
                        </p>
                        <p>
                            Some conventional savings accounts require a minimum balance to avoid
                            monthly fees or earn the highest published rate, while others have no
                            balance requirement. Know the rules of your particular account to ensure
                            you avoid diluting your earnings with fees.
                        </p>
                        <p>
                            Money can be transferred in or out of your savings account online,
                            at a branch or ATM, by electronic transfer, or direct deposit.
                            Transfers can usually be arranged by phone, as well.
                        </p>
                    </div>

                </Col>
            </Row>
        </div>
    )
}
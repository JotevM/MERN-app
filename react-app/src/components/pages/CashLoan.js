import React from 'react'
import { Row, Col } from "reactstrap"
export default function CashLoan() {
    return (
        <div>
            <h1 className="m-5">CASH LOAN</h1>
            <Row>
                <Col md="5" sm="5" xs="12">
                    <img src="cashloan.jpg" className="p-3 img-fluid" />
                    <img src="loan2.png" className="p-3 img-fluid" />
                </Col>
                
                <Col md="7" sm="7" xs="12">
                    <div className="p-3" style={{ fontSize:"1.2em"}}>

                    <p>
                    A cash basis loan is one in which interest is recorded
                    as earned when payment is collected. Ordinarily, interest
                    income is accrued on loans, as regular payment of both
                    principal and interest is assumed. However, in the case of
                    nonperforming loans (or loans gone bad), continuing payments 
                    are doubtful. Cash basis loans are nonperforming loans, and 
                    interest income can only be recorded when funds are actually received.            
                    </p>
                    <p>   
                    Although one of our main objectives is to preserve
                    natural teeth as long as possible, sometimes they have
                     to be extracted because thy are too damaged by periodontal
                      disease, infection or decay very deep. Unlike the case of
                    wisdom teeth that erupt normally between 17 and 21 years,
                     which very often are extracted to safeguard the proper position
                    and health of the other teeth, or due to repeated infections     
                    </p>
                    <p>
                    Typically, loans are considered to have gone bad when they are
                    in default for 90 days, meaning that the borrower hasn’t made 
                    any scheduled principal or interest repayments for at least that period. 
                    Different definitions may apply to consumer loans, residential 
                    mortgage loans, and other secured assets. 
                    </p>
                    <h2>How a Cash Basis Loan Works</h2>
                    <p>
                    Loans often go into default because the borrower has fallen on hard 
                    times or run out of money and can’t continue to make payments. 
                    Banks usually consider cash basis loans bad debt because it’s unlikely 
                    that they’ll be able to collect on them. For this reason, nonperforming 
                    loans can present a big problem for a bank. When a bank has many cash 
                    basis loans on its records, its stock price can suffer. 
                    Nonperforming loans can cause a bank to lose money, and they can 
                    mean that a bank has less money available to lend to other customers. 
                    </p>
                    <p>
                    In theory, it remains possible that a debtor may once again start 
                    making payments on a nonperforming loan, but in practice this rarely 
                    happens, and banks must figure out another way to collect on the loan. 
                    How a bank approaches collecting on a cash basis loan will depend on 
                    whether or not the loan is secured. If a nonperforming loan is secured 
                    by an asset, such as a car or home, the bank may attempt to recover 
                    some of its losses by foreclosing on or repossessing the asset in question. 
                    </p>
                    </div>

                </Col>
            </Row>
        </div>
    )
}
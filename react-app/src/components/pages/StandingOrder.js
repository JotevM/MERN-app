import React from 'react'
import { Row, Col} from 'reactstrap'
export default function StandingOrder() {
return (
    <div>
         <h1 className="m-5">STANDING ORDER</h1>
        <Row>
            <Col md="5" sm="5" xs="12">
                <img src="order.jpg" className="p-3 img-fluid" />
                <img src="StandingOrder.jpg" className="p-3 img-fluid" />
            </Col>
            <Col md="7" sm="7" xs="12">
                <div className="p-3" style={{ fontSize:"1.2em"}}>
                <p>   
                A standing order is a regular payment of the same 
                amount that’s paid on a specified date. It allows 
                the bank to take money regularly from your account 
                to pay another account. You can use a standing order 
                for many payment types, including:
                </p>
                    <ul>
                        <li>Transferring money between your accounts
                        </li>
                        <li> Sending a friend or family member money on a regular basis
                        </li>
                        <li>Paying your rent or mortgage
                        </li>
                        <li>Donating to a charity 
                        </li>
                    </ul>
                <p>   
                You need to know the exact amount you want to pay out in advance. 
                This means standing orders may not be useful for bills, where 
                the money owed can go up or down . You can also change or stop 
                a standing order at any time.
                </p>
                <h2 className="m-5">How To Set Up A Standing Order</h2>
                <p>
                You can easily set up a standing order over the phone, through 
                Internet Banking or by filling in a form at your local bank branch.
                The quickest way to set up a standing order is using Internet Banking:
                </p>
                    <ul>
                        <li>Log onto your account and select ‘More Actions’ on the right hand side panel.</li>
                        <li> Open up the ‘Direct Debits and standing orders' tab then click ‘Set up a standing order’.</li>
                        <li>Choose who you want to pay, either an existing recipient or add a new one.</li>
                        <li>Include the amount, reference, when and how often you want the payment 
                        to come out. Then click confirm.</li>
                    </ul>
                <p>
                You can change or cancel your standing order at any time by selecting 
                ‘manage standing orders’ on the Direct Debits and standing orders tab.
                </p>
                </div>

            </Col>
        </Row>
    </div>
)
}
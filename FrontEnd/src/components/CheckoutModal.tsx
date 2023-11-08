import React, { useState } from 'react';
import { Button, Modal, Form, Input, Header } from 'semantic-ui-react';
import {useNavigate} from "react-router-dom";

const CheckoutModal = ({ open, onClose, onCheckout, bookId }) => {
    const navigate = useNavigate();
    const [loanedOutTo, setLoanedOutTo] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = () => {
        onCheckout(bookId, loanedOutTo, dueDate);
        setLoanedOutTo('');
        setDueDate('');
        navigate("/");
    };

    return (
        <Modal open={open} onClose={onClose} style={{width:'320px'}}>
            <Header>Checkout Book</Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Borrower Name</label>
                        <Input
                            placeholder="Enter borrower's name"
                            value={loanedOutTo}
                            onChange={(e) => setLoanedOutTo(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Due Date</label>
                        <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button style={{backgroundColor:'#dc502e', color:'white'}} onClick={onClose}>Cancel</Button>
                <Button style={{backgroundColor:'#dc502e', color:'white'}} positive onClick={handleSubmit}>Checkout</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default CheckoutModal;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logo from './sc20logo.png';


class AlreadyRegisteredModal extends React.Component {

    render() {
        return             (
            <Container className="p-3">                
            <Jumbotron>
        
            <Row align="center">
            <Col/>
            <Col xs={6} md={4}>
            <Image align="center" src={logo}  roundedCircle fluid/>
            </Col>
            <Col/>
            </Row>
            <Row>
        <h1 className="header">You already have a username reservation, {this.props.firstName}</h1>
        </Row>
        <Row>
             The email address {this.props.email} was used previously to secure a username reservation for this tutorial.
             Please ask an instructor in the live chat to send you your username again.
             </Row>
                </Jumbotron>
                </Container>);    
    }
    
}

export default AlreadyRegisteredModal;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logo from './sc20logo.png';


class SuccessResultModal extends React.Component {

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
        <h1 className="header">{this.props.firstName}, you're all set to go!</h1>
        </Row>
        <Row>
              <p>Your guest user number is:</p>
              </Row>
              <Row>
                  <Col xs={6} md={4}/>
                <Col xs={6} md={4}><div align="center"><div className="giant animated wobble">{this.props.ticketNumber}</div></div></Col>
                <Col></Col>
                </Row>
                </Jumbotron>
                </Container>);    
    }
    
}

export default SuccessResultModal;

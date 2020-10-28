import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logo from './sc20logo.png';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
class ErrorModal extends React.Component {
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
        <h1 className="header">Oops. Something went wrong, {this.props.firstName}.</h1>
        </Row>
        <Row>
            <p>We're really sorry, but we didn't manage to secure a username reservation this time.
                You can refresh and try again, but if the error keeps happening, please
                let an instructor know in the live chat.
            </p>
        </Row>
        </Jumbotron>
        </Container>);    
    }
}

export default ErrorModal;

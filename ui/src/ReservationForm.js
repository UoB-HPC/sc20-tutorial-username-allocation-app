import logo from './sc20logo.png';
import React  from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import SuccessResultModal from './SuccessResultModal';
import ErrorModal from './ErrorModal';
import AlreadyRegisteredModal from './AlreadyRegisteredModal';
import Spinner from './Spinner';

/* Replace as per deployment */
const API_KEY="";
const API_URL="";

const Errors = {
    ThisPersonAlreadyReserved: 0,
    TechnicalError:1,
    NoError:2
};

class ReservationForm extends React.Component {
    state = {
        reservation : {
            firstName: "",
            lastName: "",
            institution: "",
            email: "",
            ticketNumber: 22
        },
        error: Errors.NoError,
        submitted: false,
        sending: false
    };


    handleChange = (event) => {
        const {reservation} = this.state;
        reservation[event.target.name] = event.target.value;
        this.setState({reservation});
    }

    onSubmit = (event) => {
        event.preventDefault();
        const reservation = this.state.reservation;
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },

            body: JSON.stringify({
                firstName: reservation.firstName,
                lastName: reservation.lastName,
                institution: reservation.institution,
                email:reservation.email
            })
        };
        var resultStatus = 0;
        fetch(API_URL, requestOptions)
        .then((response) =>  {
            resultStatus = response.status;
            return response.json();
        })
        .then(data => {
            switch (resultStatus) {
                case 201:
                    console.log(data);
                    this.setState({ sending:false, submitted:true, reservation: {
                        firstName: reservation.firstName,
                        lastName: reservation.lastName,
                        email: reservation.email,
                        institution: reservation.institution,
                        ticketNumber: data.ticketNumber},
                        error: Errors.NoError });
                    break;
                case 400:
                    this.setState({sending:false, submitted:true, error: Errors.ThisPersonAlreadyReserved});
                    break;
                case 500:
                case 503:
                default:
                        this.setState({sending:false, submitted:true, error: Errors.TechnicalError});
                        break;
                }
        })
        .catch(error=> {
            this.setState({sending:false, submitted:true, error: Errors.TechnicalError});
        });
        this.setState({sending: true})
    };

    showForm(reservation) {
        return (
        <>
        <div className={this.state.sending ? "" : "hide-me"}>
                <Spinner ></Spinner>
                </div>

        <Container className={this.state.sending ? "hide-me" : "p-3"}>
        <Jumbotron>

        <Row align="center">
        <Col/>
        <Col xs={6} md={4}>
        <Image align="center" src={logo}  roundedCircle fluid/>
        </Col>
        <Col/>
        </Row>
        <Row>
          <h1 className="header">Welcome To The "Programming your GPU with OpenMP" Tutorial</h1>
          <p>To be assigned your guest user account on the GW4 Isambard supercomputer for this tutorial, please
          fill in the form below.
        </p>
        </Row>
        <Row>
        <Alert variant="success">
      <Alert.Heading>Important Stuff</Alert.Heading>
           <ol>
        <li>We won't share your details with anyone else.</li>
        <li>We won't contact you unless you ask us for a reminder of your username</li>
        <li>We'll delete your data 30 days after the live tutorial closes</li>
        <li>To use Isambard, you'll have to agree to the <a href="https://gw4-isambard.github.io/docs/policies/terms.html">Terms and Conditions</a>.</li>
          </ol>
    </Alert>
        </Row>
        </Jumbotron>
      <Form onSubmit={this.onSubmit}>

      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" type="text" default={reservation.firstName} required onChange={this.handleChange} placeholder="Enter your first name" />
      </Form.Group>


      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" type="text" default={reservation.lastName} required onChange={this.handleChange} placeholder="Enter your last name" />
      </Form.Group>


      <Form.Group controlId="institution">
        <Form.Label>Organisation</Form.Label>
        <Form.Control name="institution" type="text" default={reservation.institution} onChange={this.handleChange} placeholder="Enter company, university etc." />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="text" default={reservation.email} onChange={this.handleChange} required placeholder="Enter email" />
      </Form.Group>

    <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" required feedback="You must agree before submitting." label="I accept the Terms and Conditions." />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Container>
        </>

    );
    // Not using email type because there might be unicode emails (@qq.com etc)
    }

    render() {
        const reservation = this.state.reservation;
        const submitted = this.state.submitted;
        const error = this.state.error;
        if (submitted) {
            if (error === Errors.NoError) {
                return <SuccessResultModal firstName={reservation.firstName} ticketNumber={reservation.ticketNumber}/>;
            } else if (error === Errors.TechnicalError) {
                return <ErrorModal firstName={reservation.firstName}/>;
            } else if (error === Errors.ThisPersonAlreadyReserved) {
                return <AlreadyRegisteredModal firstName={reservation.firstName} email={reservation.email}/>;
            }
        }
        return this.showForm(reservation);
    }

}

export default ReservationForm;

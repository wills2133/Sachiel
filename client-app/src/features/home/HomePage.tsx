import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Image, Header, Button } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted className='masthead'>
            <Segment textAlign='center' vertical style={{width:'100%'}}>
                <Container>
                    <Header as='h1' inverted>
                        <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                        Reactivities
                    </Header>
                </Container>
                <Header as='h2' inverted content='Welcom to the Reactivities' />
                <Button as={Link} to='/login' size='huge' inverted>
                    Login
                </Button>
            </Segment>
        </Segment>
    )
}
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Image, Header, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function HomePage() {
    const { userStore } = useStore();

    return (
        <Segment inverted className='masthead'>
            <Segment textAlign='center' vertical style={{width:'100%'}}>
                <Container>
                    <Header as='h1' inverted>
                        <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                        Reactivities
                    </Header>
                    {userStore.isLoggedIn
                    ? (
                        <>
                            <Header as='h2' inverted content='Welcom to the Reactivities' />
                            <Button as={Link} to='/activities' size='huge' inverted>
                                Go to activities
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button as={Link} to='/login' size='huge' inverted>
                                Login
                            </Button>
                        </>
                    )}
                </Container>
                
            </Segment>
        </Segment>
    )
})
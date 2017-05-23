import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Tabs, Tab, Header, Footer, FooterTab, Icon, Button, Text, TabHeading, Content, Left, Body, Title, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ContentFeed from './ContentFeed'
import Forum from './Forum'
export default class Toolbar extends Component {
    tabAction(tab) {
        this.setState({ activeTabName: tab });
        if (tab === 'logout') {
            Actions.login({ type: 'reset' });
        } 
    }

    render() {
        let { onLogout } = this.props;
        return (
            <Container>
                <Header hasTabs style={{backgroundColor: '#fe8222',borderColor:"black"}}>
                    <Left>
                          <Image source={require('../images/logoicon.png')} style={{width:40,height:40}}></Image>
                    </Left>
                    <Body>
                        <Title>OVERWATCH</Title>
                    </Body>
                    <Right>
                        <Button transparent  onPress={() => { this.tabAction('logout') }}>
                            <Icon name='md-lock' />
                        </Button>
                    </Right>
                </Header>
                <Tabs >
                    <Tab heading={<TabHeading style={{backgroundColor: '#fe8222' }}><Icon name="paper" /><Text>Feed</Text></TabHeading>} >
                        <ContentFeed />
                    </Tab>
                    <Tab heading={<TabHeading style={{backgroundColor: '#fe8222' }}><Icon name="md-clipboard" /><Text>Forum</Text></TabHeading>}>
                        <Forum />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

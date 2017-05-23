import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Tabs, Tab, Header, Footer, FooterTab, Icon, Button, Text, Content, Card, CardItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class Forum extends Component {

    tabAction(tab) {
        this.setState({ activeTabName: tab });
        if (tab === 'room1') {
            Actions.chat1({ type: 'reset' });
        } else if (tab === "room2") {
            Actions.chat2({ type: 'reset' });
        } else if (tab === "room3") {
            Actions.chat3({ type: 'reset' });
        }
    }
    render() {
        return (
            <Container style={{
                backgroundColor: '#212226'
            }}>
                <Content >

                    <Card style={{ height: 80, justifyContent: "center" }}>
                        <Image source={require('../images/t1.png')}
                            style={styles.imagebg}
                        >
                            <Button style={{ marginTop: 15 }} transparent onPress={() => { this.tabAction('room1') }} >
                                <Text style={{ alignItems: "center", color: "white", fontSize: 25, fontWeight: "bold" }}>
                                    OFFENSE ROOM
                                </Text>
                            </Button>
                        </Image>
                    </Card>

                    <Card style={{ height: 80, justifyContent: "center" }}>
                        <Image source={require('../images/t2.png')}
                            style={styles.imagebg}
                        >
                            <Button style={{ marginTop: 15 }} transparent onPress={() => { this.tabAction('room2') }}>
                                <Text style={{ alignItems: "center", color: "white", fontSize: 25, fontWeight: "bold" }}>
                                    DEFENSE ROOM
                                </Text>

                            </Button>
                        </Image>
                    </Card>
                    <Card style={{ height: 80, justifyContent: "center" }}>
                        <Image source={require('../images/t3.png')}
                            style={styles.imagebg}
                        >
                            <Button style={{ marginTop: 15 }} transparent onPress={() => { this.tabAction('room3') }}>

                                <Text style={{ alignItems: "center", color: "white", fontSize: 25, fontWeight: "bold" }}>
                                    TANK ROOM
                                </Text>

                            </Button>
                        </Image>
                    </Card>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    imagebg: {
        resizeMode: 'cover',
        width: null,
        height: null,
        flex: 1
    }
});


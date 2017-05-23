import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Footer, FooterTab, Icon, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AppFooter extends Component {
    state = {
        activeTabName: 'contentfeed'
    };
    componentWillMount() {
        let { tabName } = this.props;
        if (tabName !== 'contentfeed') {
            this.setState({ activeTabName: tabName });
        }
    }

    tabAction(tab) {
        this.setState({ activeTabName: tab });
        if (tab === 'contentfeed') {
            Actions.contentfeed({ type: 'reset' });
        } else if (tab === 'firebasenoteapp') {
            Actions.firebasenoteapp({ type: 'reset' })
        }else if(tab === 'imageuploadapp'){
            Actions.imageuploadapp()
        }
    }

    render() {
        let { onLogout } = this.props;
        return (
            <Footer>
                <FooterTab>
                    <Button
                        active={(this.state.activeTabName === "contentfeed") ? true : false}
                        onPress={() => { this.tabAction('contentfeed') }}>
                        <Icon name="paper" />
                        <Text>Feed</Text>
                    </Button>

                     <Button
                        active={(this.state.activeTabName === "firebasenoteapp") ? true : false}
                        onPress={() => { this.tabAction('firebasenoteapp') }}>
                        <Icon name="md-clipboard" />
                        <Text>AppNote</Text>
                    </Button>

                    <Button
                        active={(this.state.activeTabName === "logout") ? true : false}
                        onPress={onLogout}>
                        <Icon name="md-lock" />
                        <Text>Logout</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
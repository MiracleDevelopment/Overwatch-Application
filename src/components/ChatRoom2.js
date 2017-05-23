import React, { Component, PropTypes } from 'react';
import { ListView, View, Text, Alert, TextInput, Keyboard, Platform, TouchableHighlight,StyleSheet,Image } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, Thumbnail, CardItem, ListItem } from 'native-base';
import Forum from './Forum'
import LoadingViewComponent from './LoadingComponent';
import { signoutAsync } from '../helper';
import AppFooter from './AppFooter'
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class ChatRoom2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            noteText: '',
            isLoading: false
        };
        //cloum split channel
        this.itemsRef = this.getRef().child('room2');

    }

    getRef() { // connect firebase database
        let { firebase } = this.props;
        return firebase.database().ref();
    }
    listenForItems(itemsRef) {// update listview function
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title1: child.val().title1,
                    desc: child.val().desc,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                isLoading: false
            });

        });
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        this.listenForItems(this.itemsRef);
    }
    _renderItem(item) {
        const onPress = () => {
            Alert.alert(
                'Delete row',
                null,
                [
                    { text: 'Delete', onPress: (text) => this.itemsRef.child(item._key).remove() },
                    { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
                ]
            );
        };

        return (
            //result item
            <ListItem onPress={onPress} >
                <Text style={{color:"white"}}>{item.title1}</Text>
            </ListItem>

        );
    }
    _addItem() {
        //name variable
        this.itemsRef.push({ title1: this.state.noteText })
        this.setState({ noteText: '' });

    }

    tabAction(tab) {
        this.setState({ activeTabName: tab });
        if (tab === 'back') {
            Actions.toolbar({ type: 'reset' });
        }
    }


    render() {
        return (
               <Image source={require('../images/r2.jpg')}
                style={styles.imagebg}>
            <Container>
                <Content>
                   
                    <Header hasTabs style={{ backgroundColor: '#fe8222' }}>
                        <Left>
                            <Button transparent onPress={() => { this.tabAction('back') }}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>DEFENSE ROOM</Title>
                        </Body>
                    </Header>
                    <View style={{
                        marginTop: Platform.OS === 'ios' ? 25 : 0,
                        flexDirection: 'row',
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: '#cccccc',
                        borderBottomWidth: 1,
                        marginBottom: 5
                    }}>
                        <TextInput
                            style={{
                                height: 40,
                                marginRight: 10,
                                backgroundColor: '#cccccc',
                                flex: 5
                            }}
                            value={this.state.noteText}
                            onBlur={() => { Keyboard.dismiss() }}
                            onChangeText={(noteText) => this.setState({ noteText })}
                        />
                        <Button stye={{
                            flex: 1
                        }}
                            onPress={this._addItem.bind(this)}
                        >
                            <Icon name="paper-plane" />
                        </Button>
                    </View>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderItem.bind(this)}
                        enableEmptySections={true}
                    />
                </Content>
                <LoadingViewComponent isLoading={this.state.isLoading} />
                
            </Container>
            </Image>
        );
    }
}
const styles = StyleSheet.create({
    imagebg: {
        resizeMode: 'cover',
        width: null,
        height: null,
        flex: 1
    },

});


export default ChatRoom2;
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import Login from './components/Login';
import ContentFeed from './components/ContentFeed';
import Register from './components/Register';
import FirebaseNoteApp from './components/FirebaseNoteApp';
import Toolbar from './components/Toolbar';
import Forum from './components/Forum'
import ChatRoom1 from './components/ChatRoom1';
import ChatRoom2 from './components/ChatRoom2'
import ChatRoom3 from './components/ChatRoom3'
import * as firebase from 'firebase';

export default class App extends Component {
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyDgmEu8ARzCLMHBn9tVKA86asGqlpEtPeo",
            authDomain: "prime-framing-135123.firebaseapp.com",
            databaseURL: "https://prime-framing-135123.firebaseio.com",
            projectId: "prime-framing-135123",
            storageBucket: "prime-framing-135123.appspot.com",
            messagingSenderId: "643310047708"
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={Login} title="Login" hideNavBar firebase={firebase} />
                    <Scene key="register" component={Register} title="register" hideNavBar firebase={firebase} />
                    <Scene key="firebasenoteapp" component={FirebaseNoteApp} title="register" hideNavBar firebase={firebase} />
                    <Scene key="contentfeed" component={ContentFeed} title="Youtube Feed" hideNavBar firebase={firebase} />
                    <Scene key="toolbar" component={Toolbar} title="toolbar Feed" hideNavBar firebase={firebase} />
                    <Scene key="forum" component={Forum} title="Forum" hideNavBar firebase={firebase} />
                    <Scene key="chat1" component={ChatRoom1} title="Chat1" hideNavBar firebase={firebase} />
                    <Scene key="chat2" component={ChatRoom2} title="Chat2" hideNavBar firebase={firebase} />
                    <Scene key="chat3" component={ChatRoom3} title="Chat3" hideNavBar firebase={firebase} />
                </Scene>
            </Router>
        );
    }
}
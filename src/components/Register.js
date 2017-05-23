import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Icon, Container, Content, InputGroup, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { checkLogin, signupAsync } from '../helper';

import LoadingViewComponent from './LoadingComponent'

class Register extends Component {
    state = {
        email: '',
        password: '',
        repassword: '',
        isLoading: false
    }

    async _checkLogin() {
        let { firebase } = this.props;
        let { email, password } = this.state;

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password); // ล็อกอิน firebase

            console.log("Account created");
            Actions.toolbar({ type: 'reset' });
        } catch (error) {
            alert(error.toString());
            this.setState({ isLoading: false });
        }
    }

    async signupAsync() {
        this.setState({ isLoading: true });
        let { firebase } = this.props;
        let { email, password } = this.state;

        try {
            let auth = await firebase.auth();
            await auth.createUserWithEmailAndPassword(email, password);
            Actions.login({ type: 'reset' });
        } catch (error) {
            alert(error.toString());
            this.setState({ isLoading: false });
        }
    }

    checkPassword() {
        let { password, repassword } = this.state;
        if (password === repassword) {
            this.signupAsync();
        } else {
            alert("Password Incorrect!")
        }
    }

    render() {
        return (
            <Image source={require('../images/bg.jpg')}
                style={styles.imagebg}>

                <View
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>

                    <Image source={require('../images/logo.png')}
                        style={{
                            width: 400,
                            height: 200
                        }}
                    />

                    <View style={styles.viewForm}>
                        <Item rounded
                            style={{
                                marginLeft: 30,
                                marginRight: 30
                            }}>
                            <Input
                                style={{
                                    color: 'white',
                                    marginLeft: 15
                                }}
                                onBlur={() => { Keyboard.dismiss() }}
                                onChangeText={(email) => this.setState({ email })}
                                placeholder='Email' />
                        </Item>
                    </View>

                    <View style={styles.viewForm}>
                        <Item rounded
                            style={{
                                marginLeft: 30,
                                marginRight: 30
                            }}>
                            <Input
                                style={{
                                    color: 'white',
                                    marginLeft: 15
                                }}
                                secureTextEntry={true}
                                onBlur={() => { Keyboard.dismiss() }}
                                onChangeText={(password) => this.setState({ password })}
                                placeholder='Password' />
                        </Item>
                    </View>
                    <View style={styles.viewForm}>
                        <Item rounded
                            style={{
                                marginLeft: 30,
                                marginRight: 30
                            }}>
                            <Input
                                style={{
                                    color: 'white',
                                    marginLeft: 15
                                }}
                                secureTextEntry={true}
                                onBlur={() => { Keyboard.dismiss() }}
                                onChangeText={(repassword) => this.setState({ repassword })}
                                placeholder='Re-password' />
                        </Item>
                    </View>

                    <Button iconLeft rounded style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        backgroundColor: '#fe8222'
                    }}
                        onPress={this.checkPassword.bind(this)}
                    >
                        <Icon name='md-lock' />
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Register</Text>
                    </Button>

                    <Button
                        onPress={() => Actions.login({ type: 'reset' })}
                        transparent primary
                        style={{
                            alignSelf: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Login</Text>
                    </Button>

                </View>
                <LoadingViewComponent isLoading={this.state.isLoading} />
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
    viewForm: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    }
});
export default Register;
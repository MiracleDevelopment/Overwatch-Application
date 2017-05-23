import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Icon, Container, Content, InputGroup, Input, Item } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {checkLogin} from '../helper'

class Login extends Component {
    state = {
        email: '',
        password: ''
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
                                marginLeft:30,
                                marginRight:30
                            }}>
                            <Input
                                style={{
                                    color:'white',
                                    marginLeft:15}}
                                onChangeText={(email) => this.setState({ email })} 
                                placeholder='Enter Email' />
                        </Item>
                    </View>

                    <View style={styles.viewForm}>
                        <Item rounded
                            style={{
                                marginLeft:30,
                                marginRight:30
                            }}>
                            <Input
                                style={{
                                    color:'white',
                                    marginLeft:15}}
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({ password })}
                                placeholder='Enter Password' />
                        </Item>
                    </View>

                    <Button iconLeft rounded style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        backgroundColor: '#fe8222'
                    }}
                        onPress={()=>checkLogin(this)}>
                        <Icon name='md-lock' />
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Login</Text>
                    </Button>

                    <Button transparent style={{
                        alignSelf:'center',
                    }}
                    onPress={()=>Actions.register()}
                    >
                        <Text style={{
                            fontSize:15,
                            fontWeight:'bold',
                            color:'white'
                        }}>Register</Text>
                    </Button>

                </View>
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
export default Login;
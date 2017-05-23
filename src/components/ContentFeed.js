import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableOpacity, Linking } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, Thumbnail, CardItem, Tab, Tabs } from 'native-base';
import AppFooter from './AppFooter';
import LoadingComponent from './LoadingComponent';
import { signoutAsync } from '../helper';
import * as firebase from 'firebase';

const apiKey = 'AIzaSyAFYk7Kahr_8n-mTCE29K-x5lv2kgrd1aA';
const channelID = 'UClOf1XXinvZsy4wKPAkro2A';

class ContentFeed extends Component {
    componentWillMount() {
        this.getJsonFeed();
    }
    async getJsonFeed() {
        this.setState({ isLoading: true });
        try {
            const response = await fetch('https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&channelId=' + channelID + '&part=snippet,id&order=date&maxResults=20'); // ข้อมูลดิบ

            const responseJson = await response.json(); // แปลงเป็น JSON

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson.items),
                isLoading: false
            });

        } catch (error) {
            alert(error.toString());
            this.setState({ isLoading: false });
        }
    }
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    renderRowCard(rowData) {
        /* Map Data */
        let { videoId } = rowData.id;
        let { title, description, publishedAt, thumbnails } = rowData.snippet;
        let { high } = thumbnails;
        /* Map Data */
        return (
            <Card>
                <CardItem style={{
                    backgroundColor: '#212226'
                }}>
                    <Left>
                        <Thumbnail source={{ uri: 'https://yt3.ggpht.com/-M2-DH_DN-Qs/AAAAAAAAAAI/AAAAAAAAAAA/kczw_wtvMOI/s288-c-k-no-mo-rj-c0xffffff/photo.jpg' }} />
                        <Body>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: 'white'
                            }}>{title}</Text>
                            <Text note style={{
                                color: '#cccccc'
                            }}>{publishedAt}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Body>
                        <TouchableOpacity style={{
                            alignSelf: 'stretch'
                        }}
                            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + videoId)}
                        >
                            <Image source={{ uri: high.url }} style={{
                                height: 200,
                                alignSelf: 'stretch'
                            }} />
                        </TouchableOpacity>
                    </Body>
                </CardItem>
                <CardItem content style={{
                    backgroundColor: '#212226'
                }}>
                    <Text style={{
                        color: '#cccccc'
                    }}>{description}</Text>
                </CardItem>
            </Card>
        )
    }
    render() {
        return (
            <Container style={{
                backgroundColor: '#212226'
            }}>

                <Content>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this.renderRowCard(rowData)}
                        enableEmptySections={true}
                    />
                </Content>
                <LoadingComponent isLoading={this.state.isLoading} />
            </Container>
        );
    }
}

export default ContentFeed;
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export async function checkLogin(_this) {
    let { firebase } = _this.props;
    let { email, password } = _this.state;
    _this.setState({ isLoading: true });
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        console.log("Account created");
        Actions.toolbar({ type: 'reset' });

    } catch (error) {
         Alert.alert(
            'Email or Password is Incorrect!',
            'Check your email or password.',
            [
                { text: 'Try Again', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        );
        _this.setState({ isLoading: false });
    }

}

export async function signupAsync(_this) {
    let { firebase } = _this.props;
    let { email, password } = _this.state;
    _this.setState({ isLoading: true });
    try {
        let auth = await firebase.auth()
        await auth.createUserWithEmailAndPassword(email, password);
        checkLogin(_this);

    } catch (error) {
        console.log(error.toString());
        Alert.alert(
            '!Error',
            'Signup Error : ' + error.toString() + '\nลองใหม่',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK' }
            ]
        );
        _this.setState({ isLoading: false });
    }
}

export async function signoutAsync(_this) {
    let { firebase } = _this.props;
    _this.setState({ isLoading: true });
    try {
        let auth = await firebase.auth();
        await auth.signOut();
        Actions.login({ type: 'reset' });
    } catch (error) {
        console.log(error.toString());
        Alert.alert(
            '!Error',
            'Signup Error : ' + error.toString() + '\nลองใหม่',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK' }
            ]
        );
        _this.setState({ isLoading: false });
    }
}
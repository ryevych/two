import { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '@react-native-firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        const response = await auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // console.log("signIn response: ", JSON.stringify(response, null, 2));
            })
            .catch(error => {
                alert('Failed to sign in: ' + error.message)
            });
        setLoading(false);

        // try {
        // const response = await signInWithEmailAndPassword(auth, email, password);
        // console.log("signIn response: ", response);
        // console.log("signIn response: ", JSON.stringify(response, null, 2));
        // } catch (err: any) {
        // console.log("signIn error: ", JSON.parse(err));
        // alert('Failed to sign in: ' + err.message)
        // } finally {
        //     setLoading(false);
        // }
    }

    const signUp = async () => {
        setLoading(true);
        const response = await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                // console.log("signUp response: ", JSON.stringify(response, null, 2));
            })
            .catch(error => {
                alert('Failed to create user: ' + error.message)
            });
        setLoading(false);
        // try {
        //     const response = await createUserWithEmailAndPassword(auth, email, password);
        // console.log("signUp response: ", response);
        // } catch (err: any) {
        // console.log("signUp error: ", JSON.parse(err));
        // alert('Failed to create user: ' + err.message)
        // } finally {
        //     setLoading(false);
        // }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput value={password} style={styles.input} placeholder='password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true}></TextInput>

                {loading ? <ActivityIndicator size='large' color='#0000ff' />
                    : (
                        <View style={styles.buttonContainer}>
                            <Button title='Login' onPress={signIn} />
                            <Button title='Create account' onPress={signUp} />
                        </View>
                    )}
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
    },
    buttonContainer: {
        gap: 5,
    }
});
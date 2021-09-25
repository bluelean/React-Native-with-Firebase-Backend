import React from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

export default function OnBoarding({ navigation }) {
    const Done = ({ ...props }) => {
        return (
            <View style={{ paddingRight: 25 }}>
                <Button onPress={() => navigation.navigate('Login')}
                    title='Get Started'
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Onboarding
                onSkip={() => navigation.replace('Login')}
                onDone={() => navigation.navigate('Login')}
                DoneButtonComponent={Done}
                pages={[
                    {
                        backgroundColor: '#F1E8BD',
                        image: <Image source={require('../assets/onboarding/tennis.png')} style={styles.image} />,
                        title: <Text style={{ fontSize: 28, color: '#5F264A', fontWeight: 'bold' }}>Play With Frolic</Text>,
                        subtitle: 'Find, Connect and Play!',
                    },
                    {
                        backgroundColor: '#5F264A',
                        image: <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>
                            <Image source={require('../assets/onboarding/tennis-girl.png')} style={{ width: 200, height: 250, resizeMode: 'contain' }} />
                            <Image source={require('../assets/onboarding/boxing.png')} style={{ width: 200, height: 250, resizeMode: 'contain' }} />
                        </View>,
                        title: <Text style={{ fontSize: 28, marginLeft: "12%", textAlign: 'center', color: 'white', }}>find people with similar Interest</Text>,
                        subtitle: <Text style={{ marginLeft: "10%", color: 'white' }}>Play sports without easing of arena</Text>,
                    },
                    {
                        backgroundColor: '#F27268',
                        image: <Image source={require('../assets/onboarding/stretching.png')} style={styles.image} />,
                        title: 'Fitness, Yoga and Organic',
                        subtitle: 'Achieve your goal with Yoga sessions, Healt advice, Organic Food and many more',
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 250,
        width: 200,
        resizeMode: 'contain'
    }
})
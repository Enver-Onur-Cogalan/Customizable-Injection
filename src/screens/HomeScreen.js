import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import useThemeStore from '../store/useThemeStore';


const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const [showWeb, setShowWeb] = useState(false);
    const webRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const { backgroundColor } = useThemeStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWeb(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (webRef.current && showWeb) {
            const script = `document.body.style.backgroundColor = '${backgroundColor}'; true;`;
            webRef.current.injectJavaScript(script);
        }
    }, [backgroundColor, showWeb]);


    const injectedScript = `
    document.body.style.backgroundColor = '${backgroundColor}';
    document.documentElement.style.backgroundColor = '${backgroundColor}';
    true;
    `;

    return (
        <View style={styles.container}>

            {!showWeb && (
                <LottieView
                    source={require('../assets/animations/loading.json')}
                    autoPlay
                    loop
                    style={StyleSheet.absoluteFill}
                />
            )}

            {showWeb && (
                <WebView
                    ref={webRef}
                    source={{ uri: 'https://www.google.com' }}
                    injectedJavaScript={injectedScript}
                    style={[styles.webview && { backgroundColor: 'transparent' }]}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
    },
    webview: {
        flex: 1,
        width,
        height,
    },
});


export default HomeScreen;
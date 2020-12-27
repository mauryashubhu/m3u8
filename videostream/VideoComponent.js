import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ProgressBarAndroid, PermissionsAndroid, Alert, Platform } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window');

const VideoComponent = (props) => {
    console.log('topics params is = ', props.navigation)
    const [videolink, setVideoLink] = useState([
        'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
        'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
        'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    ]);

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignContent: 'center', height: 400, width: '100%' }}>
                <View style={styles.cardUpper}>
                    <Swiper height={400} containerStyle={{ justifyContent: 'center', alignSelf: 'center', marginTop: 100 }} >
                        {videolink.map((video, key) => (
                            <TouchableOpacity key={key} onPress={() => props.navigation.navigate('VideoScreen', { params: { video } })}
                                style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                            >
                                <Icon
                                    name='videocam-outline'
                                    color="blue"
                                    size={50}
                                />
                                <Text>Click HERE for video</Text>
                            </TouchableOpacity>
                        ))}
                    </Swiper>
                </View>

            </View>
        </View>
    )
}

export default VideoComponent


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        // flex: 2,
        height: 50,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
    },
    menu: {
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        height: 30,
        width: 55,
        alignItems: 'flex-start'

    },
    logout: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 5,
        height: 30,
        width: 55,

    },
    cardUpper: {
        flex: 1,
        backgroundColor: '#00FFA2',
        marginLeft: 10,
        marginRight: 10,
        // marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        // alignItems: 'center',
        // padding: 10,
        justifyContent: 'center',
        // borderWidth: 1,

    },
    cardLower: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
        padding: 18
    },
    pdfcard: {
        // flex: 1,
        backgroundColor: '#fb5b5a',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
        width: '100%',
        height: 48.5,
        flexDirection: 'row'
    },
    backgroundVideo: {
        flex: 1,
        // width: 200,
        // height: 200
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    playButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    controls: {
        backgroundColor: 'yellow',
        opacity: 0.7,
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        // flexDirection: 'column'
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
        // borderWidth:1 
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    playControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

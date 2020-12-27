
import React, { Component, useRef } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ToastAndroid,
    ProgressBarAndroid
} from 'react-native';
import Video from 'react-native-video';
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-community/picker'




export default class VideoScreen extends Component {
    constructor(props) {
        console.log(' video screen ', props);
        super(props);

        // init state variables
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            pickerValueHolder: '1.0',
            pausedText: 'Play-outline',
            hideControls: false,
            isplaying: false
        };

        this.video = Video;
    }

    // load video event
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    // video is playing
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    // video ends
    onEnd = () => {
        this.setState({ paused: true, pausedText: 'Play' })
        this.video.seek(0);
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    onChangeRate(itemValue, itemIndex) {
        var rate = parseFloat(itemValue);
        this.setState({ pickerValueHolder: itemValue, rate: rate });
    }

    // pressing on 'play' button
    onPressBtnPlay() {
        var pausedText = '';
        if (!this.state.paused) {
            pausedText = 'Play-outline';

            // always show controls
            if (this.timeoutHandle)
                clearTimeout(this.timeoutHandle);
        }
        else {
            pausedText = 'Pause-circle-outline';

            // hide controls after 5s
            this.timeoutHandle = setTimeout(() => {
                this.setState({ hideControls: true });
            }, 3000);
        }
        this.setState({ paused: !this.state.paused, pausedText: pausedText });
    }

    // on press video event
    onPressVideo() {
        // showing controls if they don't show
        if (this.state.hideControls) {
            this.setState({ hideControls: false });
            this.timeoutHandle = setTimeout(() => {
                this.setState({ hideControls: true });
            }, 3000);
        }
    }

    // parse seconds to time (hour:minute:second)
    parseSecToTime(sec) {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        return hours + ':' + minutes + ':' + seconds;
    }

    onPressfullscreen() {
        if (this.state.resizeMode === 'contain')
            this.setState({ resizeMode: 'stretch' })
        else {
            this.setState({ resizeMode: 'contain' })
        }

    }

    render() {
        const { pausedText } = this.state;
        const flexCompleted = this.getCurrentTimePercentage() * 100;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.fullScreen}
                    onPress={() => this.onPressVideo()}>
                    <Video
                        ref={(ref: Video) => { this.video = ref }}
                        /* For ExoPlayer */
                        source={{ uri: this.props.route.params.params.video }}
                        // source={require('./videos/tom_and_jerry_31.mp4')}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    // fullscreen ={true}
                    />
                </TouchableWithoutFeedback>
                {!this.state.hideControls ? (
                    <View style={styles.controls}>
                        <View style={styles.trackingControls}>
                            <ProgressBarAndroid
                                style={styles.progress}
                                styleAttr="Horizontal"
                                indeterminate={false}
                                progress={this.getCurrentTimePercentage()}
                            />
                            <Text style={{ color: 'white' }}>{this.parseSecToTime(parseInt(this.state.currentTime))}/{this.parseSecToTime(parseInt(this.state.duration))}</Text>
                        </View>
                        <View style={styles.generalControls}>
                            <View style={[styles.playControl]}>
                                {/* <Text onPress={() => this.onPressBtnPlay()}>{this.state.pausedText}</Text> */}
                                <TouchableOpacity onPress={() => this.onPressBtnPlay()}>
                                    {this.state.paused ? <Icon
                                        name='play'
                                        color="white"
                                        size={30}
                                    /> :
                                        <Icon
                                            name='pause-circle'
                                            color="white"
                                            size={30}
                                        />}
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.rateControl]}>
                                <Picker
                                    style={{ width: 200, color: 'white', }}
                                    selectedValue={this.state.pickerValueHolder}
                                    onValueChange={(itemValue, itemIndex) => this.onChangeRate(itemValue, itemIndex)} >
                                    <Picker.Item label="1.5 times" value="1.5" />
                                    <Picker.Item label="x1.25 times" value="1.25" />
                                    <Picker.Item label="x1.0 times" value="1.0" />
                                    <Picker.Item label="x0.75 times" value="0.75" />
                                    <Picker.Item label="x0.5 times" value="0.5" />
                                </Picker>
                            </View>
                            {/* <View style={styles.resizeModeControl}>
                                <Picker
                                    style={{ width: 150 }}
                                    selectedValue={this.state.resizeMode}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ resizeMode: itemValue })} >
                                    <Picker.Item label="none" value="none" />
                                    <Picker.Item label="cover" value="cover" />
                                    <Picker.Item label="stretch" value="stretch" />
                                    <Picker.Item label="contain" value="contain" />
                                </Picker>
                            </View> */}
                            <View style={styles.resizeModeControl} >
                                <TouchableOpacity onPress={() => this.onPressfullscreen()}>
                                    {this.state.resizeMode === 'contain' ? <Icon
                                        name='expand-outline'
                                        color="white"
                                        size={30}
                                    /> :
                                        this.state.resizeMode === 'stretch' ?
                                            <Icon
                                                name='contract-outline'
                                                color="white"
                                                size={30}
                                            /> : null}
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                ) : (null)
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
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
        backgroundColor: 'transparent',
        opacity: 0.7,
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        // justifyContent: 'space-around'
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        // overflow: 'hidden',

    },
    rateControl: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        height: 50,
        width: 200
    },
    playControl: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        width: 50,
        borderColor: 'white'
    },
    resizeModeControl: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        height: 50,
        width: 50
    },
    generalControls: {
        // borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        // opacity: 0
    }
});





import React from 'react';
import { Text,
        View,
        StyleSheet,
        PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Button } from '../../functions/ButtonMapAlarm';
import mapRegion from './mapRegion.json';

import { getRealmObj, changeRealmObj } from '../../database/database';

import themeCheck from '../../functions/themeCheck';

var track ={
    url: require('../../budzik/budzik.mp3'),    
    title: 'budzik',
    duration: 13
}

class MapAlarm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            map: getRealmObj("location")[0],
            user: {},
            addShow: false
        };
        this.getState = this.getState.bind(this);
    }
    async componentDidMount(){
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
                    );
                }catch(err) {
                    alert(err);
                }
            }
            else{
                alert("Location permission denied");
            }
        }catch(err) {
            console.warn(err);
        }

        try{
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add([track]);
            await TrackPlayer.setRepeatMode(RepeatMode.Track);
        }catch(error){
            console.log(error);
        }

        ReactNativeForegroundService.add_task(() => {
            if(
                this.state.user.longitude < this.state.map.pointLocation.longitude + this.props.route.params.data[1].float &&
                this.state.user.longitude > this.state.map.pointLocation.longitude - this.props.route.params.data[1].float &&
                this.state.user.latitude < this.state.map.pointLocation.latitude + this.props.route.params.data[1].float &&
                this.state.user.latitude > this.state.map.pointLocation.latitude - this.props.route.params.data[1].float
            ){
                this.userAtPoint();
            }
        },{
            onLoop: true,
            delay: 1000,
            taskId: 'check',
            onError: (e) => console.log(e),
        });

        mobileAds().initialize().then(
            this.setState({
                addShow: true
            })
        );
    }
    componentWillUnmount(){
        this.bgStop();
    }
    getState(long, lati){
        this.setState({user:{
            longitude: long,
            latitude: lati,
        }})
    }
    
    bgStart(){
        ReactNativeForegroundService.add_task(() => {
            Geolocation.watchPosition(
                (position) => {this.getState(position.coords.longitude, position.coords.latitude)},
                (error) => console.log(error.code, error.message),
                { enableHighAccuracy: true, timeout: 15000, distanceFilter: 10, interval: 1000 }
            );
        },{
            onLoop: false,
            taskId: 'getLocation',
            onError: (e) => console.log(`Error logging:`, e),
        });
        ReactNativeForegroundService.start({
            id: 144,
            title: "Map alarm tracking",
            message: "Enjoy your nap! ^^",
        });
    }
    async bgStop(){
        ReactNativeForegroundService.stop();
        Geolocation.clearWatch(0);
        await TrackPlayer.pause();
    }
    
    async userAtPoint(){
        console.log('user at point wake up');
        await TrackPlayer.play();
    }

    onMapPress = async (event) => {
        this.setState({map:{
            _id: 0,
            pointLocation: event.nativeEvent.coordinate
        }});
        changeRealmObj("location", {
            _id: 0,
            pointLocation: event.nativeEvent.coordinate
        });
    }

    render(){

        const Styles = StyleSheet.create(themeCheck() == 'dark' ? 
        { //dark
            container:{
                flex: 1,
            },
            element:{
                flex: 3,
            },
            elementStart:{
                flex: 1,
                justifyContent: 'center'
            },
            button:{
                position: 'absolute',
                top: '60%',
                left: 0, 
                right: 0, 
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 7
            },
        } : { //light
            container:{
                flex: 1,
            },
            element:{
                flex: 3,
            },
            elementStart:{
                flex: 1,
                justifyContent: 'center'
            },
            button:{
                position: 'absolute',
                top: '60%',
                left: 0, 
                right: 0, 
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 7
            },
        })

        return(
            <View style={Styles.container}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, alignItems: 'center'}}>
                    {this.state.addShow ? <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} /> : null}
                </View>
                <View style={Styles.element}>
                    <MapView style={{flex: 1}}
                        region={mapRegion.PL}
                        onPress={this.onMapPress}
                        showsUserLocation={true}
                        toolbarEnabled={false}
                        customMapStyle={themeCheck() == 'dark' ? mapRegion.Styles.dark : mapRegion.Styles.light}
                    >
                        <Marker coordinate={this.state.map.pointLocation} />
                    </MapView>
                </View>
                <View style={Styles.button}>
                    <Button uname={'start'} name={'stop'} start={() => {this.bgStart()}} stop={this.bgStop} />
                </View>
            </View>
        )
    }
}

export default MapAlarm;
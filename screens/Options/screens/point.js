import React, { useState } from "react";
import { 
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import mapRegion from '../../Map Alarm/mapRegion.json'
import Slider from '@react-native-community/slider';

import themeCheck from "../../../functions/themeCheck";

import { changeRealmObj } from '../../../database/database';


const Point = (props) => {

    const [state, setState] = useState(props.route.params.data[1].float);

    const Styles = StyleSheet.create(themeCheck() == 'dark' ? 
    { //dark
        flex:{
            flex: 1
        },
        nav:{
            height: 60,
            width: '100%',
            justifyContent: 'center',
        },
        navText:{
            color: 'white',
            fontSize: 20,
            textAlign: 'center'
        },
        container:{
            backgroundColor: '#212121',
        },
        main:{
            marginTop: 30,
        },
        catchArea:{
            alignItems: 'center'
        },
        textContainer:{
            width: '40%',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        textContainerNav:{
            textAlign: 'center',
            color: 'gray'
        },
        pointCacthCounter:{
            width: Dimensions.get('window').width * 0.3,
            height: Dimensions.get('window').width * 0.3,
            backgroundColor: '#121212',
            borderRadius: 10,
            justifyContent: 'center'
        },
        pointCacthCounterTextColor:{
            textAlign: 'center',
            color: 'white',
            fontSize: 40,
            fontWeight: 'bold'
        },
        mapContainer:{
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').width * 0.5,
            overflow: 'hidden',
            borderRadius: 30,
        },
    } : { //light
        flex:{
            flex: 1
        },
        nav:{
            height: 60,
            width: '100%',
            justifyContent: 'center',
        },
        navText:{
            color: '#000',
            fontSize: 20,
            textAlign: 'center'
        },
        container:{
            backgroundColor: '#fff',
        },
        main:{
            marginTop: 30,
        },
        catchArea:{
            alignItems: 'center'
        },
        textContainer:{
            width: '40%',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        textContainerNav:{
            textAlign: 'center',
            color: '#000'
        },
        pointCacthCounter:{
            width: Dimensions.get('window').width * 0.3,
            height: Dimensions.get('window').width * 0.3,
            backgroundColor: '#242424',
            borderRadius: 10,
            justifyContent: 'center'
        },
        pointCacthCounterTextColor:{
            textAlign: 'center',
            color: 'white',
            fontSize: 40,
            fontWeight: 'bold'
        },
        mapContainer:{
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').width * 0.5,
            overflow: 'hidden',
            borderRadius: 30,
        },
    });
    
    return(
        <ScrollView style={[Styles.flex, Styles.container]}>
            <View style={Styles.nav}>
                <Text style={Styles.navText}>
                    Point
                </Text>
            </View>
            <View style={Styles.main}>
                <View style={Styles.catchArea}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                        <View style={Styles.textContainer}>
                            <Text style={Styles.textContainerNav}>
                                Point catch area{'\n'}(diameter)
                            </Text>
                            <View style={Styles.pointCacthCounter}>
                                <Text style={Styles.pointCacthCounterTextColor}>
                                    {Math.floor(state * 200000)}m
                                </Text>
                            </View>
                        </View>
                        <View style={Styles.mapContainer}>
                            <MapView style={{flex: 1}}
                                region={mapRegion.Options.PL}
                                customMapStyle={themeCheck() == 'dark' ? mapRegion.Styles.dark : mapRegion.Styles.light}
                                liteMode={true}
                            >
                                <Marker coordinate={mapRegion.Options.NysyŁóżyckiej}/>

                                <Marker coordinate={{
                                    latitude: mapRegion.Options.NysyŁóżyckiej.latitude + state,
                                    longitude: mapRegion.Options.NysyŁóżyckiej.longitude
                                }}/>
                                <Marker coordinate={{
                                    latitude: mapRegion.Options.NysyŁóżyckiej.latitude,
                                    longitude: mapRegion.Options.NysyŁóżyckiej.longitude + state
                                }}/>
                                <Marker coordinate={{
                                    latitude: mapRegion.Options.NysyŁóżyckiej.latitude - state,
                                    longitude: mapRegion.Options.NysyŁóżyckiej.longitude
                                }}/>
                                <Marker coordinate={{
                                    latitude: mapRegion.Options.NysyŁóżyckiej.latitude,
                                    longitude: mapRegion.Options.NysyŁóżyckiej.longitude - state
                                }}/>

                            </MapView>
                        </View>
                    </View>
                    <Slider style={{width: '90%', marginTop: 30}}
                        minimumTrackTintColor= {themeCheck() == 'dark' ? "#FFF" : "#000"}
                        maximumTrackTintColor="#999"
                        thumbTintColor={themeCheck() == 'dark' ? "#FFF" : "#000"}
                        value={props.route.params.data[1].float}
                        onSlidingComplete={(pose) => {
                            setState(pose);
                            changeRealmObj("options", {
                                float: pose,
                                _id: 1,
                            })
                        }}
                        minimumValue={0.0001}
                        maximumValue={0.002}
                    />
                </View>

            </View>
        </ScrollView>
    )
}

export default Point;
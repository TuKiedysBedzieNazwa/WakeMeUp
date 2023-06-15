import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    DevSettings,
    ScrollView
} from "react-native";
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { Theme } from "./theme";
import { Option } from "../opttionsVersions";

import themeCheck from "../../../functions/themeCheck";

class Options extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            addShow: false
        }
        this.popupRef = React.createRef();
    }
    componentDidMount(){
        mobileAds().initialize().then(
            this.setState({
                addShow: true
            })
        );
    }
    
    render(){

        const Styles = StyleSheet.create(themeCheck() == 'dark' ?
        { //dark
            flex:{
                flex: 1,
            },
            container:{
                backgroundColor: '#212121'
            },
            nav:{
                fontSize: 34,
                marginTop: 20,
                color: 'white'
            },
            textAlign:{
                textAlign: 'center',
            },
            color:{
                color: '#aeaeae'
            }
        } : { //light
            flex:{
                flex: 1,
            },
            container:{
                backgroundColor: 'white'
            },
            nav:{
                fontSize: 34,
                marginTop: 20,
                color: 'black'
            },
            textAlign:{
                textAlign: 'center',
            },
            color:{
                color: 'gray'
            }
        });

        return(
            <View style={[Styles.flex, Styles.container]}>
                    <View style={{alignItems: 'center'}}>
                        {this.state.addShow ? <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER}/> : null}
                    </View>
                <View>
                    <Text style={[Styles.nav, Styles.textAlign]}>
                        WakeMeUp
                    </Text>
                    <Text style={[Styles.color, {textAlign: 'center'}]}>
                        Sleepy app for a sleepy people. {'\n'}
                        There u can change your options
                    </Text>
                </View>

                <Theme
                ref={(target) => this.popupRef = target}
                preset={this.props.route.params.data[0].string}
                saveFunc={() => {this.forceUpdate()}}
                />

                <View style={Styles.flex}>
                    <Option name="Point"
                        press={() => {
                            this.props.navigation.push('Point');
                        }}
                    />
                    <Option name="Theme"
                        press={() => {
                            this.popupRef.open();
                        }}
                    />                    
                </View>
            </View>
        )
    }
}

export default Options;
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackPlayer from 'react-native-track-player';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import HomeScreen from './screens/home';
import MapAlarm from './screens/Map Alarm/mapAlarm';
import OptionsStructure from './screens/Options/optionsStructure';
import bottomBar from './bottomBar/bottomBar';

import realm, { getRealmObj } from './database/database';


const Tab = createBottomTabNavigator();

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = getRealmObj("options");
    this.onRealmChange = this.onRealmChange.bind(this);
  }
  componentDidMount(){
    realm.addListener("change", this.onRealmChange);
  }
  onRealmChange(){
    this.setState(getRealmObj("test"));
  }

  render(){
    return(
      <NavigationContainer>
        <Tab.Navigator tabBar={bottomBar} >
          <Tab.Screen name="Home" component={HomeScreen}
            options={{
              headerShown: false,
            }}
            initialParams={{data: this.state}}
          />
          <Tab.Screen name="Map Alarm" component={MapAlarm}
            options={{
              headerShown: false,
            }}
            initialParams={{data: this.state}}
          />
          <Tab.Screen name="Options" component={OptionsStructure}
            options={{
              headerShown: false
            }}
            initialParams={{data: this.state}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => require('./service'));
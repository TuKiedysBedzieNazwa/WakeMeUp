import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Options from "./screens/main";
import Point from "./screens/point";

const stack = createNativeStackNavigator();

const OptionsStructure = (props) => {

    return(
        <stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                headerTransparent: true,
                title: null,
            }}
        >
            <stack.Screen name="Main"
                component={Options}
                options={{headerShown: false}}
                initialParams={props.route.params}
            />
            <stack.Screen name="Point"
                component={Point}
                initialParams={props.route.params}
            />
        </stack.Navigator>
    )
}

export default OptionsStructure;
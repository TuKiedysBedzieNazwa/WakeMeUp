import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Switch,
    SectionList,
} from "react-native";

import { changeRealmObj } from "../../database/database";

import themeCheck from "../../functions/themeCheck";

export const Option = (props) => {
    
    const Styles = StyleSheet.create(themeCheck() == 'dark' ?
    { //dark
        button:{
            flexDirection:'row',
            fontSize: 15,
            borderBottomWidth: 1,
            borderColor: '#aeaeae',
            paddingVertical: 10,
            marginHorizontal: 20,
            paddingHorizontal: 5,
            justifyContent: 'space-between'
        },
        bText:{
            color: 'white'
        },
    } : { //light
        button:{
            flexDirection:'row',
            fontSize: 15,
            borderBottomWidth: 1,
            borderColor: 'grey',
            paddingVertical: 10,
            marginHorizontal: 20,
            paddingHorizontal: 5,
            justifyContent: 'space-between'
        },
        bText:{
            color: 'black'
        },
    });

    return(
        <Pressable style={Styles.button}
        onPress={props.press}
        >
            <Text style={Styles.bText} >
                {props.name}
            </Text>
        </Pressable>
    )
    
}

export const SingleOption = (props) => {
    
    const [enabled, setEnabled] = useState(props.enabled);
    
    const Styles = StyleSheet.create(themeCheck() == 'dark' ? 
    {
        button:{
            flexDirection:'row',
            fontSize: 15,
            borderBottomWidth: 1,
            borderColor: 'grey',
            paddingVertical: 10,
            marginHorizontal: 20,
            paddingHorizontal: 5,
            justifyContent: 'space-between'
        },
        bText:{
            color: 'black'
        },
    } : {
        button:{
            flexDirection:'row',
            fontSize: 15,
            borderBottomWidth: 1,
            borderColor: 'grey',
            paddingVertical: 10,
            marginHorizontal: 20,
            paddingHorizontal: 5,
            justifyContent: 'space-between'
        },
        bText:{
            color: 'black'
        },
    });
    return(
        <View style={[Styles.button, {paddingVertical: 0}]} >
            <View style={{paddingVertical: 10}} >
                <Text style={Styles.bText} >
                    {props.name}
                </Text>
            </View>
            <Switch style={{margin: 0, padding: 0}}
                onValueChange={async () => {
                    setEnabled(prevState => !prevState);
                    props.press();

                    var object = {
                        name: props.realmName,
                        bool: !enabled,
                        _id: props._id
                    }
                    changeRealmObj("options", object);
                }}
                value={enabled}
            />
        </View>

    )
}







// cholera wie co to, kiedyś się użyje
const Multiply = () => {

    const DATA = [
        {
            title: "excalibur",
            data: ["sword", "cutting", "pizza"]
        },
        {
            title: "pizza cutter",
            data: ["roll", "tasty", "rock and roll"]
        }
    ]

    const Item = ({ title }) => (
        <View>
            <Text>{title}</Text>
        </View>
    )

    return(
        <View style={[Styles.row, Styles.border, Styles.single]}>
            <SectionList 
                sections={DATA}
                renderItem={({item}) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => ( <Text>{title}</Text> )}
            />
        </View>
    )
}
import React, { useState } from 'react';
import { 
    Text,
    Pressable,
    StyleSheet } from 'react-native';
import themeCheck from './themeCheck';

export const Button = (props) => {

    const [state, setState] = useState(false);

    const push = () => {
            if(!state){
                props.start();
                setState(true);
            }
            else{
                props.stop();
                setState(false);
            }
    }

    const Styles = StyleSheet.create(themeCheck() == 'dark' ? 
    { //dark
        pressed:{
            backgroundColor: '#101010',
        },
        unPressed:{
            backgroundColor: '#fff',
        },
        button:{
            borderRadius: 30
        },
        text:{
            textTransform: 'uppercase',
            fontSize: 17,
            letterSpacing: 5,
            fontWeight: '600',
            paddingVertical: 14,
            paddingHorizontal: 35,
        },
        color:{
            color: '#fff'
        },
        color2:{
            color: '#212121',
        }
    } : {
        pressed:{
            backgroundColor: '#fff',
        },
        unPressed:{
            backgroundColor: '#000',
        },
        button:{
            borderRadius: 30
        },
        text:{
            textTransform: 'uppercase',
            color: 'white',
            fontSize: 17,
            letterSpacing: 5,
            fontWeight: '600',
            paddingVertical: 14,
            paddingHorizontal: 35,
            
        },
        color2:{
            color: '#fff'
        },
        color:{
            color: '#000',
        }
    });

    return(
        <Pressable style={[Styles.button, state ? Styles.pressed : Styles.unPressed]} onPress={push}>
            <Text style={[Styles.text, state ? Styles.color : Styles.color2]}>
                {state ? props.name: props.uname}
            </Text>
        </Pressable>
    )
}
import React from "react";
import {
    StyleSheet,
    View,
	Text,
    Image,
    Pressable,
	Dimensions,
} from "react-native";
import themeCheck from "../functions/themeCheck";

const bottomBar = ({ state, navigation }) =>{

    const Styles = StyleSheet.create(themeCheck() == 'dark' ? 
	{
        container:{
            position: 'absolute',
            bottom: 25,
			left: 30,
			right: 30,
            height: 60,
			//width: '100%',
            flexDirection: 'row',
        },
		point:{
			width: 80,
			height: 80,
			bottom: 10,
			backgroundColor: 'white',
			borderRadius: 40,
			zIndex: 0,
		},
      	position:{
    		width: 100,
    		height: '100%',
    		borderRadius: 50,
    		zIndex: 1
    	}
    } : {
        container:{
            position: 'absolute',
            bottom: 25,
			left: 30,
			right: 30,
            height: 60,
			//width: '100%',
            flexDirection: 'row',
        },
		point:{
			width: 80,
			height: 80,
			bottom: 10,
			backgroundColor: 'black',
			borderRadius: 40,
			zIndex: 0,
		},
      	position:{
    		width: 100,
    		height: '100%',
    		borderRadius: 50,
    		zIndex: 1
    	}
	})

    return(

		<>
			<View style={
				[
					Styles.container, 
					{
						justifyContent: 'center',
						marginLeft: (Dimensions.get('window').width - 60) * 2/3 * (state.index - 1)
					}
				]
			}>

				<Image
					style={{
						height: 60,
						width: 420,
						transform:[
							{rotateY: '180deg'}
						],
					}}
					resizeMode='center'
					source={require('../icons/navbg.png')}
					tintColor={themeCheck() == 'dark' ? 'white' : 'black'}
				/>

				<View style={Styles.point}></View>

				<Image
					style={{
						height: 60,
						width: 420,
					}}
					resizeMode='center'
					source={require('../icons/navbg.png')}
					tintColor={themeCheck() == 'dark' ? 'white' : 'black'}
				/>
			</View>

			<View style={Styles.container}>
				<Pressable style={{flex: 1}}
					onPress={() => navigation.navigate('Home')}
				>
					<Image
						source={require('../icons/home.png')}
						style={{width: 'auto', height: '55%', marginTop: 13.5 }}
						resizeMode='contain'
						tintColor={themeCheck() == 'dark' ? 'black' : 'white'}
					/>
				</Pressable>
				<Pressable style={{flex: 1}}
					onPress={() => navigation.navigate('Map Alarm')}
				>
					<Image 
						source={require('../icons/map.png')}
						style={{width: 'auto', height: '55%', marginTop: 13.5}}
						resizeMode='contain'
						tintColor={themeCheck() == 'dark' ? 'black' : 'white'}
					/>
				</Pressable>
				<Pressable style={{flex: 1}}
					onPress={() => navigation.navigate('Options')}
				>
					<Image 
						source={require('../icons/options.png')}
						style={{width: 'auto', height: '55%', marginTop: 13.5}}
						resizeMode='contain'
						tintColor={themeCheck() == 'dark' ? 'black' : 'white'}
					/>
				</Pressable>
			</View>

		</>

    )
}

export default bottomBar;


/*
			<View style={Styles.container}>
				<Pressable style={Styles.singleBar}
					onPress={() => navigation.navigate('Home')}
					>
					<View style={{height: '70%'}}>
						<Image 
						source={require('../icons/home.png')}
						style={{width: 'auto', height: '100%'}}
						resizeMode='contain'
						tintColor={state.index == 0 ? 'yellow' : themeCheck() == 'dark' ? 'black' : 'white'}
						/>
					</View>
					
				</Pressable>
				<Pressable style={Styles.singleBar}
				onPress={() => navigation.navigate('Map Alarm')}
				>
					<View style={{height: '70%'}}>
						<Image 
						source={require('../icons/home.png')}
						style={{width: 'auto', height: '100%'}}
						resizeMode='contain'
						tintColor={state.index == 1 ? 'yellow' : themeCheck() == 'dark' ? 'black' : 'white'}
						/>
					</View>
				</Pressable>
				<Pressable style={Styles.singleBar}
				onPress={() => navigation.navigate('Options')}
				>
					<View style={{height: '70%'}}>
						<Image 
						source={require('../icons/options.png')}
						style={{width: 'auto', height: '100%'}}
						resizeMode='contain'
						tintColor={state.index == 2 ? 'yellow' : themeCheck() == 'dark' ? 'black' : 'white'}
						/>
					</View>
				</Pressable>
			</View>
*/
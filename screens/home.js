import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView
} from "react-native";

import themeCheck from "../functions/themeCheck";

class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this.state={
            options: this.props.route.params.data,
            change: false,
            importantMessage: 'loading...'
        }
    }

    fetchData(){
        fetch("https://raw.githubusercontent.com/TuKiedysBedzieNazwa/message/main/test.json", {mode: 'no-cors'})
            .then(res => res.json())
            .then(data => {
                this.setState({importantMessage: data.message});
            })
            .catch(() => this.setState({importantMessage: "Check your internet connection"}))
    }
    componentDidMount(){
        this.fetchData();
    }

    render(){
        const Styles = StyleSheet.create(themeCheck() == 'dark' ? 
        { // dark
            flex: {
                flex: 1
            },
            conatainer:{
                backgroundColor: '#212121'
            },
            nav:{
                color: 'white',
                textAlign: 'center',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 10,
            },
            text:{
                color: 'white',
                textAlign: 'center'
            },
            contentText:{
                marginHorizontal: 20,
                marginBottom: 10,
                color: '#aeaeae'
            },
            bold:{
                color: 'white', 
                fontWeight: '500'
            },
            informations:{
                borderWidth: 0.5,
                borderColor: 'white',
                marginHorizontal: 40,
                marginVertical: 30,
                borderRadius: 15,
                padding: 10,
            }
        } : { // light
            flex: {
                flex: 1
            },
            conatainer:{
                backgroundColor: 'white'
            },
            nav:{
                color: 'black',
                textAlign: 'center',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 10,
            },
            text:{
                color: 'black',
                textAlign: 'center'
            },
            contentText:{
                marginHorizontal: 20,
                marginBottom: 10,
                color: 'gray'
            },
            bold:{
                color: 'black', 
                fontWeight: '500'
            },
            informations:{
                borderWidth: 0.5,
                borderColor: 'black',
                marginHorizontal: 40,
                marginVertical: 30,
                borderRadius: 15,
                padding: 10,
            }
        })

        return(
            <ScrollView style={[Styles.flex, Styles.conatainer]}>
                <View style={Styles.informations}>
                    <Text style={Styles.nav}>
                        Important message:
                    </Text>
                    <Text style={[Styles.text]}>
                        {this.state.importantMessage + '\n'}
                    </Text>
                </View>
                <Text style={Styles.nav}>
                    Informations about app
                </Text>
                <Text style={Styles.contentText}>
                    - Remember to
                    <Text style={Styles.bold}>
                        {' '}agree{' '}
                    </Text>
                    app to get your{' '}
                    <Text style={Styles.bold}>
                        localization
                    </Text>, app wont work if u press deny  {'\n'}
                    - Never close your app when u go sleep {'\n'}
                    - Be sure that headphones are conected {'\n'}
                    - Be sure that place when u want wake up have gps {'\n'}
                    - Be sure that your connection is always turn on {'\n'}
                    - Be sure that u have newest version of app {'\n'}
                    - Remember to test app before u go sleep {'\n'}
                    And I think thats all, set up your point, plug your headphones and enjoy your journey ^^
                </Text>
                <Text style={Styles.nav}>
                    Report bugs
                </Text>
                <Text style={Styles.contentText}>
                    If u see any bugs or have any idea how to upgrage my app u can write on my mail:{' '}
                    <Text style={Styles.bold}>
                        wakemeatpoint@gmail.com
                    </Text>
                </Text>
            </ScrollView>
        )
    }
}

const Button = (props) => {
    
    const Styles = StyleSheet.create( themeCheck() == "dark" ?
        { //dark
            button:{
                backgroundColor: 'white',
                marginVertical: 10,
                marginHorizontal: 100,
                padding: 5            
            },
            buttonText:{
                color: '#212121'
            }
        } : { // light
            button:{
                backgroundColor: '#212121',
                marginVertical: 10,
                marginHorizontal: 100,
                padding: 5
            },
            buttonText:{
                color: 'white'
            }
        }
    )
    
    return(
        <Pressable style={Styles.button} onPress={props.onPress}>
            <Text style={Styles.buttonText}>
                {props.name}
            </Text>
        </Pressable>
    )
}

export default HomeScreen;
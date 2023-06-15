import React from "react";
import { View,
    Text,
    StyleSheet,
    Pressable
} from "react-native";
import Modal from 'react-native-modal';
import themeCheck from "../../../functions/themeCheck";

import { changeRealmObj } from "../../../database/database";

export class Theme extends React.Component {

    constructor(props){
        super(props);
        this.state={
            show: false,
            selected: this.props.preset
        }
    }

    open(){
        this.setState({show: true});
    }

    render(){
        
        const Styles = StyleSheet.create( themeCheck() == 'dark' ? 
        { //dark
            container:{
                backgroundColor: '#212121',
                width: '100%',
                maxHeight: '40%',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 15
            },
            minus:{
                backgroundColor: 'gray',
                width: '15%',
                height: 3,
                borderRadius: 10,
                marginVertical: 10
            },
            nav:{
                fontSize: 21,
                color: 'white',
                marginBottom: 10
            },
            option:{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            optionText:{
                color: 'white',
                fontSize: 15,
                marginVertical: 5
            },
            checkmark:{
                width: 25,
                height: 25,
                borderRadius: 15,
                borderWidth: 1.5,
                borderColor: 'white',
            },
            checkmarkTrue:{
                backgroundColor: '#e3e3e3',
            },
            checkmarkFalse:{
                backgroundColor: '#212121'
            },
            saveButton:{
                borderWidth: 1.5,
                borderRadius: 10,
                borderColor: '#878787',
                backgroundColor: '#212121'
            },
            saveText:{
                color: 'white',
                fontSize: 17,
                paddingVertical: 6,
                paddingHorizontal: 30
            }        
        } : {
            container:{
                backgroundColor: 'white',
                width: '100%',
                maxHeight: '40%',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 15
            },
            minus:{
                backgroundColor: 'gray',
                width: '15%',
                height: 3,
                borderRadius: 10,
                marginVertical: 10
            },
            nav:{
                fontSize: 21,
                color: 'black',
                marginBottom: 10
            },
            option:{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            optionText:{
                color: 'black',
                fontSize: 15,
                marginVertical: 5
            },
            checkmark:{
                width: 25,
                height: 25,
                borderRadius: 15,
                borderWidth: 1.5
            },
            checkmarkTrue:{
                backgroundColor: 'black',
            },
            checkmarkFalse:{
                backgroundColor: 'white'
            },
            saveButton:{
                borderWidth: 1.5,
                borderRadius: 10
            },
            saveText:{
                color: 'black',
                fontSize: 17,
                paddingVertical: 6,
                paddingHorizontal: 30
            }
        });

        return(
            <Modal 
                isVisible={this.state.show}
                swipeDirection='down'
                onSwipeComplete={() => this.setState({show: false})}
                style={{justifyContent: 'flex-end'}}
            >
                <View style={Styles.container}>
                    <View style={Styles.minus}></View>
                    <Text style={Styles.nav}>
                        Choose theme
                    </Text>
                    <View style={{width: '80%'}}>
                        <Pressable
                            style={Styles.option}
                            onPress={() => this.setState({selected: 'device'})}
                        >
                            <Text style={Styles.optionText}>
                                Device Theme
                            </Text>
                            <View 
                                style={[Styles.checkmark, this.state.selected == 'device' ? Styles.checkmarkTrue : Styles.checkmarkFalse]}
                            ></View>
                        </Pressable>
                        <Pressable
                            style={Styles.option}
                            onPress={() => this.setState({selected: 'dark'})}
                        >
                            <Text style={Styles.optionText}>
                                Dark
                            </Text>
                            <View 
                                style={[Styles.checkmark, this.state.selected == 'dark' ? Styles.checkmarkTrue : Styles.checkmarkFalse]}
                            ></View>
                        </Pressable>
                        <Pressable
                            style={Styles.option}
                            onPress={() => this.setState({selected: 'light'})}
                        >
                            <Text style={Styles.optionText}>
                                Light
                            </Text>
                            <View 
                                style={[Styles.checkmark, this.state.selected == 'light' ? Styles.checkmarkTrue : Styles.checkmarkFalse]}
                            ></View>
                        </Pressable>
                    </View>
                    <Pressable style={Styles.saveButton}
                        onPress={ async () => {
                            this.setState({show: false});
                            changeRealmObj("options", {
                                name: "theme",
                                string: this.state.selected,
                                _id: 0,
                            });
                            this.props.saveFunc();
                        }}
                    >
                        <Text style={Styles.saveText}>
                            Save
                        </Text>
                    </Pressable>
                </View>
            </Modal>
        )
    }
}
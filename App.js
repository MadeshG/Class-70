import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import{createBottomTabNavigator}from 'react-navigation-tabs'
import IssueScreen from './Screens/IssueScreen';
import SearchScreen from './Screens/searchScreen';
export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const TabNavigator=createBottomTabNavigator({
  Issue:{screen:IssueScreen},
  Search:{screen:SearchScreen}
},
{
defaultNavigationOptions:({navigation})=>({
  tabBarIcon:()=>{
    const routeName=navigation.state.routeName;
    if(routeName==="Issue"){
return(
  <Image
  source={require("./assets/book.png")}
  style={{width:40,Height:40}}

  />
)
    }

  else if(routeName==="Search"){
      return(
        <Image
        source={require("./assets/searchingbook.png")}
        style={{width:40,Height:40}}
      
        />
      )
          }
  }
})
}
)
const AppContainer=createAppContainer(TabNavigator)
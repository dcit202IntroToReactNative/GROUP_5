import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {View, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {useState, useEffect} from 'react';
import { firebase } from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header from "./components/header";
import NoteAdd from "./src/NoteAdd";
import Detail from "./src/Detail";

const Stack = createStackNavigator();

function App(){
  const [initializing, setInitializing]= useState(true); 
  const [user, setUser] = useState();


  //Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(()=> {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user){
    return(
      <Stack.Navigator>
        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerTitle: () => <Header name='Privacy Notes'/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#4169e1',
            shadowColor:'#000',
            elevation:7
          }
        }}
        />
        <Stack.Screen 
        name="Registration" 
        component={Registration}
        options={{
          headerTitle: () => <Header name='Privacy Notes'/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#4169e1',
            shadowColor:'#000',
            elevation:7
          }
        }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
              <Stack.Screen 
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <Header name='Privacy Notes'/>, 
          headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#4169e1',
            shadowColor:'#000',
            elevation:7
          }
        }}
        />
        <Stack.Screen 
        name="NoteAdd" 
        component={NoteAdd}
        options={{
          headerTitle: () => <Header name='Privacy Notes'/>, 
          headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#4169e1',
            shadowColor:'#000',
            elevation:7
          }
        }}
        />
        <Stack.Screen 
        name="Detail" 
        component={Detail}
        options={{
          headerTitle: () => <Header name='Privacy Notes'/>, 
          headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#4169e1',
            shadowColor:'#000',
            elevation:7
          }
        }}
        />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

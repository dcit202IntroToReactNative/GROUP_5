import {Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Button, Pressable} from 'react-native'
import React, {useState,useEffect} from 'react'
import {firebase} from '../config'
import { useNavigation } from '@react-navigation/native'
import {FlashList} from '@shopify/flash-list'
import { Entypo } from '@expo/vector-icons'

const Dashboard = () => {
    const  [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();



    useEffect(() =>{
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else{
                console.log('user does not exist')
            }
        })
    }, [])

    //fetching data from firestore
    useEffect(() => {   
        firebase.firestore()
        .collection('notes')
        .onSnapshot((querySnapshot) => {
            const newNotes = [];
            querySnapshot.forEach((doc) => {
                const {note, title} = doc.data();
                newNotes.push({note, title, id:doc.id})
            });
            setNotes(newNotes);
        });
    }, []);


    return(

        <SafeAreaView style={styles.container}>
            <Text style = {{fontSize:25,fontWeight:'bold', fontStyle:'italic', marginTop:-50}}>
            Welcome back, {name.firstName}
            </Text>

            <View style={{ flex: 1, width: '100%' , marginTop:50}}>
            <FlashList
            data={notes}
            numRows={1}
            estimatedItemSize={300}
            renderItem={({item}) => (
                <View style={styles.noteView}>
                    <Pressable
                    onPress={()=> navigation.navigate('Detail', {item})}
                    >
                     <Text style = {styles.noteTitle}>
                        {item.title}
                     </Text>
                     <Text style = {styles.noteDescription}>
                        {item.note}
                     </Text>
                    </Pressable>
                </View>
            )}
            />
            </View>
            <TouchableOpacity
            style = {styles.button1}
            onPress={() => navigation.navigate('NoteAdd')}
            >
                <Entypo name='plus' size={45} color='black'/>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {firebase.auth().signOut()}}
            style = {styles.button}
            >
            <Text style = {{fontSize:22,fontWeight:'bold'}}>
                    Sign Out
            </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop:100,
    },
    button:{
        marginTop:50,
        height:85,
        width:150,
        backgroundColor:'#026efd',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },
    noteView:{
        flex:1,
        margin:10,
        padding:10,
        marginTop:10,
        borderRadius:10,
        shadowColor: 'red',
        alignItems:'center'
    },
    noteTitle:{
        fontSize:20,
        fontWeight:'bold'
    },
    noteDescription:{
        fontSize:16,
        marginTop:5
    },
    button1:{
        backgroundColor:'white',
        borderRadius:50,
        padding:10,
        elevation:7
    }
})
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'

const NoteAdd = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const navigation = useNavigation();

    const handleAdd = () => {
        firebase.firestore()
        .collection('notes')
        .add({
            title, note
        })
        .then(() => {
            setTitle('')
            setNote('')
            Keyboard.dismiss(); // dismiss the keyboard

        })
        .then(() => {
            navigation.navigate('Dashboard');
        })
        .catch((error) => {
            alert(error)
        });
    }


  return (
    <View style={styles.container}>
     <TextInput
        placeholder='Title'
        value={title}
        onChangeText={(text) => setTitle(text)}
        style ={styles.inputTitle}
     />
     <TextInput
        placeholder='Note'
        value={note}
        onChangeText={(text) => setNote(text)}
        style ={styles.inputNote}
        multiline= {true}
     />
     <TouchableOpacity
     style= {styles.button}
     onPress={handleAdd}
     >
        <Text style={styles.buttonText}>
            Add
        </Text>
     </TouchableOpacity>
    </View>
  )
}

export default NoteAdd

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        borderStartColor:'#c9f5d9'
    },
    inputTitle:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:20,
        marginBottom:10,
        height:50,
        width:'97%',
        borderBottomWidth:1/2,
        borderLeftWidth:1/2,
        padding:10,

    },
    inputNote:{
        fontSize:18,
        marginTop:20,
        marginBottom:10,
        height:200,
        width:'97%',
        borderBottomWidth:1/2,
        borderLeftWidth:1/2,
        padding:10
    },
    button:{
        backgroundColor:'red',
        borderRadius:10,
        marginTop:20,
        height:55,
        width:150,
        alignItems:'center',
        justifyContent:'center',
        elevation:7,
        shadowColor:'blue'
    },

    buttonText:{
        color:'white',
        fontSize:22,
        fontWeight:'bold'
    }
})






import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'

const Registration = () => {
  const [email,setEmail] = useState('')
  const navigation = useNavigation();
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword]= useState('')
  const [firstName,setFirstName]= useState('')
  const [lastName,setLastName]= useState('')

  resgisterUser = async (email,password,firstName,lastName) =>{
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://private-notes01.firebaseapp.com',
        })
        .then(() =>{
            alert('Check your email')
        }).catch((error) => {
            alert(error.message)
        })
        .then(() => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                firstName,
                lastName,
                email,
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    })
    .catch((error => {
        alert(error.message)
    }))
  }
  return(
    <View style={styles.container}>
        <Text style={{fontWeight:'bold', fontSize:23, fontStyle:'italic'}}>
            Please Enter Details,
        </Text>
        <View style={{marginTop:40}}>
        <TextInput
         style= {styles.textInput}
         placeholder = 'First Name'
         onChangeText = {(firstName) => setFirstName(firstName)}
         autoCorrect = {false}
        />
        <TextInput
         style= {styles.textInput}
         placeholder = 'Last Name'
         onChangeText = {(lastName) => setLastName(lastName)}
         autoCorrect = {false}
        />
        <TextInput
         style= {styles.textInput}
         placeholder = 'Email'
         onChangeText = {(email) => setEmail(email)}
         autoCapitalize = "none"
         autoCorrect = {false}
         keyboardType= "email-address"
        />
        <TextInput
         style= {styles.textInput}
         placeholder = 'Password'
         onChangeText = {(password) => setPassword(password)}
         autoCapitalize = "none"
         autoCorrect = {false}
         secureTextEntry= {true}
        />
        </View>
        <TouchableOpacity
        onPress={()=> resgisterUser(email, password,firstName,lastName)}
        style={styles.button}
        >
            <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>  
        </TouchableOpacity>
        <TouchableOpacity
                    onPress = {() => navigation.navigate('Login')}
                    style = {{marginTop:20}}
                >
                    <Text style = {{fontWeight:'bold', fontSize:16}}>
                     Have an account? Login 
                        </Text>
                </TouchableOpacity>
    </View>
  )

}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop:100,
    },
    textInput: {
        paddingTop:20,
        paddingBottom:10,
        width:300,
        fontSize:20,
        borderBottomWidth:2,
        borderBottomColor:'#fff',
        marginBottom:10,
        textAlign:'center'
    },
    button:{
        marginTop:50,
        height:85,
        width:150,
        backgroundColor:'#4169e1',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})

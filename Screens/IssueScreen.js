import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { normalize } from 'yargs';
export default class IssueScreen extends React.Component{
    constructor(){
        super()
        this.state={
            haveCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookId:'',
            scannedStudentId:'',

        }
    }
    getCameraPermissions=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            haveCameraPermissions:status==='granted',
            buttonState:id,
            scanned:false
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState==="bookid"){
        this.setState({
            scanned:true,
            scannedBookId:data,
            buttonState:'normal'
        })
    }

    if(buttonState==="studentid"){
        this.setState({
            scanned:true,
            scannedStudentId:data,
            buttonState:'normal'
        })
    }
    }
    render(){
        const haveCameraPermissions=this.state.haveCameraPermissions
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState
        if(buttonState!=="normal"&& haveCameraPermissions){
            return(
            <BarCodeScanner 
            onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
            style={StyleSheet.absoluteFillObject}
            />
            )
        }
        else if(buttonState==="normal"){

        
        return(
            <View style={styles.container}>
                <View> 
                 <Image
                 source={require("../assets/booklogo.jpg")}
                 style={{width:200,height:200}}
                 />  
                 <Text style={{textAlign:'center',fontSize:30}}>
                   Willy  
                 </Text>
                 </View>
                <View style={styles.inputView}>
                <TextInput style={styles.inputBox}
                placeholder="student id"
                value={this.state.scannedStudentId}
                />
                <TouchableOpacity style={styles.scanButton}
                onPress={()=>{
                    this.getCameraPermissions("studentid")
                }}
                >
                <Text style={styles.buttonText}>scan</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.inputView}>
                <TextInput style={styles.inputBox}
                placeholder="book id"
                value={this.state.scannedBookId}
                />
                <TouchableOpacity style={styles.scanButton}
                onPress={()=>{
                  this.getCameraPermission("book id")
                }}
                >
                <Text style={styles.buttonText}>scan</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
        }
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  });

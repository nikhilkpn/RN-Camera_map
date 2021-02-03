import React,{useState} from 'react'
import { Button, StyleSheet, Text, View , Image, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState()
    const verifyPermissions = async ()=>{
        const result = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL)
        if (result.status !== 'granted'){
            Alert.alert('Permission Denied',
            'You need to accept the permission',[
                {text:'OK'}
            ])
            return false
        }
        return true
    }
    const takeImageHandler = async ()=>{
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return 
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        });
        setPickedImage(image.uri)
        props.onImageTake(image.uri)
    }
    return (
        <View style={styles.imgPicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? <Text>No image selected</Text>
                :<Image style={styles.image} source={{uri:pickedImage}}/>}
            </View>
            <Button 
                title='Take photo'
                onPress={takeImageHandler}
            />
        </View>
    )
}

export default ImgPicker

const styles = StyleSheet.create({
    imagePicker:{
        alignItems:'center'
    },
    imagePreview:{
        height:200,
        width:'100%',
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1
        
    },
    image:{
        height:'100%',
        width:'100%'
    }
})

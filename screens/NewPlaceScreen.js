import React, {useState, useEffect,useCallback} from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import {useDispatch} from 'react-redux'
import * as placesActions from '../store/places/actions'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = (props) => {
    const [title, setTitle] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()
    const titleChangeHandler = text =>{
        setTitle(text)
    }
    
    const dispatch = useDispatch();
    const savePlaceHandler = () =>{
        dispatch(placesActions.addPlace(title,selectedImage,selectedLocation))
        props.navigation.goBack();
    }

    const imageTakenHandler = imagePath =>{
        setSelectedImage(imagePath)
    }
    const locationPickedHandler = useCallback(location=>{
        setSelectedLocation(location);
    },[])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={title}
                    />
                <ImagePicker onImageTake={imageTakenHandler}/>
                <LocationPicker navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}/>
                <Button 
                    title='Save Place'
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}
NewPlaceScreen.navigationOptions = {
    headerTittle:'New Place'
}

export default NewPlaceScreen

const styles = StyleSheet.create({
    form:{
        margin:30
    },
    label:{
        fontSize:30,
        marginBottom:15
    },
    textInput:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginBottom:15,
        paddingVertical:4,
        paddingHorizontal:2
    }
})

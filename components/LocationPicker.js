import React, {useState, useEffect} from 'react'
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';


const LocationPicker = (props) => {
    const [isFetching,setIsFetching] = useState(false);
    const [pickedLocation,setPickedLocation] = useState();
    const mapPickedLocation = props.navigation.getParam('pickedLocation')
    const {onLocationPicked} = props
    useEffect(()=>{
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation)
            onLocationPicked(mapPickedLocation)
        }
    },[mapPickedLocation,onLocationPicked])
    const verifyPermissions = async ()=>{
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted'){
            Alert.alert('Permission Denied',
            'You need to accept the permission',[
                {text:'OK'}
            ])

            return false
        }
        return true
    }
    const locationHandler = async ()=>{
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return 
        }
        try {
            setIsFetching(true);
            let location = await Location.getCurrentPositionAsync({});
            setPickedLocation({
                lat:location.coords.latitude,
                lng:location.coords.longitude
            })
            props.onLocationPicked(pickedLocation)
        } catch (error) {
            console.log(error,'eeee');
            Alert('Failed to fetch location','Please try again',[{text:'OKAY'}])
        }
        setIsFetching(false)
    }
    const pickOnMapHandler = () =>{
        props.navigation.navigate('Map')
    }
    return (
        <View style={styles.locationPicker}>
            <MapPreview 
                style={styles.mapPreview} 
                location={pickedLocation}
                onPress={pickOnMapHandler}>
                {isFetching? <ActivityIndicator size='large' />:<Text>NO location selected</Text>}

            </MapPreview>
            <View style={styles.action}>
                <Button title='Get location' 
                    onPress={locationHandler}/>
                <Button title='Pick on Map' 
                    onPress={pickOnMapHandler}/>

            </View>
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    locationPicker:{
        marginBottom:15
    },
    mapPreview:{
        marginBottom:10,
        width:'100%',
        height:150,
        borderColor:'#ccc',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    action:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%'
    }
})

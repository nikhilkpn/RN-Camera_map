import React,{useState, useEffect,useCallback} from 'react'
import { StyleSheet, Text, unstable_batchedUpdates, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView,{Marker} from 'react-native-maps'

const MapScreen = (props) => {
    const initialLocation = props.navigation.getParam('initialLocation')
    const readOnly = props.navigation.getParam('readonly')
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const mapRegion = {
        latitude: initialLocation?initialLocation.lat: 37,
        longitude:initialLocation?initialLocation.lng:-122,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421,
    }
    const selectLocationHandler = event =>{
        if (readOnly){
            return
        }
        setSelectedLocation({
            lat:event.nativeEvent.coordinate.latitude,
            lng:event.nativeEvent.coordinate.longitude,
        })
    }

    const savePickedLocationHandler = useCallback(()=>{
        if (!selectedLocation){
            return
        }
        props.navigation.navigate('NewPlace',{pickedLocation:selectedLocation});
    },[selectedLocation]);
    useEffect(()=>{
        props.navigation.setParams({saveLocation:savePickedLocationHandler})
    },[savePickedLocationHandler])

    let markerCoordinate;
    if(selectedLocation){
        markerCoordinate={
            latitude:selectedLocation.lat,
            longitude:selectedLocation.lng,
        }
    }
    return (
        <MapView 
            region={mapRegion}
            onPress={selectLocationHandler}
            style={styles.map} >
               {markerCoordinate && <Marker 
                title='Picked Location'
                coordinate={markerCoordinate}></Marker>
                }
        </MapView>
    )
}
MapScreen.navigationOptions = navData =>{
    const saveLoc = navData.navigation.getParam('saveLocation')
    const readonly = navData.navigation.getParam('readonly')
    if(readonly){
        return {}
    }
    return {
        headerRight:(
            <TouchableOpacity 
                style={styles.headerButton}
                onPress={saveLoc}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    }
}

export default MapScreen

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    headerButton:{
        marginHorizontal:20
    },
    headerButtonText:{
        color:'white',
        fontSize:16
    }
})

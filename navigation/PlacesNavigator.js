import React from 'react'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlacesListScreen from '../screens/PlacesListScreen';

const PlacesNavigator  = createStackNavigator({
    Places:PlacesListScreen,
    PlaceDetail:PlaceDetailScreen,
    Map:MapScreen,
    NewPlace: NewPlaceScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'green'
        },
        headerTintColor:'white'
    }
})

export default createAppContainer(PlacesNavigator);
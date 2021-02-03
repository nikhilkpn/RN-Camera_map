import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import {useSelector,useDispatch} from 'react-redux'
import { FlatList } from 'react-native-gesture-handler';
import PlaceItem from '../components/PlaceItem';
import * as PlacesActions from '../store/places/actions'


const PlacesListScreen = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(PlacesActions.loadPlaces())
    },[dispatch])
    const places = useSelector(state=> state.places.places)
    return (
        <FlatList 
            data={places}
            keyExtractor={item=>item.id}
            renderItem={itemData=><PlaceItem 
                    image={itemData.item.imageUri}
                    address={itemData.item.address}
                    title={itemData.item.title}
                    onSelect={()=>{
                        props.navigation.navigate('PlaceDetail',{
                            placeTitle:itemData.item.title,
                            placeId:itemData.item.id,
                        })
                    }}
                />
            }
            />
    )
}

PlacesListScreen.navigationOptions = navData=>{
    return {
        headerTitle:'All Places',
        headerRight:()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item 
                title='Add place'
                iconName='md-add'
                iconSize={23}
                color='white'
                onPress={()=>{
                    navData.navigation.navigate('NewPlace')
                }}
            />
        </HeaderButtons>

    }
}

export default PlacesListScreen

const styles = StyleSheet.create({})

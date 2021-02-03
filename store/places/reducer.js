import { StackActions } from "react-navigation"
import Place from "../../models/place"
import { ADD_PLACE, SET_PLACES } from "./actions"

const initialState = {
    places:[]
}


export default (state=initialState,action) =>{
    switch(action.type){
        case SET_PLACES:
            return  {
                places:action.payload.map(place=>new Place(
                    place.id.toString(),
                    place.title,
                    place.imageUri,
                    place.address,
                    place.lat,
                    place.lng,
                ))
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id.toString(),
                action.payload.title,
                action.payload.image,
                action.payload.address,
                action.payload.coords.lat,
                action.payload.coords.lng
                )
            return {
                places:state.places.concat(newPlace)
            }
        default:
            return state
    }
}

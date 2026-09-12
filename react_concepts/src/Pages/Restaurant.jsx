import { useState } from "react";
import RestaurantAPI from '../api/Restaurant';
import Restaurants from "../Component/Restaurant";


function Restaurant() {

    const [projectValue, projetInput] = useState("");

    Restaurant().then((response) =>{
        return response.json();
    }).then ((data) =>{
        projetInput(data.project);
    }).catch((error)=>{
        console.error(error)
    })



    return (
<div>
    <div>
        <label>project:</label>
        <input 
        value={projectValue}
        onChange={(e) => projetInput(e.target.value) }
    />
    </div>
</div>
    )

}
export default Restaurant;


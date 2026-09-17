import { useState } from "react";
import RestaurantAPI from '../api/Restaurant';
import Restaurants from "../Component/Restaurant";


function Restaurant() {

    const [projectValue, projetInput] = useState("");
    const [datavalue, datainput] = useState("");
    RestaurantAPI().then((response) => {
        console.log("1",response)
        return response.json();
    }).then((data) => {
        console.log("2",data)
        projetInput(data.collection);
        datainput(data);
    }).catch((error) => {
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
    <div>
      
                <table border={2}>
                <thead>
                    <tr>
                        <th>
                        Restaurant
                        </th>
                        <th>
                        Map Location
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                     {datavalue.restaurants?.map((items)=>{
        return(
            
                    <tr>
                        <td>
                            {items.restaurantname}
                        </td>
                    
                    
                        <td>
                           {items.restaurantMapUrl} 
                        </td>
                    </tr>
                       
            
        )
       })}
                </tbody>
                </table>
               
            
    </div>
</div>
    )

}
export default Restaurant;


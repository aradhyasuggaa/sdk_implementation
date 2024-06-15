"use client"

 import { Weather } from "./weather";

 export const WeatherComponent = ({weather} : {weather: Weather}) => {
   
    return (
        <div className="bg-neutral-100 p-4 rounded-md m-4 max-w-prose flex items-center justify-between">
            <p>"temperature": {weather.temperature}</p>
            <p>"humidity": {weather.humidity}</p>
            <p>"forcast": {weather.forcast}</p>

            
        </div>
        
    )
 }
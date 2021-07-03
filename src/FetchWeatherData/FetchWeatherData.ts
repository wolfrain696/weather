import axios from "axios";

const API_key = '5a04eff77561159d05f1aea8bbb0714c'
export const FetchWeatherData = async (cityName:string, lang:any) =>{
  const response =  await  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${API_key}`)
  return response.data
}
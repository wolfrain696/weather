import wStyle from './Weather.module.css'
import {useState} from "react";
import {FetchWeatherData} from "../../FetchWeatherData/FetchWeatherData";


export const Weather = () => {
    interface weatherTypeData {
        name?: string
        temp?: number
        main?: any
        sys?: any
        country?: string
        description?: string
        weather?: any
    }

    let [city, setCity] = useState('')
    let [weatherData, setWeatherData] = useState<weatherTypeData>({})
    let [lang, setLang] = useState('ru')
    let [error, setError] = useState(false)

    const dateBuilder = (d: any) => {
        let monthsRu = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let month = lang === 'ru' ? monthsRu[d.getMonth()] : monthsEn[d.getMonth()];
        let year = d.getFullYear()
        let day = d.getDate()

        return `${day} ${month} ${year}`
    }

    const changeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(city = event.target.value)
     }
    const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLang(lang = e.target.value)
    }
    const submitWeather = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            FetchWeatherData(city.trim(), lang).then(response => setWeatherData({...response}))
                .then(() => setCity(city = ''))
                .then(() => setError(error = false))
                .catch(() => setError(error = true))
        }
    }

    return (
        <div
            className={weatherData.name && weatherData.main.temp > 283 ? wStyle.weather + ' ' + wStyle.warm : wStyle.weather}>
            <div>
                <div className={wStyle.search_box}>
                    <input className={wStyle.search_bar} type="text" value={city} onChange={changeCity}
                           onKeyUp={submitWeather} placeholder={'Search...'}/>
                    <select onChange={changeLang} className={wStyle.select_bar}>
                        <option value="ru">Ru</option>
                        <option value="en">En</option>
                    </select>
                </div>
                {error ? <div className={wStyle.error}>City not found</div> : null}
                {weatherData.name ?
                    <div className={wStyle.weather_data}>
                        <h2 className={wStyle.location}>{weatherData.name}, {weatherData.sys.country} </h2>
                        <div>
                            <p className={wStyle.date}>{dateBuilder(new Date())}</p>
                        </div>
                        <div className={wStyle.weather_box}>
                            <p className={wStyle.temp}>
                                {Math.round(weatherData.main.temp - 273)}°C
                            </p>
                            <p className={wStyle.weather_disc}>{weatherData.weather[0].description}</p>
                        </div>

                    </div>
                    : null
                }
            </div>
        </div>
    );
};


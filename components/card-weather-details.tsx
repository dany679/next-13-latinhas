import { getDayData } from "@/utils/date";
import ButtonClose from "./button-close";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface WeatherDetailsProps {
  data: {
    current?: {
      is_day: number;
      wind_kph: number;
      humidity: number;
      wind_dir: string;
      pressure_mb: number;
      feelslike_c: number;
      temp_c: number;
      vis_km: number;
    };
    location: {
      country: string;
      region: string;
      name: string;
    };
    forecast: {
      forecastday: {
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          avghumidity: number;
          daily_chance_of_rain: number;
        };
        date: string;
        astro: {
          sunrise: string;
          sunset: string;
          moonset: string;
        };
      }[];
    };
  };
  handleCloseButton: () => void;
}

const CardWeatherDetails = ({
  data,
  handleCloseButton,
}: WeatherDetailsProps) => {
  if (!data.current) {
    return null;
  }

  return (
    <Card className="bg-sky-500/100  border-none text-white">
      <ButtonClose onClick={handleCloseButton} />
      <CardHeader>
        <CardTitle className="flex items-center  pb-2 w-full justify-between ">
          {data.location && (
            <div className="align-start">
              <p className="text-lg">{data.location.name}</p>
              <p className="text-zinc-100 text-sm">{data.location.region}</p>
              <p className="text-zinc-200 text-sm">{data.location.country}</p>
            </div>
          )}
          <div className="w-full">
            <h4 className="text-sm  text-center">
              {data.forecast &&
                getDayData({
                  date: data.forecast.forecastday[0].date,
                  dayIndexNumber: data.current.is_day,
                })}
            </h4>
            <h4 className="text-2xl text-center">{data.current.temp_c}°</h4>
            <h5 className="text-sm  text-center">
              Sesação: {data.current.feelslike_c}°
            </h5>
            <h5 className="text-sm  text-center">
              Umidade: {data.current.humidity}%
            </h5>
          </div>
          <div className="whitespace-nowrap capitalize">
            <p className="text-sm ">
              vento:{"  "} {data.current.wind_kph} km/s
            </p>
            <p className="text-sm ">
              chuva: {data.forecast?.forecastday[0]?.day.daily_chance_of_rain}%
            </p>
            <p className="text-sm ">
              alvorada: {data.forecast?.forecastday[0]?.astro.sunrise}
            </p>
            <p className="text-sm ">
              crepúsculo: {data.forecast?.forecastday[0]?.astro.moonset}
            </p>
          </div>
        </CardTitle>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 text-center italic font-bold">
          {data?.forecast?.forecastday.map((forestcast, index) => {
            if (index === 0) {
              return null;
            }
            const today = forestcast.day;
            return (
              <div
                key={index}
                className="flex flex-col bg-white/50  p-4 items-center justify-center gap-1 rounded-xl"
              >
                <h5>
                  {getDayData({
                    date: forestcast.date,
                    dayIndexNumber: index,
                  })}
                </h5>

                {/* <p>Maxima: {today.maxtemp_c}</p>
                <p>Minima: {today.mintemp_c}</p> */}
                <p>
                  {today.maxtemp_c}° / {today.mintemp_c}°
                </p>
                <p>Umidade: {today.avghumidity}%</p>
                <p>chuva: {today.daily_chance_of_rain}%</p>
              </div>
            );
          })}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CardWeatherDetails;

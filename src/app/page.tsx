"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { getWeatheData } from "./actions";
import { useState } from "react";
import { WeatherData } from "./types/weathe";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Thermometer, Wind } from "lucide-react";
import { motion } from "framer-motion";
export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const handleSearch = async (formData: FormData) => {
    setError("");
    const city = formData.get("city") as string;
    const { data, error: weatheError } = await getWeatheData(city);

    if (weatheError) {
      setError(weatheError);
      setWeather(null);
    }

    if (data) {
      setWeather(data);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 p-4 flex items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <Card className="bg-white/50 backdrop-blur-3xl">
            <CardContent className="text-center p-6">
              <div className=" text-5xl">Weathe-App</div>
              <div className="pt-5 text-sm">*国から村まで検索できるよぉ</div>
              <div className=" text-sm">
                *〇〇県〇〇市じゃなくて〇〇市だけじゃないとえらーになるよぉ
              </div>
              <div className="pt-5 text-sm">*成功例：〇〇県</div>
              <div className="text-sm">*成功例：〇〇市</div>
              <div className="text-sm">*失敗例：〇〇県〇〇市</div>
            </CardContent>
          </Card>
          <form action={handleSearch} className="flex gap-2">
            <Input
              name="city"
              type="text"
              placeholder="検索"
              className="bg-white/100"
              required
            />
            <SubmitButton />
          </form>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-red-200 bg-red-500/20 rounded-md p-2"
            >
              {error}
            </motion.div>
          )}

          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-white/50 backdrop-blur-3xl">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <motion.h2
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold"
                    >
                      {weather.name}
                    </motion.h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <motion.img
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        width={80}
                        height={80}
                      />
                      <div className="text-3xl font-bold">
                        {Math.round(weather.main.temp)}°C
                      </div>
                    </div>
                    <motion.div className="text-gray-600 mt-1 capitalize">
                      {weather.weather[0].description}
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <Thermometer className="w-10 h-10 mx-auto text-orange-400" />
                      <div className="mt-2 text-sm text-gray-700">体感温度</div>
                      <div className="font-semibold">
                        {Math.round(weather.main.feels_like)}°C
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <Droplets className="w-10 h-10 mx-auto text-blue-400" />
                      <div className="mt-2 text-sm text-gray-700"> 湿気</div>
                      <div className="font-semibold">
                        {Math.round(weather.main.humidity)}%
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <Wind className="w-10 h-10 mx-auto text-teal-400" />
                      <div className="mt-2 text-sm text-gray-700">風速</div>
                      <div className="font-semibold">
                        {Math.round(weather.wind.speed)}m/s
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

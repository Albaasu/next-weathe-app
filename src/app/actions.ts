"use server";

import { WeatherDataSchema } from "@/schem/weathe";
import { WeatherData } from "./types/weathe";
import { z } from "zod";

export async function getWeatheData(city: string): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (!city.trim()) {
      return { error: "city name is required" };
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ja&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    if (!res.ok) {
      throw new Error("検索結果が見つかりません");
    }

    const rowData = await res.json();
    const data = WeatherDataSchema.safeParse(rowData);

    if (!data.success) {
      return { error: "Invalid weather data structure" };
    }

    return { data: data.data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid weather data recived" };
    }
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch weather data",
    };
  }
}

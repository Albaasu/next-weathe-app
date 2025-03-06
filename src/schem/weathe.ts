import { z } from "zod";

export const WeatherDataSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
});

export type WeatherData = z.infer<typeof WeatherDataSchema>;

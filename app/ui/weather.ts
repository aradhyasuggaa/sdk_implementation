import { DeepPartial
 } from "ai";
 import {z} from "zod";

 export const weatherSchema= z.object({
    temperature: z.string().describe("the current temperature of that city using the mentioned unit"),
    humidity: z.string().describe("the humidity of the city"),
    forcast: z.string().describe("the weather forcast of that city"),
 });
 export type Weather = DeepPartial<typeof weatherSchema>;
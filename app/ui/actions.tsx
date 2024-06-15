import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";
import { z } from "zod";
import { weatherSchema } from "./weather";
import { WeatherComponent } from "./weather-component";
import {nanoid} from "nanoid"

export interface ServerMessage {
    role: "user" | "assistant";
    content: string;
  }

export interface ClientMessage{
    id: string;
    role: "user" | "assistant";
    display: ReactNode; 
}

export async function continueConversation(
    input: string,
): Promise<ClientMessage> {
    "use server";
    const history = getMutableAIState();
    const result = await streamUI({
        model: openai("gpt-4o"),
        messages: [...history.get(), { role: "user", content: input}],
        text: ({content, done}) => {
            if(done) {
                history.done((messages: ServerMessage[])=> [
                    ...messages,
                    { role: "assistant", content},
                ]);

            }
            return <div>{content}</div>

        },
    
tools: {
    getWeather: {
      description: 'Get the weather for a location',
      parameters: z.object({
        city: z.string().describe('The city to get the weather for'),
        unit: z
          .enum(['C', 'F'])
          .describe('The unit to display the temperature in')
      }),
      generate: async function*({ city, unit }) {
        const weather = await generateObject({ 
            model: openai("gpt-4o"),
            schema: weatherSchema,
            prompt:
            "Generate a weather report of the following city using the following unit:"+
            [city,
            unit]
         });

        
          return <WeatherComponent weather={weather.object} />;
        
      },
    },
},
});
return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
};
}


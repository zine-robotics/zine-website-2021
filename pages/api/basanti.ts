import type { NextApiRequest, NextApiResponse } from 'next'
import { askChatBot } from '../../apis/chat/chat'
import { RequestData, ResponseData } from '../../apis/chat/types'
   
// pages/api/prompt.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { prompt, session }: RequestData = req.body;
  
      // Check if the required fields are present
      if (!prompt || !session) {
        return res.status(400).json({ error: 'Missing required fields: prompt and session' });
      }

      askChatBot({prompt, session}).then((response: ResponseData) => {
        res.status(200).json(response)
      }).catch((error) => {
        res.status(500).json({error: 'Internal server error'})
      })
      // Here you can handle the data, e.g., send it to a database, an external API, or perform other operations.
  
      // Example response
    } else {
      // Handle any other HTTP method (e.g., GET, PUT)
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
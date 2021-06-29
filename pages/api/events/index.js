// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


// This is running server side so we can use common JS syntax

const {events} = require('./data.json')

export default function handler(req, res) {
  if(req.method === 'GET') {
    res.status(200).json(events)
  } else {
    // If I make this request from postman, whatever method I use GET, POST, PUT .... I will get the same response so we can correct that with this :
    // Only GET is allowed
    res.setHeader('Allow', ['GET'])
    // If you use any method other than GET you will get an error msg
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}

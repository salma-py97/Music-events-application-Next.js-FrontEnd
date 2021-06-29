// [slug].js so we can access api/events/slug (the details of a specific event)



// This is running server side so we can use common JS syntax
const {events} = require('./data.json')

export default function handler(req, res) {

  // if the specific event's slug is equal to the requested slug
  const evt = events.filter(ev => ev.slug === req.query.slug) 

  // it's gonna return an array (filter() return an array)with an object with the event details
  // console.log(evt)
  // console.log("THIS IS THE EVENT SLUG", evt[0].slug)
  
  if(req.method === 'GET') {
    res.status(200).json(evt)

  } else {
    // If I make this request from postman, whatever method I use GET, POST, PUT .... I will get the same response so we can correct that with this :
    // Only Get is allowed
    res.setHeader('Allow', ['GET'])
    // If you use any method other than GET you will get an error msg
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}

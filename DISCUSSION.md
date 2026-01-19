# Discussion
This was a lot of fun! Thank you in advance for your consideration.
I'm going to use this as a chance to outline my thoughts and things I would improve or add given more time.

## Backend
PR - https://github.com/Parmentrout/solace-health-exercise/pull/1

**High Level**
- I got the database spun up locally with docker-compose and seeded
- I added filtering and pagination to the query and adjusted the query to take those in as optional parameters.
- Adjusted the datasource to fix the typing bug.
- Tried to separate the controller layer from the database layer for better testing.

**A couple suggestions / improvements** 
- We are missing some indexes in the database for the filtering. I would recommend we add some on all searchable fields.
- Drizzle took a second to understand but I believe I got the query syntax correct. Ideally I'd like to dive deeper into the framework before trusting my query with production data and see the generated SQL.
- I would suggest a DI framework like TypeDI mixed with TypeORM as it might make unit testing a little easier.
- I added a Jest configuration to start working on unit tests, but would also recommend an in-memory server like `pgmem` to run full integration tests.
- I added a Prettier configuration but figure this would be a team discussion about the specific standards.
- I would probably add some tests specific to cross site scripting since I don't know how drizzle handles data sanitation behind the scenes.

## Front End
PR - https://github.com/Parmentrout/solace-health-exercise/pull/2

**High Level**
- I removed the HTML table and replaced it with a flexbox
- I connected the new backend endpoint to the UI for search and filter
- I added some tailwind styles to make it look more polished

**A couple suggestions / improvements**

I ran out of time on the UI side but things I would improve with a couple more hours:
- The header is jumping around, it needs to stay locked on the screen.
- This isn't optimized well enough for mobile, would be a good design discussion with the UX team to see what would look good here.
- There isn't any error handling yet, but I would add it to the fetch calls. I didn't because I would want to add a new route `/error` page that could be re-used.
- I would split up the rows into separate components. For now I kept them inline for readability, but given more time I think we could split all of these (like search) into individual components that could be re-used.
- A caching layer over fetch would help with performance, especially if the underlying advocate data doesn't change very often. 
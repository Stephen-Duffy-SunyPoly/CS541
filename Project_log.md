# CS 541 Project Log
### By: Stephen Duffy

# Project Proposal
- This project will create a collaborative whiteboard program
- The data for what is on the whiteboard will be stored inside a mongo database
- The application will be implemented as a web app with the backed written in JavaScript
- The project can be found at the following repository: [link](https://github.com/Stephen-Duffy-SunyPoly/CS541_project)

---

## Week 1 (8/30/2026 - 9/5/2026)
- Made this page

## Week 2 (9/6/2026 - 9/12/2026)
Begin looking into project ideas
- something using mongo DB sins there could be class resources for that 
- Geographic search system
- graph database relation searching

## Week 3 (9/13/2026 - 9/19/2026)
Start to narrow down the general idea of what the project is going to be.  
The general idea I am aiming for right now is: A useful, moderately sophisticated application with MongoDB as the backend where MongoDB's document model makes the application easier to develop.  
Some project ideas:
- Research note/document management system 
- Software Development Project tracker. (Road maps, issue trackers, milestones, ect...)
- Home management / inventory system (simulate various smart hone devices)
- Collaborative whiteboard system 

## Week 4 (9/20/2026 - 9/26/2026)
Started to play around with mongo DB to get a feel for what it can do and how to use it.  
[notes](mongoNotes.html)

## Week 5 (9/27/2026 - 10/3/2026)
Narrow down project ideas and start to think about how the schema can be architected.
- Software Development Project tracker
  - Each project can contain various types of pages
  - roadmaps that contain various item that can be marked as done or in progress
  - Issue tracker that contains a list of problems people have as well as status like fixed, no issue, unverified, ect.
  - General milestones listed out.
  - an issue can automatically create a linked entry on the road map
- Collaborative whiteboard system 
  - Each record can represent a specific canvas
  - each canvas contains a list of shape object
  - shape object may include colors, styles, sizes or a list of sub shape
  - shape can also have user attribution 

## Week 6 (10/4/2026 - 10/10/2026)
Decided on the project: Interactive / collaborative whiteboard
- This project will store data in a mongo database
- This project will be a web app where the back end will be written in JavaScript
- The front end of this project will be developed using a combination of raw HTML and JavaScript with a canvas drawing libray to make rendering much eazyer.

## Week 7 (10/11/2026 - 10/17/2026)
Start to nail down the component that are to be used in this project:
- Backend: Express.js
- Frontend: fabric js for canvas drawing. This library seems to have a lot of built-in user shape manipulation tools, this should make it much easier to implement the whiteboard mechanisms.

## Week 8 (10/18/2026 - 10/24/2026)
Create proposal  
Make the basic webserver that connects to the database

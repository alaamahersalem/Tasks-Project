
# Programming Challenge
 programming challenge for frontend

# Editing and adding tasks through Dashboard

In this Project There is no authentication , The user can  manage his tasks by arranged it in it's category  and filter tasks by Priorites and by seraching with task name. In each category the isuer can add tasks and edit it .
For each task the can break it down to sub tasks ,each sub task has name and can mark it as done or not done yet .


Each manipulation in task or sub task is stored in json file by json-server.
 

## Getting Started

These instructions to run the project 
- Open Project folder and  run the command 
```
npm install
```
```
npm run start
```
- Open the folder the navigate to /Data folder then the command 
```
  json-server --watch db.json --port 4000
```

## File Structure
 
```bash
├── src
│   ├── componants
│   │   ├── Categories               #that render the categories tabs
│   │   ├── EmptyState
│   │   ├── ErrorPage                # handle error page
│   │   ├── Tasks
|   |   |   ├── EditAndCreateTask     #form to Edit and Create Tasks
|   |   |   ├── SubTsks               #render SubTasks
|   |   |   ├── TaskItem              #render single Task Item
|   |   |   ├── index.js
│   ├── Container
|   |   ├── Context     #has the Context Object that is shared between the componants 
|   |   ├── Filter.jsx  #has the filter section in the header to filter the tasks 
|   |   ├── index.jsx   #has the structure o filters , categories and tasks
|   |   ├── **/*.scss
│   ├── Services
|   |    ├── api.js     #has all the Api Urls
|   |    ├── index.js   #has the API calls 
│   ├── styles
|   |    ├── index.scss   #Contains the global Variables 
│   ├── App.scss
|   ├── App.jsx
|   ├── index.jsx
│   ├── route
│   └── serciceworker.js
├── Data
|    ├── db.json
├── node_modules
├── route
├── README.md
├── package.json
└── .gitignore
```

### Prerequisites

What things you need to install the project :
- Be connected to the network because the "fontawsome package"is the Online one .
- Install json-server globally in your machine 

## Authors

* **Alaa Salem** - *Initial work* - [PurpleBooth](https://github.com/alaamahersalem)


# Gipher - A Case Study

## Problem Statement

Build a system to manage and recommend GIFs to a user. Refer https://giphy.com/

## Requirements:

1. The application needs to fetch gifs from https://developers.giphy.com/docs/ and needs to store the data in Gipher

2. A frontend where the user can **view**, **bookmark** and add gifs to the favorites collection.
  - On launching the application the user should get the login page. The login page should have a link for registration using which the user should be able to register. On successful registration the user should be taken to the login page. Upon login, the user should be taken to the home page.
  - Proper navigation links for all the pages should be available within pages.
  - Error handling should be implemented across pages. Appropriate messages should be    displayed for the same. Success messages should be displayed for the User Registration.
  - Logout feature should be implemented.
  - User can view, bookmark and add gid to the favorites 

## Modules:

### GipherUI
  - User should be able to
    - search GIFs
    - bookmark GIFs
    - should be able to see bookmarked GIFs and Favorites created by him
  - Application should be a **responsive** which can smoothly run on mobile devices.
  - UI should be appealing and user friendly.

### AccountManager
  - Should be able to manage user accounts

### GipherManager - Application should be able to store all his
  - bookmarks
  - searches

## Tech Stack

- Spring Boot
- MySQL
- Angular
- CI (Gitlab Runner)
- Docker, Docker Compose

## Flow of Modules

### Building Gipher Frontend :
  1. Building Responsive Views:
    1. Build a View to show all GIF’s
      1. GIF’s - Populating from external api
      2. Build a view to show all the gifs
      3. A view to authenticate users
  2. Using Services to populate these data in views
  3. Stitching these views using Routes and Guards
  4. Making the UI Responsive
  5. Unit Tests should be created for the Components and Services
  6. E2E scripts using protractor should be created for the functional flows
  7. Implement CI - continuous Integration ( use .gitlab-ci.yml)
  8. Dockerize the frontend (create dockerfile, docker-compose.yml and get it executed through docker compose)

### Note: FrontEnd and all the backend services should be dockerized and run through docker-compose

### Building the Gipher Account Manager
  1. Creating a server in Spring Boot to facilitate user registration and login with MySQL as backend. Upon login, JWT token has to be generated. It has to be used in the Filters set in other services.
  2. Writing swagger documentation
  3. Unit Testing of the entire code which involves the positive and negative scenarios
  4. Implement continuous Integration CI ( use .gitlab-ci.yml)
  5. Dockerize the Gipher AccountManager servie (create dockerfile, docker-compose.yml and get it executed through docker compose)


### Building the Gipher Manager
  1. Creating a server in Spring Boot to facilitate CRUD operation over GIFs and bookmarked resources stored in MySQL. JWT Filter should be applied for all the API calls of the favourite service. JWT token should be used to authorize the user access to all the resources.
  2. Writing Swagger Documentation
  3. Write Unit Test Cases and get it executed.
  4. Implement CI - continuous Integration ( use .gitlab-ci.yml)
  5. Dockerize the Favourite Service(create dockerfile and update the docker-compose.yml)

### Demonstrate the entire application
    1. Make sure all the functionalities are implemented
    2. Make sure both the UI (Component and Services) and server side (For all layers) codes are unit tested. 
    3. All the Services are up and running using docker (Dockercompose should be used for running them)
    4. E2E tests should be executed and shown
    5. Application is completely responsive in nature
# Choice.ly

A web application for people that need help deciding where to eat.

I built this application because I often find myself in a group of friends and we are all very indecisive on where to eat. This application lets you view certain restaurants that you might be interested in, favorite them onto a favorites list, and then have a randomizer select a random restaurant among your favorited restaurants for you.

[Live Demo](https://choice-ly.herokuapp.com/#)

### Selecting a food category that you're interested in
![categories](https://user-images.githubusercontent.com/80491609/136467672-0e033db5-5c6e-418d-8df3-d1fc536ddeaf.gif)
### Viewing the details of a restaurant you're interested in
![details](https://user-images.githubusercontent.com/80491609/136467805-5c4f2491-eebb-423c-ab8b-0fe068ac6137.gif)
### Favoriting a restaurant and viewing your favorited list
![favorite](https://user-images.githubusercontent.com/80491609/136467859-9a0f3918-c14a-48b8-ae5d-95c17c5e6404.gif)
### Randomizer
![randomize](https://user-images.githubusercontent.com/80491609/136467939-1841ee32-2fa9-4043-acad-e3b2078f413b.gif)

## Technologies

* HTML5
* CSS3
* JavaScript
* React
* Fetch
* Node
* Express
* PostgreSQL
* DbDesigner
* Webpack
* Babel
* Yelp API
* Heroku

## Features

- User can choose from a set of several different categories for what type of food they’re interested in
- User can view a list of restaurants by location
- User can view the details of a restaurant
- User can add a restaurant to their favorites list
- User can delete a restaurant from their favorites list
- User can open an app drawer that will let them see their randomizer list or go back to the home menu with food categories
- User can get a random restaurant from their favorites list

## Future Features

- User can sign up
- User can sign in

## Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:daniel-sj-hong/choice.ly.git
    cd choice.ly
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Create a new database.

    ```shell
    createdb choicely
    ```

1. Import the provided schema.sql and data.sql from the command line.

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```

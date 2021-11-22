# Rails (Working Title)

This is a work in progress puzzle game written just for fun in Javascript ES6 using the Phaser game library.

## Origin Story

30 years ago my father invented a puzzle game similar to a Rubik's cube.  The objective of the game was to sort a collection of coins into a pattern by sliding two rails.

He made a prototype from metal, perspex and some old copper pennies.  It weighed a metric tonne!

This project is a surprise Christmas present for my Dad.  I am going to create a web and mobile version of the puzzle and then publish it to itch.io, and the Apple/Android stores.

## Run the Game

You can run the game using npm:

```
npm run app
```
Then open up your browser and go to http://localhost:8080/

The game is incomplete but you can play the first level.  The game board will shuffle itself and then you can use the cursor keys to rotate the rails and get the four corners matching up with the same colour.


## 22nd November Update
### Work Done
I've committed the initial source code to Github, this includes the main gameplay mechanics and a couple of test levels.  

Another large piece of work included in the first commit worth mentioning is the scaling of the game when played on different screen sizes.  I still need to investigate how it will look on actual physical devices once you take into account screen DPIs but I think the scaling is there.

### Todo List
I am now working on the supporting screens that make this feel like a game such as level instructions, options and transitions between these screens.

I will then add some more levels and try to make it 'fun'.  I'm planning an achievement system, and If I have time I'd like to add a character animation version of my dad who reacts to the player's actions.


The last big technical challenge will be configuring Webpack/Cordova and Ionic to create the App versions.

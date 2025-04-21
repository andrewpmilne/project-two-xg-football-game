# project-two-xg-football-game #

![football image](readme-resources/football.jpg)

## Code Institute Diploma In Full Stack Development - JavaScript unit ##

The XG football game website has been designed for two purposes. Firstly, to educate and inform about the concept of Expected Goals in football matches. It does this through an explanation on the rules page and through playing the game itself. Secondly, to entertain football fans and computer game fans with a fun, luck-based football simulation.

Click [this link](https://andrewpmilne.github.io/project-two-xg-football-game/) to visit the deployed version of the website. 

![XG football game at different screen sizes](readme-resources/screensizes-screenshot.png)

## User Stories ##

### Must Have ### 
![Must have first User Story](readme-resources/must-have-one.png)

![Must have second User Story](readme-resources/must-have-two.png)

### Should Have ###
![Should have User Story](readme-resources/should-have.png)

### Could Have ### 
![Could have User Story](readme-resources/could-have.png)

All the Must Have and Should Have User Stories were fully completed with all features included. Elements of the Could Have Story were completed. The game does use a modal to give you a score at the end to make competition with yourself possible in the game. This could easily be screenshotted and shared with friends to make competition amongst other people possible. Creating a more advanced leaderboard would be a further feature to extend this website in the future. 

## Features ##
This website includes a number of features to reach the aims of teaching about XG and providing an enjoyable gaming experience.

### Navbar and Footer ###
The navbar is simple to avoid distracting from the game itself. As a result, it did not need to have a dropdown menu. It does include:
- A Title (Football XG Game)
- A sound button to toggle sound on and off
- A link to go to the game page
- A link to go to the rules page

![Navbar Screenshot](readme-resources/navbar-screenshot.png)

The footer is also kept simple for the same reasons. It includes: 
 - A Title (Football XG Game)
 - Copywrite information
 - A link to the author's GitHub page

![Footer Screenshot](readme-resources/footer-screenshot.png)

### Welcome Modal ###
The welcome modal appears when the website is loaded <strong> for the first time </strong>. This is necessary as it would be annoying if it appeared every time the game was loaded (or, for example, when returning from the rules page). It gives a brief outline of the game to entice users. It gives the option of navigating straight to the game or to go to the rules page for more information. It also encourages users to turn the sound on as this aids overall user experience when playing.

![Welcome Modal Screenshot](readme-resources/welcome-modal-screenshot.png)

### Rules Page ###
The rules page gives the user more information about XG as well as explaining the rules of the game. This page is kept simple to ensure users can gain the infomation they need as quickly as they can before experiencing the game itself.

![Rules Page Screenshot](readme-resources/rules-screenshot.png)

### Information Section ###
This section was included on the top left of the screen as it is the key information players need to know when playing the game, particularly the number of goals they have scored and the time remaining so thy know how long they have left. The statistics update as the game is being played. 

![Information Screenshot](readme-resources/information-screenshot.png)

### Buttons ###
The buttons appear at the top in the middle on larger screens, but appear at the bottom (below the pitch) on smaller screens. This is because when holding a device such as a phone and being required to tap buttons, you do not want your hand to cover important information on the screen. The game buttons are grey at points in the game when they are disabled. When they are enabled, they appear green and a cursor hovering over them will change to the 'pointer' symbol. 

The start button changes message once a game has begun so that a player is aware that they will be restarting a game if they click on it. An alert also appears at this stage to ensure the player genuinely means to restart their game and lose their current score.

![Disabled Buttons Screenshot](readme-resources/disabled-buttons-screenshot.png)

![Enabled Buttons Screenshot](readme-resources/enabled-buttons-screenshot.png)

![Alert confirmation Screenshot](readme-resources/restart-alert-screenshot.png)

### Commentary ###
The commentary section was added towards the end of the project to aid user experience and make the movement of the ball in the game clearer, particularly for users not playing with sound on (where goals are indicated by crowd noise). The commentary changes depending on the button that has been pressed and the result that has occured.

![Successful pass screenshot](readme-resources/commentary-screenshot-one.png)

![Interception Screenshot](readme-resources/commentary-screenshot-two.png)

![Goal Screenshot](readme-resources/commentary-screenshot-three.png)

### Pitch Image / Play Area ###
The pitch and football are images that represent the main play area of the game. Tailwind classes and CSS Flexbox is used to position them accurately. JavaScript and CSS transitions are used to move the ball across the screen when required.

![Ball at Start of Pitch Screenshot](readme-resources/pitch-screenshot-one.png)

![Ball in middle of Pitch SCreenshot](readme-resources/pitch-screeshot-two.png)

### Sounds ###
Sound effects are a significant feature of the website as they aid the user experience by making it seem more realistically like a football match. As is best practice and industry standard, the sound is muted by default when the website first loads. The welcome modal encourages users to switch it on. The crowd noise, referee's whistle to signify the start and end of the game and cheers/ gasps add to the experience as well as making the gameplay clearer to users. 

### End Game Modal ###
JavaScript is used to ensure the game and modal appears at the end of the game. It is used to inform the user of their goals total (thus creating a competitive element to add to the experience) and give them the option of playing again or reading the rules. Correct pluralisation occurs depending on if 1 goal or multiple goals are scored.

![Game End Modal Screenshot](readme-resources/game-end-modal-screenshot.png)

### Features left to Implement ###
The website could benefit from a number of future features. 
- A leaderboard would be a very good feature to aid competitive play and is the final part of the 'Could Have' User Story.
- More sounds could be incorporated, such as crowd groaning when a move results in the ball returning to the start or more dramatic cheers if a goal has been scored from a greater distance.

## Design ##

## Testing ##

## Bugs ##
A number of bugs occured throughout the creation of this project:
- Linking Tailwind to the deployed version of this website did not work for a long time, and the issue did not occur in the live preview version. This period is reflected in a number of commits referring to changing the href as it was thought this was the issue. The bug was fixed when it was noticed that in GitHub (but not in VS Code) the JavaSCript folder name was incorrectly in uppercase lettering. This had previously been corrected in VS Code but had not automatically updated in GitHub. Once this was corrected, Tailwind worked as expected.
- A number of issues occured related to the sound effects in the website.
  - Initially, sound was continuing even if the screen was minimised. This was corrected in the JavaSCript code.
  - After this, the crowd sound would continue after the game had finished if the screen had been minimised at some point. This was corrected by ending the sound in the gameEndModal function.
  - Finally, as the crowd noise is continuous throughout the game it was not toggling on or off if the sound button was pressed mid-game. This was corrected by coding a loop the repeatedly checked if the sound button had been toggled to on or off. 

## Validation ##

## Deployment ##

## Technologies Used ##

## Credits ##
<a href="https://www.flaticon.com/free-icons/soccer" title="soccer icons">Soccer icons created by mavadee - Flaticon</a>
s
## Thanks ##





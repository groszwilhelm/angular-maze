# Maze Game starter

program the starting point for a small game, where an hero character moves around in a small maze like you see in this image by pressing the arrow/cursor keys

![maze game movement example](./images/maze-animated.gif)

please provide a project that follows these requirements

1. the project should show a board with the first map in the `boardConfig` the other maps can be used at a later stage
    - the board consists of tiles
    - every `-` is shown as an empty tile (whitish background)
    - every `b` is shown as a blocked tile e.g. a wall (dark or black background)
    - every `e` is shown as an exit (possibly to the next map at a later stage) every exit is shown with the ![door image](./images/door.png) image in the tile (not shown in the animation above)
1. place the hero icon ![hero image](./images/hero.png) at the boeard at the array indexes 7/11 (where the dummy hero from the animation starts also)
1. I want the game to scale look and behave nicely on tablets and desktop pcs as well, so center the board with an appropriate grid system vertically and horizontally on the screen

I would recommend the following approach

1. create a static html representation by hand in the ressource folder with the needed css and all the classes. Make the board smaller (like 5x5 or max 7x7). Place everything (the board centered, the hero sitting correctly, ...) in the static html file, so you have a reference when you develop
1. identify any similarites in the different parts of the html and think if they would fit together as to be build by one component
1. then start by building the board with its tiles without making any distinction of the type of tile (and maybe with a fixed size, not reading in the first map)
1. think from where and how you want to read in the board config
1. then try to build the board from the config, without reacting to the type of tile (making all spaces or all blocks).
1. then try to react to the tile type
1. after that place the hero at its starting place
1. then add a keyup or keypress handler to the `document` and check which key is pressed the `event.key` should show these Strings for the keys pressed `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
1. then make the hero move within the board
1. at last check the tile he wants to move to, if it is free and only let him move then

hope you'll have fun building that

if you have any questions, please ask
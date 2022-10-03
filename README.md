# Speed Dance Revolution
### Singleplayer game by RainbowUnicorn & Meap (LD51 Jam Entry)
![image](https://user-images.githubusercontent.com/6320115/193680817-c66c7df0-0b3e-4b27-825c-4fdebefce3bd.png)

**'Speed Dance Revolution'** is a singleplayer web game based on the popular game 'Dance Dance revolution'.<br>
But there's a catch: Every 10 seconds the song gets much faster - try your best to keep up!

This game was created as an entry for the Ludum Dare #51 Jam competition.  
The theme of the competition: 'Every 10 seconds'.

## Game Controls
Desktop - you can use your arrow keys.
Mobile - open the options menu and enable the touch pad. 

## Play Online
https://mrnomm.itch.io/speed-dance-revolution
  
## Build and run locally
The server was tested on Windows & Linux.
1. Install git (see https://git-scm.com/downloads)
2. Install node.js (see https://nodejs.org/)
3. Install pnpm:
        npm install -g pnpm
4. Run the following in a terminal or command prompt:
        git clone https://github.com/HelloUnicorns/LD51.git
        cd chew-choo
        pnpm install .
        pnpm run build
        pnpm run start

The server will start on port 3000 unless a PORT environment variable is specified.  
Play at http://localhost:8000/

Have fun!  

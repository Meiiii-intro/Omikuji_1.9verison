# Project Title
Omikuji - How about Today?


## Short Description

This project is a networked interactive web experience inspired by the Japanese shrine ritual Omikuji. Users shake their phones to draw a fortune, while WebSockets keep the result synchronised for everyone online.

It explores how simple physical gestures can become part of a shared digital ritual and how individual actions are connected through a networked system.


## Concept

The core idea of this project is "cyber fortune-telling in the digital age." We used to have easy, frictionless tapping on the glass screens, but in this work, I intentionally add a sense of "difficulty." Just like in a real shrine, you must physically shake your phone to reveal a fortune.

This is not just a program; it becomes a collective ritual that goes beyond the screen. For physical participation, shaking the phone turns real movement into digital entry. In terms of collective connection, when one person draws a fortune, the screens of all online users change colour at the same time. Even though we are in different places, our actions and moments are connected through code.


## Technology Used

This project is built as a real-time networked web experience using a combination of web technologies and mobile sensors.

- P5js: Used on the client side to create the visual interface and manage the interaction logic. It handles drawing the interface, detecting user input, and displaying the fortune results in a clear and intuitive way.

- WebSockets: Used to enable real-time communication between all connected users. When one user successfully draws a fortune, the server broadcasts this event to everyone online, causing all screens to change colour at the same time. This creates a shared moment across different devices and locations.


## How to play
Click this link: https://omikuji-how-about-today.onrender.com

- If you are using a mobile phone, you need to physically shake the device to draw a number.
- If you are using a laptop, no shaking is required - simply click the screen again to receive a number.


## Media

![Project Demo](./images/Omikuji2.0_How%20about%20Today_.mp4)


## Troubleshooting

- IOS Users: Enable"Motion & Orientation Access" in Safari settings.
- If the experience feels stuck, try opening the link in Incognito or Private mode to clear the cache.
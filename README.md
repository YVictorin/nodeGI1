Node.JS Guided Inquiry
============
[![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/issues) [![Current Version](https://img.shields.io/badge/version-1.0.7-green.svg)](https://github.com/IgorAntun/node-chat) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://igorantun.com/chat) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/IgorAntun/node-chat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This Node.js application offers three features: current weather data based on user location hosted through AWS Elastic Beanstalk, a command-line interface for managing personal notes, and a user-friendly UI interface for easy navigation.
###

### Uses the npm package languageDetector to identify the language of multiple strings

![Chat Preview](./hostedWeatherApp/public/img/test.png)


---

## Features
- Weather information retrieval based on user location
- Note management system (add, remove, edit, list, read notes)
- Other awesome features yet to be implemented



---

## Setup
After you clone this repo to your desktop, go to the root directory of either the hostedWeatherApp, languageDetector, or notesApp respectively and run `npm install` to install their dependencies.

---

## Usage
Once the dependencies are installed, you can run `npm start` to start the hostedWeatherApp application. You will then be able to access it at `localhost:8080`.


### Weather Forecast Application
The application allows users to fetch weather information based on their location. Users can input their location and select units (Celsius, Fahrenheit, or Kelvin) to get the current weather conditions.

### Note Management Application
The application includes a note management system that allows users to:
- Add notes with a title and body
- Remove notes by title
- Edit existing notes
- List all notes
- Read a specific note by title

The note management functionality is implemented using Yargs for command-line argument parsing.

---

## License
>You can check out the full license [here]()

This project is licensed under the terms of the **MIT** license.

---


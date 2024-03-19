# Violet

## Introduction

This document provides an overview of a simple Discord bot written in TypeScript using the Discord.js library. The bot listens for messages in Discord servers and responds to specific commands.

## Technologies Used

- TypeScript
- Discord.js

## Features

- Moderation
- MongoDB
- Event listeners

## Installation

To run the bot locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd discord-bot
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Compile TypeScript code:

    ```bash
    npm run compile
    ```

5. Set up your Discord bot in the Discord Developer Portal and obtain a bot token.

6. Create a `.env` file in the project root directory and add your bot token:

    ```env
    token=your-bot-token-here
    client_id=your-client-id
    guild_id=your-guild-id
    ```

7. Start the bot:

    ```bash
    npm run dev
    ```

## Usage

Once the bot is running and added to your Discord server, you can interact with it using the following command:

- `/ping`: Responds with the latency of the bot.

## Resources

- [Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
- [Discord Developer Portal](https://discord.com/developers/applications)

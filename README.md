# tera-npc-summoner

Updated for MT server, GUI working properly.

Description

This mod provides a set of commands and a GUI for easy access to essential game functions like the bank, merchant, vanguard requests, and more.

Features

    Dynamic NPC Summoning: Summon various NPCs like merchants, vanguard request managers, and others with simple commands.
    Automatic NPC Identification: The mod automatically identifies and updates NPC IDs for accurate summoning.
    Customizable Configuration: Allows users to configure NPC IDs and other settings through an external config file.
    Convenient GUI: Offers a graphical user interface for easy interaction and command execution.
    Multiple Summon Options: Includes commands for summoning different types of NPCs and services.

Requirements

    Node.js Modules: path and fs for file handling.

Installation

    Place the mod files into the mods folder of your TeraProxy installation.
    Ensure you have the required Node.js modules (path and fs).

Usage

    Use the command sum [argument] to summon the desired NPC or service. Replace [argument] with the specific name of the service you wish to summon, such as bank, merchant, vang, etc.
    For a graphical interface with a list of available summons, use the command sum without any arguments.
    The mod automatically identifies and updates the game IDs of NPCs when you enter specific zones, ensuring accurate summoning.

Commands

    sum: Opens the summoner menu or summons a specific service when used with an argument.
    bank, merchant, vang, sstore, rewards, broker: Commands for summoning specific NPCs or services.

Configuration

    The mod reads from a config.js file, allowing customization of NPC IDs and zone settings.
    The configuration can be updated in-game or by editing the config.js file directly.

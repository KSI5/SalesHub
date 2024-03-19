# SalesHub 

## Introduction 📖
SalesHub  is a simple web-based point of service(POS) system designed to streamline sales transactions, calculate totals, and generate receipts. The project provides an intuitive interface for cashiers and incorporates features such as inactivity timeout and secure user sessions.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Architecture](#project-architecture)
- [Functions Overview](#functions-overview)
- [Contributing](#contributing)
- [License](#license)

## Overview

SalesHub is designed to facilitate efficient sales transactions in various retail settings. The system provides a user-friendly interface for cashiers to manage items, calculate totals, and generate receipts. Notable features include inactivity timeout to enhance security and automatic logout after a period of user inactivity.

## Features

- **Product Selection:** Easily select items from a predefined list with corresponding prices.
- **Tray Management:** Add selected items to the tray for a transaction summary.
- **Total Calculation:** Calculate the total amount based on the items in the tray.
- **Cash Handling:** Enter cash tendered and calculate change due.
- **Purchase History:** View a history of past purchases, including cashier names and transaction details.
- **Session Management:** Automatically log out users after a period of inactivity.

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, etc.)
- Node.js installed (for development purposes)

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/KSI5/SalesHub.git.

2. Navigate to the project directory:

```bash
cd SalesHub
```

3. Open the `index.html` file in your preferred web browser.

## Usage

1. Open the application in your web browser.
2. Log in with your credentials.
3. Select items from the product list and add them to the tray.
4. Calculate the total amount and handle the transaction.
5. View and print receipts.
6. Terminate the session when done.

## Project Architecture

The project is structured as follows:

- **index.html:** The main HTML file containing the structure of the web interface.
- **cash_register.js:** The JavaScript file handling the logic for product selection, tray management, and calculations.
- **cash_register_styles.css:** The CSS file providing styles for the user interface.
- **cash_register.html:** This HTML file serves as the main interface for the cash register application. It provides the structure and 
  layout for the user interface elements, allowing users to interact with the cash register functionality.
- **style.css:** The CSS file responsible for styling the user interface elements in the cash register application. It defines the   
   visual appearance, layout, and presentation of the HTML elements defined in the cash_register.html file.
- **server.js:** This file contains the server-side JavaScript code responsible for handling HTTP requests and responses, as well as 
  managing the backend logic of the application.
- **README.md:** This file containing information about the project.
  

## Functions Overview

### `resetInactivityTimer()`

Function to reset the inactivity timer and start the countdown for automatic logout.

### `handleUserInteraction()`

Event handler for user interactions (mousemove, keydown, click, scroll) to reset the inactivity timer and hide the countdown box.

### `hideCountdownBox()`

Function to hide the countdown box.

### `logout()`

Function to handle the logout process, clearing timers, and redirecting the user.

### `addToTray()`

Function to add selected items to the transaction tray.

### `calculateTotal()`

Function to calculate the total amount based on the items in the tray.

### `enterCash()`

Function to handle the process of entering cash tendered.

### `resetTray()`

Function to clear the transaction tray.

### `printReceipt()`

Function to print the transaction receipt.

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```


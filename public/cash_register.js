// Variables to store selected items and quantities
let trayItems = [];
let purchaseHistory = [];

// Variable to store the login time
let loginTime;

// Variable to store the username
let userName;

let inactivityTimeout;

// Variable to store the countdown ID
let countdownInterval;

// Function to add selected item to the tray
function addToTray() {
    // Get selected product and quantity from the form
    const productName = document.getElementById('product_name').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Find the selected product in the trayItems array
    const existingItem = trayItems.find(item => item.product === productName);

    // If the product is already in the tray, update the quantity
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        // Otherwise, add a new item to the trayItems array
        trayItems.push({ product: productName, quantity: quantity });
    }

    // Display the tray items sequentially
    displayTray();
}

// Function to display the tray items sequentially
function displayTray() {
    // Get the result element
    const resultElement = document.getElementById('result');

    // Clear the result element
    resultElement.innerHTML = '';

    // Create a container to hold the tray items
    const trayContainer = document.createElement('div');
    trayContainer.style.textAlign = 'right'; // Align text to the right

    // Display each item in the trayItems array sequentially
    trayItems.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.textContent = `${index + 1}. ${item.product} x${item.quantity} - R ${getPrice(item.product).toFixed(2)}`;
        resultElement.appendChild(listItem);
    });
}

// Function to calculate and display the sum total
function calculateTotal() {
    // Calculate the total cost based on the items and quantities in the tray
    const totalAmount = trayItems.reduce((total, item) => {
        // Add the product's price multiplied by quantity to the total
        return total + getPrice(item.product) * item.quantity;
    }, 0);

    // Calculate tax (7% of the total amount)
    const tax = 0.07 * totalAmount;

    // Calculate the total amount including tax
    const totalAmountWithTax = totalAmount + tax;

    // Display "Calculating..." in the sum total button
    const sumTotalButton = document.querySelector('.sum-total-button');
    sumTotalButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Calculating...';

    // Use setTimeout to simulate a delay for the loading message
    setTimeout(() => {
        // Display the total amount and tax in the result div
const resultElement = document.getElementById('result');
resultElement.innerHTML = `<div style="font-family: 'Poppins', sans-serif;">Total Amount: R ${totalAmount.toFixed(2)}<br>
                            Tax (7%): R ${tax.toFixed(2)}<br>
                            Total Amount (including tax): R ${totalAmountWithTax.toFixed(2)}</div>`;

        // Remove the loading message from the sum total button
        sumTotalButton.innerHTML = 'Sum Total';
    }, 1500); // Adjust the delay time as needed
}

// Function to handle cash entry and calculate change
function enterCash() {
    // Get the cash tendered amount from the input field
    const cashTendered = parseFloat(document.getElementById('cash_tendered').value);

    // Validate cash tendered amount
    if (isNaN(cashTendered) || cashTendered < 0) {
        alert('Please enter a valid cash amount.');
        return;
    }

   // Calculate the total amount based on the items and quantities in the tray, including tax
   const totalAmount = trayItems.reduce((total, item) => {
    return total + getPrice(item.product) * item.quantity;
}, 0) + 0.07 * trayItems.reduce((total, item) => total + getPrice(item.product) * item.quantity, 0);

    // Calculate change
    const change = cashTendered - totalAmount;

    // Display "Processing..." in the result div
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Processing...';

    // Use setTimeout to simulate a delay for the loading message
    setTimeout(() => {
        
        // Display the summary in the result div
resultElement.innerHTML = `<div style="font-family: 'Poppins', sans-serif;">
Purchase Total: R ${totalAmount.toFixed(2)}<br>
Cash Tendered: R ${cashTendered.toFixed(2)}<br>
Change Due: R ${change.toFixed(2)}<br><br>
Transaction Complete.
</div>`;

        // Add the purchase summary to the purchase history with reduced font size
const currentDate = new Date();
const purchaseSummary = `<p style="font-size: 15px; font-family: 'Poppins', sans-serif;">Date: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()} - Purchase Total: R ${totalAmount.toFixed(2)} - Cash Tendered: R ${cashTendered.toFixed(2)} - Change Due: R ${change.toFixed(2)}</p>`;
purchaseHistory.push(purchaseSummary);

    // Set a new timeout to clear the transaction summary after 10 seconds
    setTimeout(() => {
        resultElement.innerHTML = '';
    }, 6000);
}, 1500); // Adjust the delay time as needed
}


// Function to reset the form
function resetTray() {
    // Clear the trayItems array
    trayItems = [];

    // Clear the form inputs
    document.getElementById('product_name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('cash_tendered').value = '';

    // Display the empty tray
    displayTray();
}

// Function to get the price of a product
function getPrice(product) {
    // Add prices for each product as needed
    switch (product) {
        case 'Sunlight Detergent':
            return 10.00;
        case 'Domestos':
            return 15.00;
        case 'Dettol':
            return 7.99;
        case 'Shoe polish':
            return 8.00;
        case 'Butter':
            return 25.00;
        case 'Yoghurt':
            return 12.50;
        case 'Chicken':
            return 40.90;
        case 'Lamb chops':
            return 50.50;
        case 'Pasteurized milk':
            return 18.40;
        case 'Bread':
            return 15.99;
        case 'Rice':
            return 30.10;
        case 'Cooking Oil':
            return 20.30;
        case 'Peanut butter':
            return 15.50;
        case 'Jam spread':
            return 12.99;
        case 'Fruit salad':
            return 25.45;
        case 'Onions':
            return 10.99;
        case 'tomato_puree':
            return 18.09;
        case 'Toilet Paper':
            return 20.99;
        case 'New Musk Deodorant':
            return 15.55;
        case 'Solo Deodorant':
            return 12.45;
        case 'Axe Deodorant':
            return 20.00;
        case 'So Heavenly lotion':
            return 30.99;
        // Add more cases for other products
        default:
            return 0.00;
    }
}

// Function to save login time when the user successfully logs in
function saveLoginTime() {
    loginTime = new Date();
}

// Function to format duration in HH:MM:SS format
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

// Function to pad a single-digit number with a leading zero
function padZero(number) {
    return number < 10 ? `0${number}` : number;
}

/// Function to show purchase history
function showHistory() {
    // Display "Loading..." in the history button
    const historyButton = document.querySelector('.history-button');
    historyButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    // Use setTimeout to simulate a delay for the loading message
    setTimeout(() => {
        // Display the purchase history in the result div
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = '<h6 style="font-family: \'Poppins\', sans-serif;">Purchase History:</h6>';

        if (purchaseHistory.length === 0) {
            resultElement.innerHTML += '<p style="font-family: \'Poppins\', sans-serif;">No purchase history available.</p>';
        } else {
            purchaseHistory.forEach((purchase, index) => {
                resultElement.innerHTML += `<p style="font-family: 'Poppins', sans-serif; font-size: 15px;">${index + 1}. Cashier's Name: ${userName}  ${purchase}</p>`;
            });
        }
        
        // Remove the loading message from the history button
        historyButton.innerHTML = '<b>History</b>';
    }, 1500); // Adjust the delay time as needed
}


function printReceipt() {
    // Ensure there are items in the tray before generating a receipt
    if (trayItems.length === 0) {
        alert('No items in the tray. Add items to generate a receipt.');
        return;
    }

    // Get the current date and time
    const currentDate = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    // Format the date and time
    const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
    const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);

    // Get the cashier's name
    const cashierName = userName || 'Unknown Cashier';

// Create the receipt data based on the items in the tray
const receiptData = {
    date: formattedDate,
    time: formattedTime,
    cashier: cashierName,
    items: trayItems.map(item => ({
        description: item.product,
        quantity: item.quantity,
        price: getPrice(item.product).toFixed(2),
        total: (getPrice(item.product) * item.quantity).toFixed(2)
    })),
    subtotal: trayItems.reduce((total, item) => total + getPrice(item.product) * item.quantity, 0).toFixed(2),
    taxRate: 0.07, // 7% tax rate
    tax: (0.07 * trayItems.reduce((total, item) => total + getPrice(item.product) * item.quantity, 0)).toFixed(2),
    total: (trayItems.reduce((total, item) => total + getPrice(item.product) * item.quantity, 0) +
        0.07 * trayItems.reduce((total, item) => total + getPrice(item.product) * item.quantity, 0)).toFixed(2),
    cashTendered: parseFloat(document.getElementById('cash_tendered').value).toFixed(2),
    changeDue: (parseFloat(document.getElementById('cash_tendered').value) -
        (trayItems.reduce((total, item) => total + getPrice(item.product) * item.quantity, 0) +
            0.07 * trayItems.reduce((total, item) => total + getPrice(item.product) * item.quantity, 0))).toFixed(2)
};
// Function to generate a random invoice number
function generateInvoiceNumber() {
    const min = 10000; // Minimum invoice number
    const max = 99999; // Maximum invoice number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random invoice number
const invoiceNumber = generateInvoiceNumber();

// Format and display the receipt
const receiptText = `
----------------------------------------------
KSI Store - Receipt
----------------------------------------------

Invoice Number: ${invoiceNumber}

Date: ${receiptData.date}        Time: ${receiptData.time}
Cashier: ${receiptData.cashier}

----------------------------------------------
Description         | Quantity | Unit Price | Total
----------------------------------------------
${receiptData.items.map(item => `${item.description.padEnd(25)}|${item.quantity.toString().padStart(9)}|${item.price.padStart(12)}|${item.total.padStart(9)}`).join('\n')}
----------------------------------------------
Subtotal: ${receiptData.subtotal.padStart(53)}
Tax (${(receiptData.taxRate * 100).toFixed(0)}%): ${receiptData.tax.padStart(44)}
----------------------------------------------
Total: ${receiptData.total.padStart(58)}
Cash Tendered: R ${receiptData.cashTendered.padStart(46)}
Change Due: R ${receiptData.changeDue.padStart(49)}

----------------------------------------------

Thank you for shopping with us!

----------------------------------------------
`;

// Display the receipt in the result div
const resultElement = document.getElementById('result');
resultElement.innerHTML = `<pre>${receiptText}</pre>`;
}
// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Extract the 'username' parameter from the URL query string
    const params = new URLSearchParams(window.location.search);
    userName = params.get('username');

    // Get the element with the ID 'userName'
    const userNameElement = document.getElementById('userName');

    // Check if the element exists before manipulating its content
    if (userNameElement) {
        // Display a welcome message with the extracted username or a default value if not present
        userNameElement.textContent = `Welcome, ${userName || 'User'}!`;
    }
    // Function to update the fancy clock widget
function updateFancyClock() {
    const fancyClock = document.getElementById('fancyClock');
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12

    // Create a fancy clock display with additional styling
    const formattedTime = `<span>${hours < 10 ? '0' + hours : hours}</span>:<span>${minutes < 10 ? '0' + minutes : minutes}</span> <span class="ampm">${ampm}</span>`;
    fancyClock.innerHTML = formattedTime;
}

// Update the fancy clock widget every second
setInterval(updateFancyClock, 1000);


    // Get the elements with the IDs 'realTime', 'duration', and 'logoutButton'
    const realTimeElement = document.getElementById('realTime');
    const durationElement = document.getElementById('duration');
    const logoutButton = document.getElementById('logoutButton');
    const dayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Set the login time when the user successfully logs in
    saveLoginTime();

    // Update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);

    // Function to update the timer and real-time clock
    function updateTimer() {
        const now = new Date();

        // Update the session duration if login time is available
        if (loginTime) {
            const elapsedTimeInSeconds = Math.floor((now - loginTime) / 1000);
            durationElement.textContent = formatDuration(elapsedTimeInSeconds);

            // Display the exact time the user logged in
            const loginTimeFormatted = loginTime.toLocaleDateString('en-US', dayOptions) + ' ' + loginTime.toLocaleTimeString();
            realTimeElement.textContent = `Accessed at: ${loginTimeFormatted}`;
        }
    }
// Event listener for print receipt button
const printReceiptButton = document.querySelector('.print-receipt-button');
if (printReceiptButton) {
    printReceiptButton.addEventListener('click', printReceipt);
}

// Function to reset the inactivity timer and start the countdown
function resetInactivityTimer() {
    // Clear the existing timeout and countdown interval
    clearTimeout(inactivityTimeout);
    clearInterval(countdownInterval);

    // Set a new timeout for 1 minute (60 seconds)
    inactivityTimeout = setTimeout(() => {
        // Display the inactive message in the 'countdown' div
        const countdownDiv = document.getElementById('countdown');
        countdownDiv.style.display = 'block'; // Make the countdown box visible
       // Assuming countdownDiv is a reference to your countdown container
countdownDiv.innerHTML = 'Oops! It seems like you\'ve been inactive. The application will shut down in <span id="countdownTimer">15</span> secs.';
countdownDiv.innerHTML += ' Please continue using the app or click to stay active.';




        // Start the countdown for 15 seconds
        let countdown = 15;
        countdownInterval = setInterval(() => {
            document.getElementById('countdownTimer').innerHTML = countdown.toString();
            countdown--;

            // Automatically log out when the countdown reaches 0
            if (countdown < 0) {
                logout();
            }
        }, 1000);
    }, 60000); // 1 minute in milliseconds
}

// Event listeners for user interactions
document.addEventListener('mousemove', handleUserInteraction);
document.addEventListener('keydown', handleUserInteraction);
document.addEventListener('click', handleUserInteraction);
document.addEventListener('scroll', handleUserInteraction);
// Add more event listeners as needed for your specific application

// Event listener for the manual login button
const manualLoginButton = document.getElementById('manualLoginButton');
if (manualLoginButton) {
    manualLoginButton.addEventListener('click', () => {
        resetInactivityTimer();
    });
}

// Event listener for the logout button
function handleLogoutButtonClick() {
    resetInactivityTimer();
    logout();
}

// Initialize the inactivity timer on page load
resetInactivityTimer();

// Function to hide the countdown box
function hideCountdownBox() {
    const countdownDiv = document.getElementById('countdown');
    countdownDiv.style.display = 'none';
}

// Function to handle user interaction
function handleUserInteraction() {
    resetInactivityTimer();
    hideCountdownBox(); // Hide the countdown box on user interaction
}

// Function to handle logout
function logout() {
    // Clear the login time when the user logs out
    loginTime = undefined;
    clearInterval(timerInterval);
    clearTimeout(inactivityTimeout);
    clearInterval(countdownInterval);

    // Create a container for the goodbye message
    const goodbyeContainer = document.createElement('div');
    goodbyeContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        text-align: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    `;

    // Create the goodbye message element
    const goodbyeMessage = document.createElement('h2');
    goodbyeMessage.textContent = 'Goodbye';
    goodbyeMessage.style.cssText = `
        font-family: 'Poppins', sans-serif;
        color: #387ADF;
        margin: 0;
    `;

    // Append the goodbye message to the container
    goodbyeContainer.appendChild(goodbyeMessage);

    // Append the container to the document body
    document.body.appendChild(goodbyeContainer);

    // Trigger a reflow to enable transition
    void goodbyeContainer.offsetWidth;

    // Fade in the goodbye message
    goodbyeContainer.style.opacity = '1';

    // Initialize dots count
    let dotsCount = 5;

    // Create interval to decrement dots count and update message
    const dotsInterval = setInterval(() => {
        // Decrement dots count
        dotsCount--;

        // Update goodbye message with dots
        goodbyeMessage.textContent = 'Goodbye' + '.'.repeat(dotsCount);

        // If dots count reaches 0, clear interval
        if (dotsCount === 0) {
            clearInterval(dotsInterval);

            // Redirect to index.html after fade out
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 500); // Wait for fade out transition
        }
    }, 1000); // Interval of 1 second for each dot

    // Redirect to index.html after a brief delay
    setTimeout(() => {
        // Fade out the goodbye message
        goodbyeContainer.style.opacity = '0';
    }, 5000); // Show "Goodbye" for 5 seconds before starting dots countdown
}



// Attach the handleLogoutButtonClick function to the logout button click event
document.getElementById('logoutButton')?.addEventListener('click', handleLogoutButtonClick);
});

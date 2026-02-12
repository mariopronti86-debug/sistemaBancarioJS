// 1. Database & Struttura Dati

const accounts = [
    {
        username: "mario",
        pin: 1234,
        balance: 1500,
        movements: []
    },
    {
        username: "anna",
        pin: 4321,
        balance: 3000,
        movements: []
    },
    {
        username: "luca",
        pin: 1111,
        balance: 800,
        movements: []
    }
];


// 2. Sistema di Autenticazione (Login)

let currentAccount = null;
let isAuthenticated = false;

while (!isAuthenticated) {

    const inputUsername = prompt("Insert your username:").toLowerCase();

    // 5. Pannello Amministratore (Admin)
    
    if (inputUsername === "admin") {
        const adminPin = prompt("Insert admin PIN:");
        if (adminPin === "12345") {

            let exitAdmin = false;

            while (!exitAdmin) {
                const adminChoice = prompt(
                    "ADMIN PANEL\n\n" +
                    "1. List Accounts\n" +
                    "2. Total Bank Money\n" +
                    "3. Create New Account\n" +
                    "4. Logout"
                );

                // 1 Lista conti
                if (adminChoice === "1") {
                    let list = "Registered Accounts:\n\n";
                    for (let i = 0; i < accounts.length; i++) {
                        list += "User: " + accounts[i].username + " | Balance: €" + accounts[i].balance.toFixed(2) + "\n";
                    }
                    alert(list);
                }
                // 2 Totale soldi banca
                else if (adminChoice === "2") {
                    let total = 0;
                    for (let i = 0; i < accounts.length; i++) {
                        total += accounts[i].balance;
                    }
                    alert("Total money in the bank: €" + total.toFixed(2));
                }
                // 3 Crea utente
                else if (adminChoice === "3") {
                    const newUsername = prompt("Insert new username:").toLowerCase();
                    const newPin = Number(prompt("Insert new PIN:"));
                    const newBalance = Number(prompt("Insert initial balance:"));
                    if (!newUsername || isNaN(newPin) || isNaN(newBalance)) {
                        alert("Invalid data! Try again.");
                    } else {
                        accounts.push({ username: newUsername, pin: newPin, balance: newBalance, movements: [] });
                        alert("New account created successfully!");
                    }
                }
                // 4 Logout Admin
                else if (adminChoice === "4") {
                    exitAdmin = true;
                } else {
                    alert("Invalid option.");
                }
            }

        } else {
            alert("Wrong admin PIN.");
        }

        continue; // Torna al login principale
    }

    // 👤 Login utente normale
    let foundAccount = null;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username === inputUsername) {
            foundAccount = accounts[i];
            break;
        }
    }

    if (!foundAccount) {
        alert("Username not found. Try again.");
        continue;
    }

    while (true) {
        const inputPIN = Number(prompt("Insert your PIN:"));
        if (foundAccount.pin === inputPIN) {
            currentAccount = foundAccount;
            isAuthenticated = true;
            break;
        } else {
            alert("Wrong PIN. Try again.");
        }
    }
}



//3. Operazioni Bancarie Base

let exitDashboard = false;

while (!exitDashboard) {
    const choice = prompt(`Welcome ${currentAccount.username}!\n What do you want to do?\n 1. View Balance\n 2. Withdraw\n 3. Deposit\n 4. Show Movements\n 5. Logout`);

    if (choice === "1") {
        alert("Your Balance: €" + currentAccount.balance.toFixed(2));

    } else if (choice === "2") {

        let amount;
        let valid = false;
        while (!valid) {
            amount = Number(prompt("Enter amount to withdraw:"));

            if (isNaN(amount)) {
                alert("Please enter a valid number.");
            }
            else if (amount <= 0) {
                alert("Amount must be greater than 0.");
            }
            else if (amount > currentAccount.balance) {
                alert("Insufficient funds.");
            }
            else {
                valid = true;
            }
        }

        currentAccount.balance -= amount;

        currentAccount.movements.push({ date: new Date().toLocaleString(), type: "withdraw", amount: amount });
        alert(`You withdrew €${amount}. New balance: €${currentAccount.balance.toFixed(2)}`);

    } else if (choice === "3") {
        let amount;
        let valid = false;
        while (!valid) {

            amount = Number(prompt("Enter amount to deposit:"));

            if (isNaN(amount)) {
                alert("Please enter a valid number.");
            }
            else if (amount <= 0) {
                alert("Amount must be greater than 0.");
            }
            else {
                valid = true;
            }
        }

        currentAccount.balance += amount;

        currentAccount.movements.push({ date: new Date().toLocaleString(), type: "deposit", amount: amount });
        alert("Deposit successful!");

    } else if (choice === "4") {

        if (currentAccount.movements.length === 0) {
            alert("No movements yet.");
        } else {

            let history = "Your movements:\n\n";

            for (let i = 0; i < currentAccount.movements.length; i++) {

                history += currentAccount.movements[i].date + " | " + currentAccount.movements[i].type + " | €" + currentAccount.movements[i].amount + "\n";
            }

            alert(history);
        }
    } else if (choice === "5") {
        alert("Goodbye " + currentAccount.username + "!");
        exitDashboard = true; // torna al login
    }

    else {
        alert("Invalid option.");
    }

}



// 4. Funzionalità Avanzata: Il Bonifico
// Questo punto per noi era troppo difficile sorri :P




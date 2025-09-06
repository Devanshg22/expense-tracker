let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addExpenseBtn = document.getElementById("add-expense-btn");
const expensesTbody = document.getElementById("expenses-tbody");
const totalAmountTd = document.getElementById("total-amount");


function saveExpensesToLocal() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalAmount', totalAmount);
}

// --- Load All Data from Local Storage ---
function loadExpensesFromLocal() {
    const storedExpenses = localStorage.getItem('expenses');
    const storedTotal = localStorage.getItem('totalAmount');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
    }
    if (storedTotal) {
        totalAmount = Number(storedTotal);
    } else {
        totalAmount = 0;
    }
}


function renderExpenses() {
    expensesTbody.innerHTML = "";
    for (const expense of expenses) {
        const newRow = expensesTbody.insertRow();
        const categoryCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const dateCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            const index = expenses.indexOf(expense);
            if (index !== -1) {
                totalAmount -= Number(expense.amount);
                expenses.splice(index, 1);
                saveExpensesToLocal();
                renderExpenses();
            }
        };

        deleteCell.appendChild(deleteBtn);
    }
    totalAmountTd.textContent = totalAmount;
}


addExpenseBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission (if button is in a form)
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (!category || isNaN(amount) || amount <= 0 || !date) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;
    saveExpensesToLocal();
    renderExpenses();

    // optional: clear input fields
    amountInput.value = "";
    dateInput.value = "";
    categorySelect.selectedIndex = 0;
});


window.onload = function () {
    loadExpensesFromLocal();
    renderExpenses();
};

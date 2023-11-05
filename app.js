document.addEventListener('DOMContentLoaded', () => {
    // Load expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    updateExpenseList(expenses);
    updateTotalExpense(expenses);
});

function addExpense() {
    const expenseInput = document.getElementById('expense');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');

    const expenseText = expenseInput.value.trim();
    const descriptionText = descriptionInput.value.trim();
    const categoryText = categoryInput.value.trim();

    if (expenseText !== '') {
        // Get existing expenses from local storage
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        // Add new expense
        expenses.push({
            id: Date.now(),
            text: expenseText,
            description: descriptionText,
            category: categoryText,
        });

        // Save expenses to local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Update the UI
        updateExpenseList(expenses);
        updateTotalExpense(expenses);

        // Clear input fields
        expenseInput.value = '';
        descriptionInput.value = '';
        categoryInput.value = '';
    }
}

function updateExpenseList(expenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.text} - ${expense.description} - ${expense.category}`;
        expenseList.appendChild(listItem);
    });
}

function updateTotalExpense(expenses) {
    const totalExpenseElement = document.getElementById('totalExpense');
    const totalExpense = expenses.reduce((acc, expense) => acc + 1, 0);
    totalExpenseElement.textContent = totalExpense.toFixed(2);
}

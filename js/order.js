const menuItems = [
    // Burgers
    { name: "Beef Burger", price: 850.00, category: "burgers", image: "beef.jpg" },
    { name: "Chicken Burger", price: 750.00, category: "burgers", image: "chicken.jpg" },
    { name: "Veggie Burger", price: 650.00, category: "burgers", image: "veggie.jpg" },

    // Sides
    { name: "French Fries", price: 400.00, category: "sides", image: "french_frice.jpeg" },
    { name: "Chicken Nuggets", price: 500.00, category: "sides", image: "dumpling.jpg" },
    { name: "Onion Rings", price: 450.00, category: "sides", image: "onion.jpg" },

    // Drinks
    { name: "Coca-Cola", price: 200.00, category: "drinks", image: "cocacola.jpeg" },
    { name: "Orange Juice", price: 250.00, category: "drinks", image: "orange.jpeg" },
    { name: "Iced Coffee", price: 300.00, category: "drinks", image: "ice_coffee.jpeg" },

    // Desserts
    { name: "Chocolate Ice Cream", price: 350.00, category: "desserts", image: "chocolete_icecream.jpeg" },
    { name: "Strawberry Sundae", price: 370.00, category: "desserts", image: "strawbery.jpeg" },
    { name: "Apple Pie", price: 400.00, category: "desserts", image: "apple.jpeg" }
];


const customers = [
    { phone: "07644680631", name: "indeepa", email: "indeepayasanjith13@gmail.com" },
        { phone: "07555680631", name: "deshan", email: "punduka44@gmail.com" },

            { phone: "07744450631", name: "sandaru", email: "sandaru753@gmail.com" },

                { phone: "0764464568", name: "janidu", email: "janidusahan45@gmail.com" },
                    { phone: "0764560631", name: "nimantha", email: "nimantha78@gmail.com" }


];

function displayCustomerDetail(){

}

let selectedItems = [];
let currentCategory = 'all';

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);

    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('orderDate').textContent = now.toLocaleDateString('en-US', dateOptions);
}

function displayMenuItems(items) {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';

    items.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'col-md-4 mb-3';

        menuItemDiv.innerHTML = `
            <div class="card menu-item h-100" onclick="addToOrder('${item.name}', ${item.price})">
                <div class="card-body text-center">
                    <img src="img/${item.image}" alt="${item.name}" class="mb-2">
                    <h6 class="card-title">${item.name}</h6>
                    <p class="card-title fw-bold text-primary">LKR ${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItemDiv);
    });
}

// chat ekn gttha tika
function filterMenuByCategory(category) {
    currentCategory = category;

    // Highlight the active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });

    // Filter the items
    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);

    displayMenuItems(filteredItems);
}

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        filterMenuByCategory(category);
    });
});



// Add default behavior on load
document.addEventListener('DOMContentLoaded', function () {
    updateDateTime();
    displayMenuItems(menuItems);
});


function addToOrder(name, price) {
    const existingItem = selectedItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        selectedItems.push({ name, price, quantity: 1 });
    }
    renderOrderTable();
}

function removeFromOrder(name) {
    selectedItems = selectedItems.filter(item => item.name !== name);
    renderOrderTable();
}

function renderOrderTable() {
    const tbody = document.querySelector("#orderTable tbody");
    tbody.innerHTML = '';

    let total = 0;

    selectedItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>LKR ${item.price.toFixed(2)}</td>
            <td>LKR ${itemTotal.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromOrder('${item.name}')">✕</button></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById("order-total").textContent = `LKR ${total.toFixed(2)}`;
}

function addToOrder(name, price) {
    selectedItems.push({ name, price });
    renderSelectedItems();
    updateTotal();
}
function renderSelectedItems() {
    const container = document.getElementById('selectedItems');
    container.innerHTML = '';

    selectedItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'd-flex justify-content-between mb-2';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>LKR ${item.price.toFixed(2)}</span>
        `;
        container.appendChild(itemDiv);
    });
}
function updateTotal() {
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('totalAmount').textContent = `LKR ${total.toFixed(2)}`;
}

function saveCustomerInfo() {
    const phone = document.querySelector('input[placeholder="Enter Phone Number"]').value.trim();
    const name = document.querySelector('input[placeholder="Customer Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Customer Email"]').value.trim();

    // Validate
    if (!phone || !name || !email) {
        alert('Please fill in all customer information.');
        return;
    }

    if (selectedItems.length === 0) {
        alert('Please add at least one item to the order.');
        return;
    }

    // Create Order Object
    const order = {
        customer: { phone, name, email },
        items: selectedItems,
        total: selectedItems.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toLocaleString()
    };

    // Example: Print to console
    console.log("Order submitted:", order);

    // Optional: Show success message
    alert(`Order placed successfully for ${name}!\nTotal: LKR ${order.total.toFixed(2)}`);

    // Optional: Reset form
    selectedItems = [];
    renderSelectedItems();
    updateTotal();
    document.querySelectorAll('.customer-input').forEach(input => input.value = '');
}

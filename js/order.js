const menuItems = [
    {
        name:"Beef burger", price: 850.00, category:"burger", images: ""},

{
        name:"Beef burger", price: 850.00, category:"burger", images: ""},
    {
        name:"Beef burger", price: 850.00, category:"burger", images: ""}    ];

        const customers = [
            { phone: "07644680631", name: "indeepa", email:"indeepayasanjith13@gmail.com"}
        ];

        let selectedItems = [];
        let currentCategory = 'all';

        function updateDateTime(){
            const now = new Date();
            const options = {
                weekday : 'long',
                year : 'numeric',
                month : 'long',
                day : 'numeric',
                hour : '2-dgit',
                minute : '2-digit',
                second : '2-digit',
                hour12 : true
            };
            document.getElementById('current-date').textContent = now.toLocaleDateString('en-US',options);

            const dateOptions = {
                year : 'numeric',
                month : 'short',
                day : 'numeric'
            };
            document.getElementById('orderDate').textContent = now.toLocaleTimeString('en-US',dateOptions)
        }

        // Display Menu items
function displayMenuItems(items) {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';

    items.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'col-md-4 mb-3';

        menuItemDiv.innerHTML = `
            <div class="card menu-item h-100" onclick="addToOrder('${item.name}', ${item.price})">
                <div class="card-body text-center">
                    <img src="images/${item.image}" alt="${item.name}" class="mb-2">
                    <h6 class="card-title">${item.name}</h6>
                    <p class="card-title fw-bold text-primary">LKR ${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;

        menuContainer.appendChild(menuItemDiv);
    });
}

        
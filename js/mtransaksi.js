// Dummy data for transactions
const transactions = [
  {
    id: 1,
    date: "2025-05-10 08:30",
    name: "John Doe",
    address: "Jl. Merdeka No. 25",
    phone: "08123456789",
    product: "Teh Rosella (2)",
    total: "Rp 50.000"
  },
  {
    id: 2,
    date: "2025-05-09 14:00",
    name: "Jane Smith",
    address: "Jl. Pahlawan No. 10",
    phone: "08234567890",
    product: "Teh Chamomile (1)",
    total: "Rp 28.000"
  },
  {
    id: 3,
    date: "2025-05-08 11:15",
    name: "Alice Johnson",
    address: "Jl. Kebangsaan No. 5",
    phone: "08345678901",
    product: "Teh Lavender (3)",
    total: "Rp 90.000"
  }
];

// Function to load data into the table
function loadTransactions() {
  const tableBody = document.querySelector("#transactions-table tbody");
  tableBody.innerHTML = ""; // Clear the table body before adding new data
  
  transactions.forEach(transaction => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.id}</td>
      <td>${transaction.date}</td>
      <td>${transaction.name}</td>
      <td>${transaction.address}</td>
      <td>${transaction.phone}</td>
      <td>${transaction.product}</td>
      <td>${transaction.total}</td>
      <td>
      <div class="action-buttons">
        <button class="edit" onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="delete" onclick="deleteTransaction(${transaction.id})">Delete</button>
      </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit transaction function
function editTransaction(id) {
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    // Isi form dengan data lama
    document.getElementById("edit-id").value = transaction.id;
    document.getElementById("edit-name").value = transaction.name;
    document.getElementById("edit-address").value = transaction.address;
    document.getElementById("edit-phone").value = transaction.phone;
    document.getElementById("edit-product").value = transaction.product;
    document.getElementById("edit-total").value = transaction.total;

    // Tampilkan modal
    document.getElementById("editModal").style.display = "block";
  }
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Hindari reload

  const id = parseInt(document.getElementById("edit-id").value);
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    transaction.name = document.getElementById("edit-name").value;
    transaction.address = document.getElementById("edit-address").value;
    transaction.phone = document.getElementById("edit-phone").value;
    transaction.product = document.getElementById("edit-product").value;
    transaction.total = document.getElementById("edit-total").value;

    loadTransactions();
    closeModal();
  }
});



// Delete transaction function
function deleteTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    loadTransactions();
  }
}

// Load data on page load
window.onload = loadTransactions;

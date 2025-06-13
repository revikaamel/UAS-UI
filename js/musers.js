const dummyUsers = [
  { id: 1, nama: "Budi", password: "budi123" },
  { id: 2, nama: "Siti", password: "siti456" },
  { id: 3, nama: "Agus", password: "agus789" },
  { id: 4, nama: "Dina", password: "dina321" },
  { id: 5, nama: "Rina", password: "rina654" },
];

// Fungsi hashing SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function loadUsers() {
  const tbody = document.querySelector("#users-table tbody");
  tbody.innerHTML = "";

  for (const user of dummyUsers) {
    const hashedPassword = await hashPassword(user.password);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nama}</td>
      <td>${hashedPassword}</td>
      <td>
        <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

// Buka modal edit dan isi form dengan data user
function editUser(id) {
  const user = dummyUsers.find(u => u.id === id);
  if (!user) return alert("User tidak ditemukan");

  document.getElementById("edit-user-id").value = user.id;
  document.getElementById("edit-user-name").value = user.nama;
  document.getElementById("edit-user-password").value = ""; // kosongkan password

  document.getElementById("editUserModal").style.display = "block";
}

// Tutup modal edit
function closeEditUserModal() {
  document.getElementById("editUserModal").style.display = "none";
}

// Hapus user
function deleteUser(id) {
  const idx = dummyUsers.findIndex(u => u.id === id);
  if (idx > -1 && confirm("Yakin ingin menghapus user ini?")) {
    dummyUsers.splice(idx, 1);
    loadUsers();
  }
}

// Submit form edit user
document.getElementById("editUserForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("edit-user-id").value);
  const newName = document.getElementById("edit-user-name").value.trim();
  const newPassword = document.getElementById("edit-user-password").value;

  if (!newName) {
    alert("Nama tidak boleh kosong!");
    return;
  }

  const user = dummyUsers.find(u => u.id === id);
  if (!user) {
    alert("User tidak ditemukan");
    closeEditUserModal();
    return;
  }

  user.nama = newName;

  if (newPassword) {
    // Jika password diisi, hash dan update
    user.password = newPassword; // simpan plain dulu, akan di-hash saat loadUsers
  }

  await loadUsers();
  closeEditUserModal();
});

window.onload = loadUsers;

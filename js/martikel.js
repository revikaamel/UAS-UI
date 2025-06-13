// Data artikel dummy
const articles = [
    { id: 1, title: "10 Manfaat Bunga Rosella untuk Kesehatan yang Jarang Diketahui", description: "Bunga rosella dikenal dengan banyak manfaat untuk kesehatan tubuh...", link: "article-detail.html?slug=manfaat-bunga-rosella" },
    { id: 2, title: "Pentingnya Manfaat Teh Chamomile", description: "Chamomile banyak digunakan dalam dunia kesehatan karena manfaat relaksasinya...", link: "article-detail.html?slug=manfaat-teh-chamomile" },
    { id: 3, title: "Jarang Diketahui, Ini 7 Manfaat Bunga Telang untuk Kesehatan", description: "Bunga telang dikenal dengan warna birunya yang khas dan khasiatnya yang luar biasa...", link: "article-detail.html?slug=manfaat-bunga-telang" },
    { id: 4, title: "Teh Lavender: Ini Manfaatnya bagi Kesehatan", description: "Lavender bukan hanya harum, tetapi juga memiliki manfaat bagi kesehatan tubuh...", link: "article-detail.html?slug=manfaat-teh-lavender" },
    { id: 5, title: "Kaya Antioksidan, Ini 7 Manfaat Teh Mawar bagi Kesehatan", description: "Teh mawar tidak hanya memiliki rasa yang unik, tetapi juga khasiat untuk tubuh...", link: "article-detail.html?slug=manfaat-teh-mawar" }
];

// Menampilkan artikel dalam tabel
function displayArticles() {
    const articleBody = document.querySelector("#article-body");
    articleBody.innerHTML = ""; // Mengosongkan tabel sebelum menambahkan data baru

    articles.forEach(article => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${article.id}</td>
            <td><a href="${article.link}" target="_blank">${article.title}</a></td>
            <td>${article.description}</td>
            <td>
            <div class="action-buttons">
                <button class="edit" onclick="editArticle(${article.id})">Edit</button>
                <button class="delete" onclick="deleteArticle(${article.id})">Hapus</button>
            </div>
            </td>

        `;

        articleBody.appendChild(row);
    });
}

// Fungsi untuk mengedit artikel
// Edit Deskripsi
function editArticle(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return alert("Artikel tidak ditemukan");

    document.getElementById("edit-article-id").value = article.id;
    document.getElementById("edit-description").value = article.description;

    document.getElementById("editDescriptionModal").style.display = "block";
}

// Tutup Modal
function closeEditModal() {
    document.getElementById("editDescriptionModal").style.display = "none";
}

// Submit Form
document.getElementById("editDescriptionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById("edit-article-id").value);
    const newDescription = document.getElementById("edit-description").value.trim();

    const article = articles.find(a => a.id === id);
    if (!article) return alert("Artikel tidak ditemukan");

    article.description = newDescription;
    displayArticles();
    closeEditModal();
});


// Fungsi untuk menghapus artikel
function deleteArticle(id) {
    const confirmed = confirm("Apakah Anda yakin ingin menghapus artikel ini?");
    if (confirmed) {
        const index = articles.findIndex(article => article.id === id);
        if (index !== -1) {
            articles.splice(index, 1);
            displayArticles();
        }
    }
}



// Panggil displayArticles saat halaman dimuat
window.onload = displayArticles;

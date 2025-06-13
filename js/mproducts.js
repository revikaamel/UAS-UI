const dummyProducts = [
 {
    id: 1,
    name: "Teh Rosella",
    description: "Teh herbal alami dengan cita rasa segar",
    price: 83333,
    image: "../images/produk-rosella.png"

  },
  {
    id: 2,
    name: "Teh Chamomile",
    description: "Teh herbal yang menenangkan",
    price: 93333,
    image: "../images/produk-chamomile.png"

  },
  {
    id: 3,
    name: "Teh Bunga Telang",
    description: "Teh dengan warna biru alami",
    price: 73333,
    image: "../images/produk-telang.png"
  },
  {
    id: 4,
    name: "Teh Lavender",
    description: "Teh dengan aroma bunga lavender",
    price: 100000,
    image: "../images/produk-lavender.png"
  },
  {
    id: 5,
    name: "Teh Mawar",
    description: "Teh dengan aroma mawar segar",
    price: 90000,
   image: "../images/produk-mawar.png"
  },
  {
    id: 6,
    name: "Teh Krisan",
    description: "Teh dengan rasa lembut dan manis",
    price: 80000,
   image: "../images/produk-krisan.png"
  },
  {
    id: 7,
    name: "Teh Bunga Blimbing Wuluh",
    description: "Teh dengan rasa asam segar",
    price: 76667,
   image: "../images/produk-bunga blimbing wuluh.png"
  },
  {
    id: 8,
    name: "Teh Melati",
    description: "Teh dengan aroma melati klasik",
    price: 86667,
   image: "../images/produk-melati.png"
  },
  {
    id: 9,
    name: "Teh Bunga Sepatu",
    description: "Teh dengan rasa asam manis",
    price: 83333,
   image: "../images/produk-hibiscus.png"
  },
  {
    id: 10,
    name: "Teh Dandelion",
    description: "Teh herbal untuk detoksifikasi",
    price: 96667,
   image: "../images/produk-dandelion.png"

  },
  {
    id: 11,
    name: "Teh Sakura",
    description: "Teh dengan aroma bunga sakura",
    price: 103333,
    image: "../images/produk-sakura.png"
  },
  {
    id: 12,
    name: "Teh Mekar China",
    description: "Teh dengan visual mekar yang indah",
    price: 110000,
   image: "../images/produk-mekar-china.png"
  },
  {
    id: 13,
    name: "Teh Peony",
    description: "Teh dengan aroma bunga peony",
    price: 86667,
   image: "../images/produk-peony.png"
  },
  {
    id: 14,
    name: "Teh Lotus",
    description: "Teh dengan aroma bunga lotus",
    price: 100000,
   image: "../images/produk-lotus.png"
  },
  {
    id: 15,
    name: "Teh Lily",
    description: "Teh dengan aroma bunga lily",
    price: 93333,
    image: "../images/produk-lily.png"


  }
];

let products = [...dummyProducts];

function loadProducts() {
  const tbody = document.getElementById("product-body");
  tbody.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}"/></td>
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>Rp ${product.price.toLocaleString()}</td>
      <td>
        <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function deleteProduct(index) {
  if (confirm("Yakin ingin menghapus produk ini?")) {
    products.splice(index, 1);
    loadProducts();
  }
}

function editProduct(index) {
  const currentPrice = products[index].price;
  const newPrice = prompt("Edit harga produk:", currentPrice);
  
  if (newPrice !== null && newPrice.trim() !== "") {
    const parsedPrice = parseInt(newPrice.replace(/[^0-9]/g, ""), 10); // hanya angka
    
    if (!isNaN(parsedPrice)) {
      products[index].price = parsedPrice;
      loadProducts();
    } else {
      alert("Harga tidak valid. Masukkan angka saja.");
    }
  }
}



window.onload = loadProducts;

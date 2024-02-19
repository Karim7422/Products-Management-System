const title = document.getElementById("title");

const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");

const count = document.getElementById("count");
const category = document.getElementById("category");
const total = document.getElementById("total");
const addProduct = document.getElementById("addProduct");
const deleteAll = document.getElementById('deleteAll')
const modal = document.getElementById('')
let tbody = document.getElementById('tbody')
let mood = "create"
let tmp;
// Get Total Price 
total.innerHTML = 0;
function getTotal() {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    if (price.value) {
        total.innerHTML = result;
        total.classList.remove("text-bg-danger")
        total.classList.add("text-bg-success")
    } else {
        total.innerHTML = 0;
        total.classList.remove("text-bg-success")
        total.classList.add("text-bg-danger")
    }
}
price.addEventListener("input", getTotal)
taxes.addEventListener("input", getTotal)
ads.addEventListener("input", getTotal)
discount.addEventListener("input", getTotal)

// Create Product 
var data;
localStorage.getItem("Product") !== null ? data = JSON.parse(localStorage.getItem("Product")) : data = []
addProduct.addEventListener('click', () => {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total: total.innerHTML,
    }
    if (mood === "create") {
        
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                data.push(newProduct)
            }
        } else {
            data.push(newProduct)
        }
    } else {
        data[tmp] = newProduct
        mood = "create"
        addProduct.innerHTML = "Add Product"
        count.style.display = "block"
        
    }
    localStorage.setItem("Product", JSON.stringify(data))
    clearData()
    displayData()
})

// Clear Date From Inputs 
function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    count.value = ""
    category.value = ""
    total.innerHTML = ""
    total.classList.remove("text-bg-success")
    total.classList.add("text-bg-danger")
    
}


// Display Data 
function displayData() {
    let table = ""
    for (let i = 0; i < data.length; i++) {
        table += `
    <tr>
        <th scope="row">${i + 1}</th>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="updateProduct(${i})"data-bs-target="#modal" data-bs-toggle="modal" id="update" class="btn btn-outline-secondary"><i class="fa-solid fa-pen"></i></button></td>
        <td><button onclick="deleteProduct(${i})" id="delete" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>
    `
    }
    tbody.innerHTML = table
    data.length ? deleteAll.innerHTML = ` <button onclick="deleteAllProducts()" class="btn btn-dark">Delete All Products (${data.length})</button>` : deleteAll.innerHTML = ""
}
displayData()

// Delete Specific Product 
function deleteProduct(product) {
    data.splice(product, 1)
    localStorage.Product = JSON.stringify(data)
    displayData()
}
// Delete All Products 
function deleteAllProducts() {
    localStorage.removeItem("Product")
    data.splice(0)
    displayData()
}

//Update Specific Product 
function updateProduct(product) {
    title.value = data[product].title
    price.value = data[product].price
    taxes.value = data[product].taxes
    ads.value = data[product].ads
    discount.value = data[product].discount
    category.value = data[product].category
    getTotal()
    count.style.display = 'none'
    addProduct.innerHTML = "Update Product"
    mood = "update"
    tmp = product
}

// Search Functions
let searchMood = "title"
function getSearchMood(id) {
    let search = document.getElementById("search")
    if (id === "searchTitle") {
        search.classList.remove("d-none")
        searchMood = "title"
        search.placeholder = "Search By Title"
    } else if(id === "searchCategory") {
        search.classList.remove("d-none")
        searchMood = "category"
        search.placeholder = "Search By Category"
    }
    search.focus()
    search.value=""
    displayData()
}

function searchData(value) {
    let table =""
    if (searchMood === "title") {
        
        for (let i = 0; i<data.length; i++) {
            if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update" class="btn btn-outline-secondary"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
                `
            }
        }

    } else {
        for (let i = 0; i<data.length; i++) {
            if (data[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update" class="btn btn-outline-secondary"><i class="fa-solid fa-pen"></i></button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
                `
            }
        }
    }
    tbody.innerHTML = table
}
const basket = document.querySelector(".basket");
const numItems = document.querySelector(".basket span");
const productsBox = document.querySelector(".drop-down .products-box");
const boxes = document.querySelectorAll(".drop-down .products-box .box");
const addBtns = document.querySelectorAll(".addBtn");
const preview = document.querySelectorAll(".previewBTN");
const previewBox = document.querySelector(".previewBox");

preview.forEach((btn) => {
  btn.addEventListener("click", (element) => {
    let box = element.target.parentElement.parentElement;
    let imgScr = box.querySelector("img").getAttribute("src");
    let name = box.querySelector("h3").innerText;
    let price = box.querySelector("h4").innerText;
    let backgroundColor = box
      .querySelector(".product-img")
      .getAttribute("style");
    createPreveiw(imgScr, name, price, backgroundColor);
  });
});

function createPreveiw(img, name, price, bgColor) {
  // hidde cartbox if it diaplayed
  productsBox.classList.remove("active");
  // Create overlay
  const overlay = document.createElement("span");
  overlay.classList.add("overlay");
  overlay.setAttribute("style", bgColor);
  previewBox.appendChild(overlay);

  // Create thePreview Box
  const thePreview = document.createElement("div");
  thePreview.classList.add("thePreview");
  thePreview.setAttribute("style", bgColor);
  previewBox.appendChild(thePreview);
  //
  const xmark = document.createElement("i");
  xmark.classList = " fa-xmark fa-solid";
  xmark.classList.add("x-mark");
  xmark.id = "hideMe";
  xmark.addEventListener("click", () => {
    previewBox.innerHTML = "";
  });
  //Click any where out out of box
  document.onclick = function (e) {
    if (e.target.classList.contains("overlay")) {
      previewBox.innerHTML = "";
    }
  };

  thePreview.appendChild(xmark);

  // Create img-holder
  const imgHolder = document.createElement("div");
  imgHolder.classList.add("img-holder");
  thePreview.appendChild(imgHolder);

  // Create big img- div and img
  const bigImgDiv = document.createElement("div");
  bigImgDiv.classList.add("big-img");
  imgHolder.appendChild(bigImgDiv);

  const bigImg = document.createElement("img");
  bigImg.setAttribute("src", img);
  bigImgDiv.appendChild(bigImg);

  // Create Small imgs div
  const smallImgHolder = document.createElement("div");
  smallImgHolder.classList.add("small-imgs");
  imgHolder.appendChild(smallImgHolder);

  // Create 3 small ing by cloning
  for (let i = 0; i < 3; i++) {
    smallImgHolder.appendChild(bigImg.cloneNode(true));
  }

  // create header
  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item-info");
  thePreview.appendChild(itemInfo);

  // Creat item name and description
  const h2 = document.createElement("h2");
  h2.innerText = name;
  itemInfo.appendChild(h2);

  const p = document.createElement("p");
  p.innerText = " collection with fragement";
  itemInfo.appendChild(p);

  // Create size section
  const size = document.createElement("div");
  size.classList.add("size");
  itemInfo.appendChild(size);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  for (let i = 0; i < sizes.length; i++) {
    const span = document.createElement("span");
    span.innerHTML = sizes[i];
    size.appendChild(span);
  }

  // creat add btn and price
  const add = document.createElement("div");
  add.classList.add("add");
  itemInfo.appendChild(add);

  const addBtn = document.createElement("button");
  addBtn.innerText = "Add To Cart";
  add.appendChild(addBtn);
  const itemPrice = document.createElement("p");
  itemPrice.classList.add("price");
  itemPrice.innerText = price;
  add.appendChild(itemPrice);
  addBtn.addEventListener("click", (e) => {
    addingFromPreviw(e.target);
  });
  // lorem p
  const loremP = document.createElement("p");
  loremP.classList.add("random-text");
  loremP.innerText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, officia. Eos iste reprehenderit voluptatibus voluptatum veritatis modi beatae quaerat aliquam pariatur ullam expedita consequuntur earum aperiam ex esse eius libero!";
  itemInfo.appendChild(loremP);
  setTimeout(() => {
    thePreview.classList.add("show-preview");
    overlay.classList.add("show-previewOverlay");
  }, 100);
}

function addingFromPreviw(target) {
  let parentOfAll = target.parentElement.parentElement.parentElement;
  let img = parentOfAll.querySelector(".big-img img").getAttribute("src");
  let name = parentOfAll.querySelector(".item-info h2").innerText;
  let price = parentOfAll.querySelector(".add .price").innerText;
  addItemToCart(name, price, img);
}
// Toggle cart drop-down menu when basket icon is clicked
basket.onclick = () => {
  productsBox.classList.toggle("active");
};

let cartProduct = [];
if (localStorage.getItem("items")) {
  cartProduct = JSON.parse(localStorage.getItem("items"));
  cartProduct.forEach((product) => {
    createCartBox(product);
  });
}

// Add item to cart when "Add to Cart" button is clicked
addBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let name = e.target.parentElement.querySelector("h3").innerText;
    let price = e.target.parentElement.querySelector("h4").innerText;
    let imgScr = e.target.parentElement.previousElementSibling
      .querySelector("img")
      .getAttribute("src");
    addItemToCart(name, price, imgScr);
  });
});

function addItemToCart(name, price, imgScr) {
  const item = { name, price, imgScr };
  if (!isItemAdded(item)) {
    cartProduct.push(item);
    addToLocalStorage(cartProduct);
    createCartBox(item);
  }
}

function isItemAdded(item) {
  return cartProduct.some((theItem) => theItem.name === item.name);
}

function addToLocalStorage(cartProduct) {
  localStorage.setItem("items", JSON.stringify(cartProduct));
}

function createCartBox(itemInfo) {
  // Create box
  let box = document.createElement("div");
  box.classList.add("box");
  productsBox.appendChild(box);

  // Create image
  let boxImg = document.createElement("img");
  boxImg.setAttribute("src", itemInfo.imgScr);
  box.appendChild(boxImg);

  // Create box-info
  let boxInfo = document.createElement("div");
  boxInfo.classList.add("box-info");
  box.appendChild(boxInfo);

  // Create box info elements
  let h3 = document.createElement("h3");
  h3.innerText = itemInfo.name;
  boxInfo.appendChild(h3);
  let h4 = document.createElement("h4");
  h4.innerText = `Total: ${itemInfo.price}`;
  boxInfo.appendChild(h4);

  // Create remove button
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.innerText = "Remove";
  boxInfo.appendChild(removeBtn);

  // Append box to main products box
  productsBox.appendChild(box);

  // Remove button
  removeBtn.addEventListener("click", (e) => {
    removeItem(e.target.parentElement.parentElement);

    // Clear local storage if cart is empty
    if (productsBox.children.length === 0) {
      localStorage.clear();
    }
  });

  updateCartItemCount();
}

function removeItem(item) {
  let itemName = item.querySelector("h3").innerText;
  cartProduct = cartProduct.filter((cart) => cart.name !== itemName); // Remove item from cartProduct array

  addToLocalStorage(cartProduct);
  item.remove();

  updateCartItemCount();
}

function updateCartItemCount() {
  numItems.innerText = productsBox.children.length;
}

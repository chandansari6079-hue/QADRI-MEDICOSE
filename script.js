
const WHATSAPP_NUMBER = "919997773877";

/* ALL 14 PRODUCT CATEGORIES */
const categories = [
  { slug:"tablets-capsules", name:"Tablets & Capsules", icon:"fa-tablets", description:"Explore our tablet and capsule product catalogue." },
  { slug:"gummies", name:"Gummies", icon:"fa-cubes-stacked", description:"Explore our gummy product catalogue." },
  { slug:"respiratory", name:"Respiratory", icon:"fa-lungs", description:"Explore our respiratory care product catalogue." },
  { slug:"softgel-capsules", name:"Softgel Capsules", icon:"fa-capsules", description:"Explore our softgel capsule product catalogue." },
  { slug:"injection", name:"Injection", icon:"fa-syringe", description:"Explore our injection product catalogue." },
  { slug:"iv-infusion", name:"IV Infusion", icon:"fa-prescription-bottle", description:"Explore our IV infusion product catalogue." },
  { slug:"syrup", name:"Syrup", icon:"fa-prescription-bottle", description:"Explore our syrup product catalogue." },
  { slug:"sachet", name:"Sachet", icon:"fa-box", description:"Explore our sachet product catalogue." },
  { slug:"drops", name:"Drops", icon:"fa-eye-dropper", description:"Explore our drops product catalogue." },
  { slug:"dry-syrup", name:"Dry Syrup", icon:"fa-bottle-water", description:"Explore our dry syrup product catalogue." },
  { slug:"gel-nasal-dental", name:"Gel / Nasal / Dental", icon:"fa-pump-soap", description:"Explore our gel, nasal and dental product catalogue." },
  { slug:"derma", name:"Derma", icon:"fa-hand-dots", description:"Explore our derma product catalogue." },
  { slug:"ayurvedic-herbal", name:"Ayurvedic Herbal", icon:"fa-leaf", description:"Explore our Ayurvedic and herbal product catalogue." },
  { slug:"cardiac-diabetic", name:"Cardiac & Diabetic", icon:"fa-heart-pulse", description:"Explore our cardiac and diabetic product catalogue." }
];

/* VERIFIED PRODUCT DETAILS PROVIDED FOR TABLETS & CAPSULES */
const products = [
  {
    category:"tablets-capsules",
    name:"AP Flam Alu Alu",
    composition:"Aceclofenac 100 Mg + Paracetamol 325 Mg Coated Tablet (Alu-Alu)",
    packing:"10 × 20",
    type:"Tablet"
  },
  {
    category:"tablets-capsules",
    name:"AP Flam Blister",
    composition:"Aceclofenac 100 Mg + Paracetamol 325 Mg Coated Tablet",
    packing:"10 × 10",
    type:"Tablet"
  },
  {
    category:"tablets-capsules",
    name:"Aclosef SP",
    composition:"Aceclofenac 100 Mg + Paracetamol 325 Mg + Serratiopeptidase 15 Mg Tablet (Alu-Alu)",
    packing:"10 × 10",
    type:"Tablet"
  },
  {
    category:"tablets-capsules",
    name:"Recon MR",
    composition:"Diclofenac 100 Mg + Paracetamol 325 Mg + Chlorzoxazone 250 Mg Tablet",
    packing:"10 × 10",
    type:"Tablet"
  }
];

/* HELPERS */
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  })[character]);
}

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function categoryUrl(slug) {
  return `category.html?category=${encodeURIComponent(slug)}`;
}

/* YEAR */
function updateYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/* CATEGORY DROPDOWN */
function renderCategoryDropdown() {
  const dropdown = document.getElementById("categoryDropdown");
  if (!dropdown) return;

  dropdown.innerHTML = categories.map(category => `
    <li>
      <a href="${categoryUrl(category.slug)}">
        <i class="fa-solid ${category.icon}"></i>
        ${escapeHTML(category.name)}
      </a>
    </li>
  `).join("");
}

/* HOMEPAGE CATEGORY CARDS */
function renderHomeCategories() {
  const grid = document.getElementById("homeCategoryGrid");
  if (!grid) return;

  grid.innerHTML = categories.map(category => {
    const count = products.filter(
      product => product.category === category.slug
    ).length;

    return `
      <a class="category-card" href="${categoryUrl(category.slug)}">
        <div class="category-card-icon">
          <i class="fa-solid ${category.icon}"></i>
        </div>
        <h3>${escapeHTML(category.name)}</h3>
        <p>${escapeHTML(category.description)}</p>
        <div class="card-bottom">
          <span>${count} ${count === 1 ? "Product" : "Products"}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </a>
    `;
  }).join("");
}

/* PRODUCT ROW */
function productHTML(product, index) {
  const message =
    `Hello Qadri Medicose, I want to enquire about ${product.name}.`;

  return `
    <tr>
      <td>${index}</td>
      <td>
        <div class="product-placeholder">
          <i class="fa-solid fa-capsules"></i>
        </div>
      </td>
      <td><strong>${escapeHTML(product.name)}</strong></td>
      <td>${escapeHTML(product.composition)}</td>
      <td>${escapeHTML(product.packing)}</td>
      <td>${escapeHTML(product.type)}</td>
      <td>
        <a class="product-enquiry-btn"
           href="${whatsappLink(message)}"
           target="_blank"
           rel="noopener">
          <i class="fa-brands fa-whatsapp"></i> Enquire
        </a>
      </td>
    </tr>
  `;
}

/* CATEGORY CATALOGUE */
function renderCatalogue(searchText = "") {
  const grid = document.getElementById("catalogueGrid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("category");
  const category = categories.find(item => item.slug === slug);

  const title = document.getElementById("categoryTitle");
  const description = document.getElementById("categoryDescription");
  const breadcrumb = document.getElementById("breadcrumbCategory");
  const icon = document.getElementById("categoryIcon");
  const count = document.getElementById("productCount");

  if (!category) {
    if (title) title.textContent = "Category Not Found";
    if (description) description.textContent = "Please return to our homepage and select a valid category.";
    if (breadcrumb) breadcrumb.textContent = "Not Found";
    if (count) count.textContent = "No category selected";
    grid.innerHTML = `
      <div class="empty-catalogue">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h3>Category Not Found</h3>
        <p>Please select a category from the homepage.</p>
        <a href="index.html#products">View Categories</a>
      </div>
    `;
    return;
  }

  if (title) title.textContent = category.name;
  if (description) description.textContent = category.description;
  if (breadcrumb) breadcrumb.textContent = category.name;
  if (icon) icon.className = `fa-solid ${category.icon}`;

  const categoryProducts = products.filter(
    product => product.category === category.slug
  );

  const filteredProducts = categoryProducts.filter(product => {
    const searchable = `${product.name} ${product.composition} ${product.packing} ${product.type}`.toLowerCase();
    return searchable.includes(searchText.toLowerCase().trim());
  });

  if (count) {
    count.textContent = `${filteredProducts.length} of ${categoryProducts.length} products`;
  }

  if (categoryProducts.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalogue">
        <i class="fa-solid ${category.icon}"></i>
        <h3>Products Coming Soon</h3>
        <p>Products for ${escapeHTML(category.name)} will be added soon.</p>
        <a href="${whatsappLink(`Hello Qadri Medicose, I want to enquire about ${category.name}.`)}" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp"></i> Enquire on WhatsApp
        </a>
      </div>
    `;
    return;
  }

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No matching products found. Try another search.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = `
    <div class="catalogue-table-wrapper">
      <table class="catalogue-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Composition</th>
            <th>Packing</th>
            <th>Type</th>
            <th>Enquiry</th>
          </tr>
        </thead>
        <tbody>
          ${filteredProducts.map((product, index) =>
            productHTML(product, index + 1)
          ).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/* PRODUCT SEARCH */
function setupProductSearch() {
  const search = document.getElementById("productSearch");
  if (!search) return;

  search.addEventListener("input", () => {
    renderCatalogue(search.value);
  });
}

/* MOBILE NAVIGATION */
function setupMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", event => {
      const parent = link.closest(".has-dropdown");
      const isProductsLink = parent && link.parentElement === parent;

      if (isProductsLink && window.innerWidth <= 950) {
        event.preventDefault();
        parent.classList.toggle("open");
        return;
      }

      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* INITIALISE WEBSITE */
document.addEventListener("DOMContentLoaded", () => {
  updateYear();
  renderCategoryDropdown();
  renderHomeCategories();
  renderCatalogue();
  setupProductSearch();
  setupMobileMenu();
});

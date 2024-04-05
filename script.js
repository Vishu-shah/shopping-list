const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const shoppingList = document.getElementById('shoppingList');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');

let items = [];

// Add item to the list
function addItem() {
  const item = itemInput.value.trim();
  if (item) {
    items.push(item);
    updateList();
    itemInput.value = '';
  }
}

// Update the list display
function updateList() {
  shoppingList.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = item;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeItem(index));
    li.appendChild(span);
    li.appendChild(removeBtn);
    shoppingList.appendChild(li);
  });
}

// Remove item from the list
function removeItem(index) {
  items.splice(index, 1);
  updateList();
}

// Clear the list
function clearList() {
  items = [];
  updateList();
}

// Save the list to localStorage
function saveList() {
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Load the list from localStorage
function loadList() {
  const storedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
  items = storedItems;
  updateList();
}

// Event listeners
addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);
saveBtn.addEventListener('click', saveList);
loadBtn.addEventListener('click', loadList);
itemInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addItem();
  }
});

// Load the list on page load
loadList();
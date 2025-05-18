document.getElementById("newInvoice").addEventListener("click", () => {
  let sectionOne = document.getElementById("sectionOne");

  if (sectionOne.style.display === "none") {
    sectionOne.style.display = "block"; // Show the section
    this.textContent = "Hide Section"; // Change button text
  } else {
    sectionOne.style.display = "none"; // Hide the section
    this.textContent = "Show Section"; // Change button text back
  }
});

document.getElementById("addItem").addEventListener("click", function () {
  const template = document.getElementById("newItems");
  const clone = template.cloneNode(true);

  clone.style.display = "block"; // Show it
  clone.removeAttribute("id"); // Remove ID to avoid duplicates
  clearInputs(clone); // Optional: clear values

  // Add an exit button to the cloned item
  const exitButton = document.createElement("button");
  exitButton.textContent = "Remove";
  exitButton.className = "exit-button"; // Optional: Add a class for styling
  exitButton.addEventListener("click", () => {
    clone.remove(); // Remove the cloned item
  });

  clone.appendChild(exitButton); // Append the exit button to the clone
  document.getElementById("itemsContainer").appendChild(clone);
});

function clearInputs(section) {
  const inputs = section.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}
// script.js
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".dropdown-toggle");
  const menu = document.querySelector(".dropdown-menu");

  toggle.addEventListener("click", function () {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Optional: Close dropdown if clicked outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      menu.style.display = "none";
    }
  });
});

document.getElementById("newInvoice").addEventListener("click", function () {
  const sectionOne = document.getElementById("sectionOne");
  const isHidden = window.getComputedStyle(sectionOne).display === "none";

  if (isHidden) {
    sectionOne.style.display = "block";
    this.textContent = "Hide Section";
  } else {
    sectionOne.style.display = "none";
    this.textContent = "+ New invoice";
  }
});
document.getElementById("discard").addEventListener("click", function () {
  const sectionOne = document.getElementById("sectionOne");
  sectionOne.style.display = "none";
  const newInvoiceBtn = document.getElementById("newInvoice");
  if (newInvoiceBtn) {
    newInvoiceBtn.textContent = "+ New invoice";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Toggle new invoice section
  document.getElementById("newInvoice").addEventListener("click", function () {
    const sectionOne = document.getElementById("sectionOne");
    const isHidden = window.getComputedStyle(sectionOne).display === "none";

    if (isHidden) {
      sectionOne.style.display = "block";
      this.textContent = "Hide Section";
    } else {
      sectionOne.style.display = "none";
      this.textContent = "+ New Invoice";
    }
  });

  // Discard button (class used instead of missing ID)
  const discardBtn = document.querySelector(".discard");
  if (discardBtn) {
    discardBtn.addEventListener("click", function () {
      document.getElementById("sectionOne").style.display = "none";
      document.getElementById("newInvoice").textContent = "+ New Invoice";
    });
  }

  // Add new item row
  document.getElementById("addItem").addEventListener("click", function () {
    const template = document.getElementById("newItems");
    const clone = template.cloneNode(true);

    clone.style.display = "block";
    clone.removeAttribute("id");
    clearInputs(clone);

    document.getElementById("itemsContainer").appendChild(clone);
  });

  // Clear input values
  function clearInputs(section) {
    const inputs = section.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  }

  // Delete item row
  document
    .getElementById("itemsContainer")
    .addEventListener("click", function (e) {
      if (e.target.closest(".delete-item")) {
        e.target.closest(".new-items").remove();
      }
    });

  // Save Draft button
  const saveDraft = document.querySelector(".save-draft");
  if (saveDraft) {
    saveDraft.addEventListener("click", function (e) {
      e.preventDefault();

      const invoiceId = "E" + Math.floor(10000 + Math.random() * 90000);
      const invoiceDate = document.getElementById("invoice-date").value;
      const clientName = document.getElementById("client-name").value;
      const clientEmail = document.getElementById("client-email").value;

      let amount = 0;
      document
        .querySelectorAll("#itemsContainer .new-items")
        .forEach((item) => {
          const inputs = item.querySelectorAll('input[type="number"]');
          const qty = parseFloat(inputs[0]?.value) || 0;
          const price = parseFloat(inputs[1]?.value) || 0;
          amount += qty * price;
        });

      const invoiceItems = [];
      document
        .querySelectorAll("#itemsContainer .new-items")
        .forEach((item) => {
          const inputs = item.querySelectorAll('input[type="text"]');
          const description = inputs[0]?.value || "";
          const qty = parseFloat(inputs[1]?.value) || 0;
          const price = parseFloat(inputs[2]?.value) || 0;
          invoiceItems.push({ description, qty, price });
        });
      const invoiceData = {
        invoiceId,
        invoiceDate,
        clientName,
        clientEmail,
        amount,
        invoiceItems,
      };
      console.log("Invoice Data:", invoiceData);
      // Here you can send the invoiceData to your server or save it locally
      const status = "pending";

      const card = document.createElement("a");
      card.href = "#"; // You can link to a full invoice page here

      card.innerHTML = `
  <div class="table">
    <div class="tr">
      <div>#${invoiceId}</div>
      <div>Due ${invoiceDate}</div>
      <div>${clientName}</div>
    </div>
    <div class="tr">
      <div>$${amount.toFixed(2)}</div>
      <div><button>${
        status.charAt(0).toUpperCase() + status.slice(1)
      }</button></div>
    </div>
  </div>
`;

      document.getElementById("invoice-cards").appendChild(card);

      // Optional: clear the form
      document.getElementById("invoiceForm").reset();
    });
  }
});

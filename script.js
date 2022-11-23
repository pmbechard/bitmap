const gridSize = document.getElementById("grid-size-input");
const changeSizeBtn = document.getElementById("change-size-btn");
const color = document.getElementById("color");
const gridSizeHeading = document.getElementById("grid-size-heading");
const textArea = document.getElementById("textarea");
const generateBtn = document.getElementById("generate-btn");
const outputDiv = document.getElementById("output");

changeSizeBtn.addEventListener("click", () => {
  const size = parseInt(gridSize.value);
  textArea.value = "";
  textArea.setAttribute("rows", `${size}`);
  textArea.setAttribute("cols", `${size}`);
  textArea.setAttribute("minlength", `${size * size + size - 1}`);
  textArea.setAttribute("maxlength", `${size * size + size - 1}`);
  gridSizeHeading.textContent = `Current Grid Size: ${size}x${size}`;
  outputDiv.innerHTML = "";
  outputDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  outputDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`;
});

textArea.addEventListener("input", (e) => {
  const length = parseInt(e.target.getAttribute("rows"));
  const re = new RegExp(`(.{${length}})`, "g");
  e.target.value = e.target.value
    .replace(/[^0-1]/g, "")
    .replace(re, "$1\n")
    .trim();
  generateBtn.disabled =
    textArea.value.length !== parseInt(textArea.getAttribute("minlength"));
});

generateBtn.addEventListener("click", () => {
  outputDiv.innerHTML = "";
  const outputArr = textArea.value.replaceAll("\n", "").split("");
  outputArr.forEach((val) => {
    const outputItem = document.createElement("div");
    outputItem.classList.add("output-item");
    if (val === "0") {
      outputItem.style.backgroundColor = "white";
    } else {
      outputItem.style.backgroundColor = color.value;
    }
    outputDiv.appendChild(outputItem);
  });
});

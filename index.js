const menu = document.getElementById("menu");
const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");
const aside = document.getElementById("aside");
let count = 0;
let count2 = 0;
menu.addEventListener("click",()=>{
    second.classList.toggle("display2");
    first.classList.toggle("first");
    third.classList.toggle("third");
    aside.classList.toggle("display");
});

const theme = document.getElementById("theme");
const root = document.documentElement;
root.style.setProperty("--BGCOLOR","black");
theme.addEventListener("click", ()=>{
    if(root.style.getPropertyValue("--BGCOLOR") === "black"){
        root.style.setProperty("--COLOR","black");
        root.style.setProperty("--BGCOLOR","grey");
        root.style.setProperty("--BGCOLOR2","white");
        theme.style.border = "2px solid black";
        theme.style.boxShadow = "0 0 10px purple";
    }else {
        root.style.setProperty("--COLOR","white");
        root.style.setProperty("--BGCOLOR","black");
        root.style.setProperty("--BGCOLOR2","#333");
        theme.style.border = "2px solid white";
        theme.style.boxShadow = "0 0 10px blue";
    }
});

const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const sizeInput = document.getElementById("size").value;
  const n = parseInt(sizeInput);
  const inputContainer = document.getElementById("input-container");

  // Clear Previous Inputs
  inputContainer.innerHTML = "";
  inputContainer.style.display = "flex";
  inputContainer.style.flexWrap = "wrap";

  // Validate Input 
  if (isNaN(n) || n < 1 || n > 6) {
    const error = document.createElement("p");
    error.textContent = "Please enter a number between 1 and 6.";
    error.style.color = "red";
    error.style.fontSize = "2rem";
    inputContainer.appendChild(error);
    return;
  }

  // Label once (use count to prevent duplicate labels)
  if (count === 0) {
    const label = document.createElement("p");
    label.textContent = "Enter numbers inside boxes ⬆️";
    label.style.fontWeight = "bold";
    label.style.fontSize = "20px";
    main.appendChild(label);
    count = 1;
  }
//   const arrays = document.getElementById("arrays");
//   arrays.innerHTML = "";
//   arrays.style.display = "flex";
//   arrays.style.flexWrap = "wrap";
  
  // Generate input boxes dynamically
  for (let i = 0; i < n; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("array-input");
    input.placeholder = `arr[${i}]`;
    input.style.margin = "5px";

    // random pastel color
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    input.style.backgroundColor = `#${randomColor}`;
    inputContainer.appendChild(input);
  }
  


  // ✅ Add submit-array button after 1 second
  setTimeout(() => {
   if(count2 === 0){
    const butt = document.createElement("button");
    butt.classList.add("submit-array");
    butt.textContent = "Submit array";
    main.appendChild(butt);
    count2 = 1;
   

    butt.addEventListener("click", () => {
      const inputs = document.querySelectorAll(".array-input");
      const arr = [];
      let valid = true;

      inputs.forEach((input) => {
        const val = input.value.trim();
        if (!/^-?\d+$/.test(val)) {
          input.style.border = "2px solid red";
          valid = false;
        } else {
          arr.push(Number(val));
          input.style.border = "2px solid lime";
        }
      });
    

      if (!valid) {
        alert("Only integers are allowed in the array boxes.");
        return;
      }

      console.log("User entered array:", arr);
      insertionSortVisual(arr);
      printSteps(arr);
      // Ready to start insertion sort logic from here
    });
}
  },0);
  


});


function insertionSortVisual(arr) {
  const inputs = document.querySelectorAll(".array-input");

  let i = 1;
  let j, key;

  function animateStep() {
    if (i < arr.length) {
      key = arr[i];
      j = i - 1;

      const innerLoop = () => {
        if (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;

          updateInputs(inputs, arr);

          setTimeout(innerLoop, 500);  // Animate inner loop step
        } else {
          arr[j + 1] = key;
          updateInputs(inputs, arr);

          i++;
          setTimeout(animateStep, 800);  // Proceed to next outer loop step
        }
      };

      innerLoop();
    } else {
      // Final state
      console.log("Sorted array:", arr);
      const message = document.createElement("h1");
      message.textContent = "Array Sorted Successfully";
      message.style.color = "lime";
      message.style.marginTop = "50px";
      main.appendChild(message);
    }
  }

  animateStep();
}



function updateInputs(inputs, arr) {
  inputs.forEach((input, index) => {
    input.value = arr[index];
  });
}

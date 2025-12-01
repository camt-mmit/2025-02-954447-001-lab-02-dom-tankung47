function creatInputComponent() {
  const numberInputs = [...document.querySelectorAll(".app-inp-number")];

  const labelElem = document.createElement("label");

  const bElem = document.createElement("b");
  bElem.textContent = `Number ${numberInputs.length + 1}:`;

  const inputElem = document.createElement("input");
  inputElem.setAttribute("type", "number");
  inputElem.classList.add("app-inp-number");

  labelElem.append(bElem);
  labelElem.append(inputElem);

  inputElem.addEventListener("change", () => {
    const numberInputs = [...document.querySelectorAll(".app-inp-number")];

    const result = numberInputs.reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0
    );

    const numberOutput = document.querySelectorAll(".app-out-number");
    numberOutput.forEach((elem) => (elem.textContent = result));
  });

  const container = document.querySelector(".app-cmp-number-list");
  if (container) {
    container.append(labelElem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addButtons = [...document.querySelectorAll(".app-cmp-number-input")];

  addButtons.forEach((elem) =>
    elem.addEventListener("click", () => {
      creatInputComponent();
    })
  );

  creatInputComponent();
});

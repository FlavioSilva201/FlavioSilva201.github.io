const passowrdInput = document.getElementById("password");
const submitButton = document.getElementById("submit-button");
const errorMessage = document.getElementById("error");

passowrdInput.addEventListener(
    "input",
    () => {
        const password = passowrdInput.value;
        const isValid = password.length > 4 && password.length < 10;
        if (isValid) {
            submitButton.disbled = false;
            errorMessage.textContent = " ";
        } else {
            submitButton.disbled = true;
            errorMessage.textContent = "Tá male";
        }
    },
    false
);
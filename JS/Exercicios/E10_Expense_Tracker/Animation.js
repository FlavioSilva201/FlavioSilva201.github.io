const AddTransiction = document.getElementById("AddTransiction");
const txtDescription = document.getElementById("txtDescription");
const txtAmount = document.getElementById("txtAmount");

const Income = document.getElementById("Income");
const Expense = document.getElementById("Expense");
const balance = document.getElementById("balance");

let gastos = 0;
let total = 0;
let ganhos = 0;

AddTransiction.addEventListener(
    "click",
    () => {
        event.preventDefault();
        let valor = txtAmount.value;
        valor = Number(valor);
        if (valor < 0) {
            console.log("-" + valor);
            gastos += valor;
            total += valor;
        } else if (valor > 0) {
            console.log("+" + valor);
            ganhos += valor;
            total += valor;
        } else if (valor == 0) {
            console.log(valor);
        } else {
            console.log("Valor não valido");
        }
        balance.innerHTML = total + "€";
        Expense.innerHTML = gastos + "€";
        Income.innerHTML = ganhos + "€";
    });
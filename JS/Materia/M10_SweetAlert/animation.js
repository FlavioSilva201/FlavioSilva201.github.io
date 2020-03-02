const AlertNativo = document.getElementById("AlertNativo");
const PromptNativo = document.getElementById("PromptNativo");
const ConfirmNative = document.getElementById("ConfirmNative");

const exemplo1 = document.getElementById("exemplo1");
const exemplo2 = document.getElementById("exemplo2");
const exemplo3Sucesso = document.getElementById("exemplo3Sucesso");
const exemplo3Warning = document.getElementById("exemplo3Warning");
const exemplo3Error = document.getElementById("exemplo3Error");
const exemplo3Info = document.getElementById("exemplo3Info");

AlertNativo.addEventListener(
    "click",
    () => {
        alert("Hello World!");
    });
PromptNativo.addEventListener(
    "click",
    () => {
        let person = prompt("Escreve o teu nome:", "Nome");

        if (person != null) {
            alert("Olá " + person + "! Come é que é?");
        }
    });
ConfirmNative.addEventListener(
    "click",
    () => {
        confirm("Carregas-te no Buttão!");
    });



exemplo1.addEventListener(
    "click",
    () => {
        swal("Olá Pessoal");
    });

exemplo2.addEventListener(
    "click",
    () => {
        swal("Simples Titulo", "Como é que é?");
    });

exemplo3Sucesso.addEventListener(
    "click",
    () => {
        swal("Good job!", "You clicked the button!", "success");
    });
exemplo3Warning.addEventListener(
    "click",
    () => {
        swal("Good job!", "You clicked the button!", "warning");
    });
exemplo3Error.addEventListener(
    "click",
    () => {
        swal("Good job!", "You clicked the button!", "error");
    });
exemplo3Info.addEventListener(
    "click",
    () => {
        swal("Good job!", "You clicked the button!", "info");
    });

exemplo4.addEventListener(
    "click",
    () => {
        swal({
            title: "És o maior!!",
            text: "Clicas-te no butão",
            icon: "success",
        });
    });
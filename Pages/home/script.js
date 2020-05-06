// variavel.trim() -> para remover os espaços em branco

main();

function main() {
    document.getElementById("InpBirthday").setAttribute("max", `${String(new Date().toISOString().slice(0, 10))}`); // Change limite for today
}
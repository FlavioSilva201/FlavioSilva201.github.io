console.log("Break, Continue");

for (i = 0; i <= 5; i++) {
    if (i == 3) {
        break; // o ciclo quebra e acaba ao chegar aqui
    }
    console.log("Repetição: " + i);
}
console.log("Break");


console.log("Ciclo 2");
for (i = 0; i <= 5; i++) {
    if (i == 3) {
        console.log("Continue");
        continue; // o ciclo avança
        console.log("Não entra aqui");
        console.log("Repetição: " + i);
    }
    console.log("Repetição: " + i);
}
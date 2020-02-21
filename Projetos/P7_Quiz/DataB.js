export function add(nomeUser, PontosVar, dataAtual) {
    if (typeof !(Storage) !== "undefined") {
        if (localStorage.localDados === undefined) {
            console.log("Criar o primeiro registro");
            let dados = [{
                localNome: "Flávio",
                localPontos: 100,
                localData: "10/10/2025 11:20:36"
            }];
            localStorage.localDados = dados;

        } else {
            console.log("Adicionar um novo registro");
            let cenas = localStorage.localDados;

            let userDados = [{
                localNome: nomeUser,
                localPontos: PontosVar,
                localData: dataAtual
            }];

            cenas.push(userDados);
            localStorage.localDados = cenas;
        }


    } else {
        console.log("O teu browser não suporta o tipo de armazenamento");
    }
}

export function show() {
    console.log("Hey");
    console.log(dados);
}

export function ordenarPorNome() {

}
export function ordenarPorPontos() {

}
export function ordenarPorData() {

}

export function deletAll() {
    localStorage.clear(dados);
}
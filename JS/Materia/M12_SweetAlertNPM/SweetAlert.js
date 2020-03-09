// instalar ->  npm install sweetalert

import swal from 'sweetalert';

const exemplo1 = document.getElementById("exemplo1");

exemplo1.addEventListener(
    "click",
    () => {
        swal("Hello world!");
    }
)
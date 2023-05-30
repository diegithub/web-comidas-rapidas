const menu = document.querySelector(".menu-hamburger");
const navegacion = document.querySelector(".navegacion");
const imagenes = document.querySelectorAll("img"); //nos regresa un arreglo
const btnTodos = document.querySelector(".todos");
const btnCombos = document.querySelector(".combos");
const btnEnsaladas = document.querySelector(".ensaladas");
const btnPersonalizadas = document.querySelector(".personalizadas");
const btnPostres = document.querySelector(".postres");
const contenedorHamburguesas = document.querySelector(".hamburguesas");
document.addEventListener("DOMContentLoaded", () => {
  eventos();
  hamburguesas();
});

const eventos = () => {
  menu.addEventListener("click", abrirMenu);
};

const abrirMenu = () => {
  navegacion.classList.remove("ocultar");
  btnCerrar();
};

const btnCerrar = () => {
  const botCerrar = document.createElement("p");
  const cubrirPantalla = document.createElement("div");
  cubrirPantalla.classList.add("pantalla-completa");
  const body = document.querySelector("body");
  if (document.querySelectorAll(".pantalla-completa").length > 0) return;
  body.appendChild(cubrirPantalla);
  botCerrar.textContent = "x";
  botCerrar.classList.add("btn-cerrar");

  //while (navegacion.children[5]) {
  //navegacion.removeChild(navegacion.children[5]);
  //}
  navegacion.appendChild(botCerrar);
  cerrarMenu(botCerrar, cubrirPantalla);
};

//Para que las imagenes se carguen de forma asincrona..
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imagen = entry.target;
      imagen.src = imagen.dataset.src;
      observer.unobserve(imagen);
    }
  });
});

imagenes.forEach((imagen) => {
  //recorre las imagenes

  observer.observe(imagen);
});

const cerrarMenu = (boton, cubrirPantalla) => {
  boton.addEventListener("click", () => {
    navegacion.classList.add("ocultar");
    cubrirPantalla.remove();
    boton.remove();
  });
  cubrirPantalla.onclick = function () {
    cubrirPantalla.remove();
    navegacion.classList.add("ocultar");
    boton.remove();
  };
};
// para obtener los diferetes productos que tengo (hamburguesas 12 productos)
const hamburguesas = () => {
  let hamburguesasArreglo = [];
  const hamburguesas = document.querySelectorAll(".hamburguesa");
  //recorrer e ingresar cada hamburguesa a el arreglo
  hamburguesas.forEach(
    (hamburguesa) =>
      (hamburguesasArreglo = [...hamburguesasArreglo, hamburguesa])
  );
  const combos = hamburguesasArreglo.filter(
    (combo) => combo.getAttribute("data-hamburguesa") === "combo"
  );
  const ensaladas = hamburguesasArreglo.filter(
    (ensalada) => ensalada.getAttribute("data-hamburguesa") === "ensalada"
  );
  const creaciones = hamburguesasArreglo.filter(
    (creacion) => creacion.getAttribute("data-hamburguesa") === "creaciones"
  );
  const postres = hamburguesasArreglo.filter(
    (postre) => postre.getAttribute("data-hamburguesa") === "postres"
  );
  mostrarHamburguesas(
    combos,
    ensaladas,
    creaciones,
    postres,
    hamburguesasArreglo
  );
};
// mostrar contenido de cada boton
const mostrarHamburguesas = (combos, ensaladas, creaciones, postres, todos) => {
  btnCombos.addEventListener("click", () => {
    limpiarHtml(contenedorHamburguesas);
    combos.forEach((combo) => contenedorHamburguesas.appendChild(combo));
  });
  btnEnsaladas.addEventListener("click", () => {
    limpiarHtml(contenedorHamburguesas);
    ensaladas.forEach((ensalada) =>
      contenedorHamburguesas.appendChild(ensalada)
    );
  });
  btnPersonalizadas.addEventListener("click", () => {
    limpiarHtml(contenedorHamburguesas);
    creaciones.forEach((creacion) =>
      contenedorHamburguesas.appendChild(creacion)
    );
  });
  btnPostres.addEventListener("click", () => {
    limpiarHtml(contenedorHamburguesas);
    postres.forEach((postre) => contenedorHamburguesas.appendChild(postre));
  });
  btnTodos.addEventListener("click", () => {
    limpiarHtml(contenedorHamburguesas);
    todos.forEach((todo) => contenedorHamburguesas.appendChild(todo));
  });
};

const limpiarHtml = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
};

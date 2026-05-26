let filmeAtual = "";
let precoAtual = 0;
let assentos = [];
let carrinho = [];

/* COMPRA */
function abrirCompra(filme, preco) {
  filmeAtual = filme;
  precoAtual = preco;

  document.getElementById("movieTitle").innerText = filme;
  document.getElementById("price").innerText = "R$" + preco;

  const container = document.getElementById("seats");
  container.innerHTML = "";
  assentos = [];

  for (let i = 1; i <= 30; i++) {
    let seat = document.createElement("div");
    seat.classList.add("seat");
    seat.innerText = i;

    seat.onclick = () => {
      seat.classList.toggle("selected");

      if (assentos.includes(i)) {
        assentos = assentos.filter(s => s !== i);
      } else {
        assentos.push(i);
      }
    };

    container.appendChild(seat);
  }

  document.getElementById("modal").style.display = "flex";
}

/* CARRINHO */
function addCart() {
  carrinho.push({
    filme: filmeAtual,
    preco: precoAtual,
    assentos: assentos
  });

  updateCart();
  closeModal();
}

function updateCart() {
  let div = document.getElementById("cartItems");
  let total = 0;

  div.innerHTML = "";

  carrinho.forEach(item => {
    total += item.preco * item.assentos.length;

    div.innerHTML += `
      <p>${item.filme}<br>💺 ${item.assentos.join(", ")}<br>💰 R$${item.preco * item.assentos.length}</p>
    `;
  });

  document.getElementById("total").innerText = "Total: R$" + total;
}

/* FILTRO */
function filtrar(tipo) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(c => {
    if (tipo === "todos" || c.dataset.genre === tipo) {
      c.style.display = "block";
    } else {
      c.style.display = "none";
    }
  });
}

/* BUSCA */
function buscarFilmes() {
  let value = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
}

/* MODAL */
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function trailer(url) {
  document.getElementById("video").src = url;
  document.getElementById("trailerModal").style.display = "flex";
}

function closeTrailer() {
  document.getElementById("trailerModal").style.display = "none";
  document.getElementById("video").src = "";
}

/* TEMA */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* FORM VALIDATION */
function enviar(e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let msg = document.getElementById("msg").value;

  if (nome && email && msg) {
    alert("Mensagem enviada com sucesso!");
  }
}
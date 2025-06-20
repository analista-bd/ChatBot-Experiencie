let dataBot = [];

async function loadQuestions() {
  try {
    const res = await fetch("preguntas.json");
    const data = await res.json();
    dataBot = data;
    mostrarPreguntasAleatorias(data);
  } catch (err) {
    console.error("Error cargando preguntas:", err);
    addMessage("bot", "No se pudieron cargar las preguntas.");
  }
}

function mostrarPreguntasAleatorias(data) {
  const opciones = document.getElementById("options");
  opciones.innerHTML = "";

  // Reunir todas las preguntas posibles
  let todas = data.flatMap(item => item.preguntas);

  // Mezclar aleatoriamente
  todas = todas.sort(() => Math.random() - 0.5);

  // Mostrar solo 5 al inicio
  const seleccionadas = todas.slice(0, 5);

  seleccionadas.forEach(pregunta => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.textContent = pregunta;
    btn.addEventListener("click", () => {
      addMessage("user", pregunta);
      buscarRespuesta(pregunta);
    });
    opciones.appendChild(btn);
  });
}

function buscarRespuesta(inputTexto) {
  const texto = inputTexto.toLowerCase();

  // Buscar por coincidencia con palabras clave o preguntas
  for (let item of dataBot) {
    const tienePalabra = item.palabrasClave.some(palabra => texto.includes(palabra.toLowerCase()));
    const esPregunta = item.preguntas.some(preg => texto === preg.toLowerCase());

    if (tienePalabra || esPregunta) {
      addMessage("bot", item.respuesta);
      return;
    }
  }

  addMessage("bot", "Lo siento, no tengo una respuesta para eso.");
}

function addMessage(tipo, texto) {
  const msg = document.createElement("div");
  msg.className = `message ${tipo}`;
  msg.textContent = texto;
  const chatBox = document.getElementById("chat-box");
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("send-button").addEventListener("click", () => {
  const input = document.getElementById("user-input");
  const texto = input.value.trim();
  if (texto !== "") {
    addMessage("user", texto);
    buscarRespuesta(texto);
    input.value = "";
  }
});

document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("send-button").click();
  }
});

window.addEventListener("DOMContentLoaded", loadQuestions);

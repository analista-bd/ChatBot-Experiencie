let dataBot = [];

async function loadQuestions() {
  try {
    const res = await fetch("https://defaultc3c0fc1c113943da89a2ba6dd28fd7.2e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d6ee4141b5aa46dd9951f66afdc2645a/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-c3c0fc1c-1139-43da-89a2-ba6dd28fd72e&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wJIZvVGLYn21DwKMStPytWjZOeXd99rJ_NIfE4Xk0YE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });

    const data = await res.json();
    dataBot = data;
    mostrarPreguntasAleatorias();
  } catch (err) {
    console.error("Error al cargar preguntas:", err);
    addMessage("bot", "No se pudieron cargar las preguntas.");
  }
}

function mostrarPreguntasAleatorias() {
  const opciones = document.getElementById("options");
  opciones.innerHTML = "";

  // Reunir todas las preguntas posibles
  let todas = dataBot.flatMap(item => item.preguntas);

  // Mezclar aleatoriamente
  todas = todas.sort(() => Math.random() - 0.5);

  // Mostrar solo 5
  const seleccionadas = todas.slice(0, 3);

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

  // Añadir el botón de recarga al final
  const reloadBtn = document.createElement("button");
reloadBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
reloadBtn.title = "Cambiar preguntas";

  reloadBtn.className = "option-button reload";
  reloadBtn.addEventListener("click", () => {
    mostrarPreguntasAleatorias();
  });
  opciones.appendChild(reloadBtn);
}

function buscarRespuesta(inputTexto) {
  const texto = inputTexto.toLowerCase();

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




function addMessage(tipo, texto) {
  const msg = document.createElement("div");
  msg.className = `message ${tipo}`;
  msg.textContent = texto;
  const chatBox = document.getElementById("chat-box");
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function buscarRespuesta(pregunta) {
  addMessage("user", pregunta);

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pregunta })
    });

    const data = await res.json();
    const respuesta = data.choices[0].message.content;
    addMessage("bot", respuesta);
  } catch (error) {
    console.error("Error al conectar con IA:", error);
    addMessage("bot", "No se pudo conectar con la inteligencia artificial.");
  }
}

document.getElementById("send-button").addEventListener("click", () => {
  const input = document.getElementById("user-input");
  const texto = input.value.trim();
  if (texto !== "") {
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

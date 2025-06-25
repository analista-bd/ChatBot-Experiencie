async function buscarRespuesta(inputTexto) {
  try {
    const res = await fetch("https://defaultc3c0fc1c113943da89a2ba6dd28fd7.2e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/606205ea9a074a75817b91afb6f89a24/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-c3c0fc1c-1139-43da-89a2-ba6dd28fd72e&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y_BAcfeSGt5sMl7nk31PTxapn-fOieWvnTCUsWgY4jM", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texto: inputTexto })
    });

    const data = await res.json();
    if (data.respuesta) {
      addMessage("bot", data.respuesta);
    } else {
      addMessage("bot", "No se recibió una respuesta válida.");
    }

  } catch (err) {
    console.error("Error consultando Power Automate:", err);
    addMessage("bot", "Hubo un error al consultar la respuesta.");
  }
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

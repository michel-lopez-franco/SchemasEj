// Manejo de UI y conexión con el validador

const topicsEl = document.getElementById("topics");
const schemaEl = document.getElementById("schema");
const dataEl = document.getElementById("data");
const resultsEl = document.getElementById("results");
const statusEl = document.getElementById("status");
const validateBtn = document.getElementById("validateBtn");

function pretty(o) {
  return JSON.stringify(o, null, 2);
}

function setExample(ex) {
  schemaEl.value = pretty(ex.schema);
  dataEl.value = typeof ex.data === "string" ? pretty(ex.data) : pretty(ex.data);
  document.querySelectorAll("#topics button").forEach((b) => b.classList.remove("active"));
  const btn = document.querySelector(`#topics button[data-id="${ex.id}"]`);
  if (btn) btn.classList.add("active");
  statusEl.textContent = ex.notes || "";
  resultsEl.innerHTML = "";
}

function renderTopics() {
  topicsEl.innerHTML = "";
  EXAMPLES.forEach((ex, i) => {
    const btn = document.createElement("button");
    btn.textContent = ex.title;
    btn.dataset.id = ex.id;
    btn.addEventListener("click", () => setExample(ex));
    topicsEl.appendChild(btn);
    if (i === 0) setExample(ex);
  });
}

function validateCurrent() {
  let schema, data;
  try {
    schema = JSON.parse(schemaEl.value);
  } catch (e) {
    showErrors([{ path: "$", message: "Schema JSON inválido" }]);
    return;
  }
  try {
    data = JSON.parse(dataEl.value);
  } catch (e) {
    showErrors([{ path: "$", message: "Datos JSON inválidos" }]);
    return;
  }
  const t0 = performance.now();
  const errors = SimpleJSONSchema.validate(schema, data);
  const dt = (performance.now() - t0).toFixed(2);
  if (errors.length === 0) {
    resultsEl.innerHTML = `<div class="result-ok">✓ Válido</div>`;
    statusEl.textContent = `Validación OK en ${dt} ms`;
  } else {
    showErrors(errors);
    statusEl.textContent = `Encontrados ${errors.length} errores en ${dt} ms`;
  }
}

function showErrors(errors) {
  resultsEl.innerHTML = errors
    .map((e) => `<div class="error-item"><span class="result-error">${e.path}:</span> ${escapeHtml(e.message)}</div>`)
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Atajos
validateBtn.addEventListener("click", validateCurrent);
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    validateCurrent();
  }
});

// Init
renderTopics();


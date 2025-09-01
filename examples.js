// Ejemplos de conceptos y casos iniciales

const EXAMPLES = [
  {
    id: "tipos",
    title: "Tipos básicos",
    schema: {
      title: "Cadena simple",
      type: "string",
      minLength: 3,
      maxLength: 12
    },
    data: "hola mundo",
    notes: "Restringe a string con longitud entre 3 y 12."
  },
  {
    id: "objeto-required",
    title: "Objetos y required",
    schema: {
      title: "Usuario",
      type: "object",
      additionalProperties: false,
      properties: {
        nombre: { type: "string", minLength: 2 },
        edad: { type: "integer", minimum: 0 },
        email: { type: "string", pattern: "^.+@.+\\..+$" }
      },
      required: ["nombre", "email"]
    },
    data: {
      nombre: "Ada",
      edad: 36,
      email: "ada@example.com"
    },
    notes: "Demuestra propiedades, required y additionalProperties=false."
  },
  {
    id: "enum-const",
    title: "Enum y Const",
    schema: {
      type: "object",
      properties: {
        rol: { enum: ["admin", "editor", "viewer"] },
        version: { const: 1 }
      },
      required: ["rol", "version"],
      additionalProperties: false
    },
    data: { rol: "editor", version: 1 },
    notes: "Enum limita a valores finitos; const fija un valor exacto."
  },
  {
    id: "arreglos",
    title: "Arreglos (items, min/max)",
    schema: {
      type: "array",
      items: { type: "integer", minimum: 0 },
      minItems: 1,
      maxItems: 5
    },
    data: [1, 2, 3],
    notes: "Items valida cada elemento; minItems/maxItems controlan tamaño."
  },
  {
    id: "numeros",
    title: "Números y rangos",
    schema: {
      type: "number",
      minimum: 1,
      exclusiveMaximum: 10
    },
    data: 3.14,
    notes: "El valor debe ser >= 1 y < 10."
  },
  {
    id: "patrones",
    title: "Patrones (regex)",
    schema: {
      type: "string",
      pattern: "^[A-Z]{3}-\\d{4}$"
    },
    data: "ABC-2025",
    notes: "Usa pattern para validar formato, por ejemplo códigos."
  }
];


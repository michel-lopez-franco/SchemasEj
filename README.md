# Aplicación educativa: Schemas en JavaScript

Esta app web (sin dependencias externas) explica conceptos de JSON Schema y permite validarlos en tiempo real.

## Cómo usarla
- Opción rápida: abre `web/index.html` en tu navegador.
- Servidor local (recomendado para evitar restricciones de `file://`):
  - Python 3: `python3 -m http.server -d web 8080` y visita `http://localhost:8080`.
  - Make: `make serve` (usa Python 3 por debajo).

## Qué incluye
- Validador ligero compatible con: `type`, `properties`, `required`, `additionalProperties`, `items`, `minItems`, `maxItems`, `enum`, `const`, `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`, `minLength`, `maxLength`, `pattern`.
- Ejemplos listos por concepto (tipos, objetos, enum/const, arreglos, números, patrones).
- Edición en vivo de Schema y Datos con resultados instantáneos.

## Estructura
- `web/index.html`: Interfaz principal.
- `web/styles.css`: Estilos.
- `web/validator.js`: Validador de JSON Schema (subconjunto educativo).
- `web/examples.js`: Casos de ejemplo.
- `web/app.js`: Lógica de UI.

## Nota
Este validador es educativo y no cubre todas las palabras clave de JSON Schema. Para producción considera librerías como AJV, Zod o Yup.

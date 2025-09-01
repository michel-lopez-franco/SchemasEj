// Validador ligero de JSON Schema (subconjunto útil para educación)
// Soporta: type, properties, required, additionalProperties, items, minItems, maxItems,
// enum, const, minimum, maximum, exclusiveMinimum, exclusiveMaximum, minLength, maxLength, pattern

(function (global) {
  function typeOf(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value; // string, number, boolean, object, function, undefined
  }

  function isInteger(n) {
    return typeof n === "number" && Number.isInteger(n);
  }

  function validate(schema, data) {
    const errors = [];

    function push(path, message) {
      errors.push({ path, message });
    }

    function check(schemaNode, value, path) {
      if (!schemaNode || typeof schemaNode !== "object") return;

      // type
      if (schemaNode.type) {
        const allowedTypes = Array.isArray(schemaNode.type)
          ? schemaNode.type
          : [schemaNode.type];
        const t = typeOf(value);
        if (!allowedTypes.includes(t) && !(schemaNode.type === "integer" && isInteger(value))) {
          push(path, `tipo esperado ${allowedTypes.join("|")}, recibido ${t}`);
          return; // si el tipo no coincide, evita cascada de errores
        }
      }

      // const / enum
      if (Object.prototype.hasOwnProperty.call(schemaNode, "const")) {
        if (JSON.stringify(value) !== JSON.stringify(schemaNode.const)) {
          push(path, `debe ser const = ${JSON.stringify(schemaNode.const)}`);
        }
      }
      if (schemaNode.enum) {
        const ok = schemaNode.enum.some((v) => JSON.stringify(v) === JSON.stringify(value));
        if (!ok) push(path, `debe ser uno de enum ${JSON.stringify(schemaNode.enum)}`);
      }

      // string constraints
      if (schemaNode.type === "string" && typeof value === "string") {
        if (schemaNode.minLength != null && value.length < schemaNode.minLength) {
          push(path, `longitud mínima ${schemaNode.minLength}`);
        }
        if (schemaNode.maxLength != null && value.length > schemaNode.maxLength) {
          push(path, `longitud máxima ${schemaNode.maxLength}`);
        }
        if (schemaNode.pattern) {
          try {
            const re = new RegExp(schemaNode.pattern);
            if (!re.test(value)) push(path, `no cumple pattern /${schemaNode.pattern}/`);
          } catch (e) {
            push(path, `pattern inválido: ${schemaNode.pattern}`);
          }
        }
      }

      // number/integer constraints
      if ((schemaNode.type === "number" || schemaNode.type === "integer") && typeof value === "number") {
        if (schemaNode.minimum != null && value < schemaNode.minimum) {
          push(path, `mínimo ${schemaNode.minimum}`);
        }
        if (schemaNode.maximum != null && value > schemaNode.maximum) {
          push(path, `máximo ${schemaNode.maximum}`);
        }
        if (schemaNode.exclusiveMinimum != null && value <= schemaNode.exclusiveMinimum) {
          push(path, `exclusivo mínimo > ${schemaNode.exclusiveMinimum}`);
        }
        if (schemaNode.exclusiveMaximum != null && value >= schemaNode.exclusiveMaximum) {
          push(path, `exclusivo máximo < ${schemaNode.exclusiveMaximum}`);
        }
        if (schemaNode.type === "integer" && !isInteger(value)) {
          push(path, `debe ser entero`);
        }
      }

      // object
      if (schemaNode.type === "object" && value && typeof value === "object" && !Array.isArray(value)) {
        const props = schemaNode.properties || {};
        const required = schemaNode.required || [];
        // required
        for (const r of required) {
          if (!Object.prototype.hasOwnProperty.call(value, r)) {
            push(path ? `${path}.${r}` : r, `propiedad requerida ausente`);
          }
        }
        // properties
        for (const [key, v] of Object.entries(value)) {
          if (props[key]) {
            check(props[key], v, path ? `${path}.${key}` : key);
          } else {
            if (schemaNode.additionalProperties === false) {
              push(path ? `${path}.${key}` : key, `propiedad no permitida`);
            }
          }
        }
      }

      // array
      if (schemaNode.type === "array" && Array.isArray(value)) {
        const items = schemaNode.items;
        if (schemaNode.minItems != null && value.length < schemaNode.minItems) {
          push(path, `minItems ${schemaNode.minItems}`);
        }
        if (schemaNode.maxItems != null && value.length > schemaNode.maxItems) {
          push(path, `maxItems ${schemaNode.maxItems}`);
        }
        if (items) {
          for (let i = 0; i < value.length; i++) {
            check(items, value[i], `${path}[${i}]`);
          }
        }
      }
    }

    check(schema, data, "$");
    return errors;
  }

  global.SimpleJSONSchema = { validate };
})(window);


import jsonschema
import json

# Definimos el schema
schema = {
    "type": "object",
    "properties": {
        "nombre": {"type": "string"},
        "edad": {"type": "integer", "minimum": 0}
    },
    "required": ["nombre", "edad"]
}

# Ejemplo de JSON
data = {"nombre": "Michel", "edad": 30}

try:
    jsonschema.validate(instance=data, schema=schema)
    print("✅ JSON válido")
except jsonschema.exceptions.ValidationError as e:
    print("❌ JSON inválido:", e.message)


#if __name__ == "__main__":
#    main()

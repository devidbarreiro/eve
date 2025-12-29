#!/bin/bash

# Script para iniciar OpenAI Realtime Console con Docker

set -e

echo "🚀 Iniciando OpenAI Realtime Console..."

# Verificar que existe el archivo .env
if [ ! -f .env ]; then
    echo "⚠️  No se encontró el archivo .env"
    echo "📝 Creando .env desde .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Archivo .env creado. Por favor, edítalo y añade tu OPENAI_API_KEY"
        echo "   nano .env"
        exit 1
    else
        echo "❌ No existe .env.example. Creando .env básico..."
        cat > .env << EOF
OPENAI_API_KEY=sk-your-api-key-here
PORT=3000
EOF
        echo "✅ Archivo .env creado. Por favor, edítalo y añade tu OPENAI_API_KEY"
        echo "   nano .env"
        exit 1
    fi
fi

# Verificar que OPENAI_API_KEY está configurado
if ! grep -q "OPENAI_API_KEY=sk-" .env 2>/dev/null; then
    echo "⚠️  OPENAI_API_KEY no está configurado correctamente en .env"
    echo "   Por favor, edita .env y añade tu clave de API de OpenAI"
    exit 1
fi

# Construir y levantar el contenedor
echo "🔨 Construyendo imagen Docker..."
docker-compose build

echo "▶️  Iniciando contenedor..."
docker-compose up -d

echo "✅ Aplicación iniciada!"
echo ""
echo "📊 Ver logs: docker-compose logs -f"
echo "🛑 Detener: docker-compose down"
echo "🔄 Reiniciar: docker-compose restart"
echo "🌐 Acceder: http://localhost:3000"
echo ""

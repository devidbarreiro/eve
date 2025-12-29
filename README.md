# Eve - Asistente de IA para Raspberry Pi

Proyecto para crear un asistente de inteligencia artificial con capacidad de voz en tiempo real para Raspberry Pi, usando OpenAI Realtime API.

## 📋 Descripción

Este proyecto tiene como objetivo crear un asistente de IA que pueda mantener conversaciones en tiempo real por voz, inicialmente usando la API Realtime de OpenAI y preparado para funcionar en una Raspberry Pi.

## 📁 Estructura del Proyecto

```
eve/
├── openai-realtime-console/    # Consola web para OpenAI Realtime API
│   ├── client/                  # Frontend React
│   ├── server.js                # Servidor Express
│   └── package.json
├── venv/                        # Entorno virtual Python
└── README.md                    # Este archivo
```

## 🚀 Estado Actual

### ✅ Lo que ya tienes

- **Consola OpenAI Realtime**: Aplicación web completa que permite comunicación en tiempo real con la API de OpenAI usando WebRTC
- **Backend Express**: Servidor Node.js que gestiona las sesiones y tokens
- **Frontend React**: Interfaz web para interactuar con el modelo
- **Entorno Python**: Configurado con dependencias útiles:
  - `websockets`: Para comunicación WebSocket
  - `numpy`: Para procesamiento numérico
  - `pyaudio`: Para captura y reproducción de audio

### 🔄 Próximos Pasos

1. **Integración con Raspberry Pi**:
   - Adaptar captura de audio desde micrófono en la Raspberry
   - Configurar salida de audio para el altavoz
   - Adaptar el código para funcionar en la Raspberry Pi

2. **Funcionalidad 24/7**:
   - Configurar como servicio systemd
   - Implementar monitoreo de temperatura
   - Optimizar para recursos limitados

3. **Mejoras Futuras**:
   - Considerar modelos locales como alternativa
   - Implementar function calling para control del robot
   - Integración con hardware (GPIO, sensores, etc.)

## 🖥️ Requisitos de Hardware (para Raspberry Pi)

- **Raspberry Pi 5** (4GB RAM mínimo, 8GB recomendado)
- Tarjeta microSD de al menos 64GB (clase 10 o superior)
- Fuente de alimentación oficial de Raspberry Pi 5 (27W)
- Micrófono USB o compatible con GPIO
- Altavoz USB o compatible con GPIO
- Disipador de calor o ventilador (recomendado para funcionamiento 24/7)
- Opcional: SSD externo para mejor rendimiento

## 🔧 Requisitos de Software

- Node.js (v18 o superior)
- Python 3.9 o superior
- OpenAI API Key
- Raspberry Pi OS (64-bit) - cuando despliegues en la Pi

## 🛠️ Instalación

### 1. Configurar la consola OpenAI Realtime

```bash
cd openai-realtime-console
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en `openai-realtime-console/`:

```bash
OPENAI_API_KEY=tu_api_key_aqui
PORT=3000
```

### 3. Activar entorno virtual Python (opcional)

```bash
source venv/bin/activate
```

## 🎯 Uso

### Desarrollo Local

Para probar la consola localmente:

```bash
cd openai-realtime-console
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### En Raspberry Pi

1. **Preparar el sistema**:

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias básicas
sudo apt install -y nodejs npm python3-pip python3-venv git build-essential portaudio19-dev
```

2. **Instalar dependencias del proyecto**:

```bash
cd openai-realtime-console
npm install
```

3. **Configurar audio** (si usas pyaudio):

```bash
source ../venv/bin/activate
pip install pyaudio
```

### Ejecutar como servicio (24/7)

Para que el asistente funcione continuamente en Raspberry Pi:

```bash
# Crear archivo de servicio systemd
sudo nano /etc/systemd/system/eve-assistant.service
```

Contenido del servicio:

```ini
[Unit]
Description=Eve AI Assistant
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/eve/openai-realtime-console
Environment="NODE_ENV=production"
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Activar el servicio:

```bash
sudo systemctl enable eve-assistant.service
sudo systemctl start eve-assistant.service
```

## 🎤 Funcionalidad Realtime

La aplicación implementa:

- ✅ Conexión WebRTC con OpenAI Realtime API
- ✅ Captura de audio desde el navegador
- ✅ Reproducción de audio del modelo
- ✅ Envío y recepción de eventos en tiempo real
- ✅ Function calling (preparado para extender)

## 📊 Consideraciones de Rendimiento

- La API Realtime de OpenAI requiere conexión a internet estable
- Para Raspberry Pi, considera usar un servidor intermedio si los recursos son limitados
- El funcionamiento 24/7 requiere monitoreo de temperatura
- Optimizar calidad de audio según recursos disponibles

## 🔄 Mantenimiento

- Monitorear la temperatura del dispositivo
- Verificar logs regularmente: `journalctl -u eve-assistant.service`
- Actualizar dependencias periódicamente
- Revisar uso de API y costos de OpenAI

## 📝 Notas

- El proyecto está en desarrollo activo
- La consola actual funciona en navegador (requiere permisos de micrófono)
- Para Raspberry Pi, necesitarás adaptar la captura de audio
- Considera usar un servidor intermedio si la Raspberry tiene recursos limitados

## 🔗 Recursos

- [OpenAI Realtime API Docs](https://platform.openai.com/docs/guides/realtime)
- [OpenAI Realtime Console](https://github.com/openai/openai-realtime-console)

## 📄 Licencia

MIT (ver LICENSE en openai-realtime-console/)



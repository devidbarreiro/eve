# Asistente de IA para Raspberry Pi 5

Proyecto para crear un asistente de inteligencia artificial que funcione 24/7 en una Raspberry Pi 5, ejecutando un modelo de lenguaje localmente.

## 📋 Descripción

Este proyecto tiene como objetivo instalar y configurar un modelo de IA en una Raspberry Pi 5 para crear un asistente que funcione de forma continua, sin necesidad de conexión a servicios en la nube.

## 🖥️ Requisitos de Hardware

- **Raspberry Pi 5** (4GB RAM mínimo, 8GB recomendado)
- Tarjeta microSD de al menos 64GB (clase 10 o superior)
- Fuente de alimentación oficial de Raspberry Pi 5 (27W)
- Disipador de calor o ventilador (recomendado para funcionamiento 24/7)
- Opcional: SSD externo para mejor rendimiento

## 🔧 Requisitos de Software

- Raspberry Pi OS (64-bit) - versión más reciente
- Python 3.9 o superior
- pip y venv

## 🚀 Instalación

### 1. Preparar el sistema

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias básicas
sudo apt install -y python3-pip python3-venv git build-essential
```

### 2. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd eve
```

### 3. Crear entorno virtual

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Instalar dependencias

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## ⚙️ Configuración

1. Copiar el archivo de configuración de ejemplo:
```bash
cp config.example.json config.json
```

2. Editar `config.json` con tus preferencias:
   - Modelo a utilizar
   - Parámetros de generación
   - Configuración de hardware

## 🎯 Uso

### Iniciar el asistente

```bash
source venv/bin/activate
python main.py
```

### Ejecutar como servicio (24/7)

Para que el asistente funcione continuamente, puedes configurarlo como un servicio systemd:

```bash
sudo cp eve-assistant.service /etc/systemd/system/
sudo systemctl enable eve-assistant.service
sudo systemctl start eve-assistant.service
```

## 🤖 Modelos Recomendados

Para Raspberry Pi 5, se recomiendan modelos optimizados y ligeros:

- **Llama 3.2 1B/3B** - Modelo ligero y eficiente
- **Phi-3 Mini** - Optimizado para dispositivos edge
- **TinyLlama** - Muy ligero, ideal para hardware limitado
- **Gemma 2B** - Balance entre rendimiento y tamaño

## 📊 Consideraciones de Rendimiento

- Los modelos más grandes pueden requerir cuantización (4-bit o 8-bit)
- Se recomienda usar bibliotecas optimizadas como `llama.cpp` o `transformers` con optimizaciones
- Para mejor rendimiento, considera usar un SSD externo en lugar de la microSD
- El funcionamiento 24/7 requiere monitoreo de temperatura

## 🔄 Mantenimiento

- Monitorear la temperatura del dispositivo
- Verificar logs regularmente
- Actualizar el modelo y dependencias periódicamente

## 📝 Notas

- El proyecto está en desarrollo activo
- El rendimiento puede variar según el modelo seleccionado
- Se recomienda comenzar con modelos pequeños y escalar según necesidad

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📄 Licencia

[Especificar licencia]


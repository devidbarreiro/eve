# Hardware: El Cuerpo Físico de Eve

Este documento describe la arquitectura de hardware planificada para darle un cuerpo físico (impreso en 3D) a la instancia de inteligencia artificial de Eve.

## Visión General
El objetivo es construir un torso o humanoide a escala (basado en proyectos Open Source como InMoov) controlado por la Raspberry Pi, que actuará de cerebro local conectándose al dashboard / Molty.

## Lista de Componentes y Costes Estimados

### 1. El Cuerpo (Chasis y Piezas)
Se imprimirán las piezas en 3D usando modelos Open Source (ej. manos de InMoov o brazos completos).
*   **Material:** Filamento PLA / PETG (aprox 10-15kg para tamaño real de medio cuerpo).
*   **Coste estimado:** ~150€ - 220€.

### 2. Músculos (Servomotores)
Para el movimiento de las articulaciones de los brazos y manos. **Importante: Usar solo servos de 180° o 270° (NUNCA de rotación continua 360°).**
*   **Antebrazo y Dedos:** 12x Servos estándar **MG996R** (180° / Engranajes Metálicos). ~45€.
*   **Hombros y Codos (Alto Torque):** 8x Servos de 60kg u 80kg (ej. DS5160). ~200€.
*   **Coste total:** ~250€.

### 3. Sistema Nervioso (Controladores PWM)
La Raspberry Pi necesita placas de expansión I2C para controlar múltiples servos sin problemas de temporización de hardware.
*   **Placa:** Módulo PCA9685 de 16 Canales (12-bit PWM).
*   **Cantidad:** 1 o 2 módulos (dependiendo de la cantidad final de motores).
*   **Coste total:** ~10€ - 20€.

### 4. Alimentación
Los servos consumen un pico alto de amperaje (2A-3A cada uno).
*   **Opción A:** Fuente de alimentación ATX de PC (500W-600W). Muy barata y proporciona múltiples raíles estables de 5V y 12V con mucho amperaje.
*   **Opción B:** Fuente conmutada industrial de 5V / 40A-60A.
*   **Coste total:** ~30€ - 50€.

### 5. Esqueleto y Mecánica (Ferretería)
*   Hilo de pescar trenzado de alta resistencia (actuará como los tendones de los dedos).
*   Tornillería variada (M3, M4, M8).
*   Rodamientos.
*   Cables DuPont, AWG de buen grosor para la distribución de energía.
*   **Coste total:** ~50€.

### 6. Sentidos (Sensores)
*   **Visión:** Webcam HD pequeña incrustada en el ojo (conectada por USB a la Raspberry) para MediaPipe y OpenAI Vision.
*   **Oído y Voz:** Micrófono de arreglo (array) y altavoz bluetooth o conectado por minijack / I2S a la Raspberry.
*   **Coste total:** ~40€.

---

## Próximos Pasos (MVP - Fase 1)
Antes de imprimir un robot completo, el hito inicial es construir **solo un brazo/mano**:
1. Imprimir las piezas de una mano robótica.
2. Ensamblar usando hilo de pescar y gomas tensoras.
3. Conectar 5 servos **MG996R** a una placa **PCA9685**.
4. Conectar la PCA9685 a la Raspberry Pi (I2C) y escribir un script en Python/Node para abrir y cerrar los dedos.
5. Integrar el control en la consola de Eve para que responda a comandos verbales ("cierra la mano").
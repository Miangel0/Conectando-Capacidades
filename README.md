# Conectando Capacidades

## Descripción

Este proyecto implementa un backend que combina:
- **Procesamiento de video**: Detección de puntos clave (keypoints) utilizando *MediaPipe*.
- **Machine Learning**: Predicción de acciones mediante un modelo preentrenado (*Keras*).
- **Gestión de usuarios**: APIs REST para registrar y autenticar usuarios con Flask.
- **Text-to-Speech**: Conversión de texto a voz usando *gTTS*.

## Estructura del Proyecto

### Archivos principales

#### Código base
1. **`App.py`**: 
   - Archivo principal del backend. Proporciona endpoints REST para gestionar usuarios y procesamiento de video en tiempo real.
2. **`capture_samples.py`**:
   - Captura y guarda muestras de datos para entrenamiento o evaluación del modelo.
3. **`confusion_matrix.py`**:
   - Genera matrices de confusión para evaluar el rendimiento del modelo de machine learning.
4. **`constants.py`**:
   - Define constantes utilizadas en diferentes partes del proyecto.
5. **`create_keypoints.py`**:
   - Genera puntos clave (keypoints) de datos de entrada para su uso en el modelo.
6. **`evaluate_model.py`**:
   - Realiza la evaluación de datos en un modelo preentrenado.
7. **`helpers.py`**:
   - Funciones auxiliares reutilizables en todo el proyecto.
8. **`model.py`**:
   - Define y maneja el modelo principal utilizado en el backend.
9. **`normalize_samples.py`**:
   - Normaliza muestras de datos para garantizar consistencia en la entrada del modelo.
10. **`process_video.py`**:
    - Procesa videos para detección de puntos clave y predicción de acciones.
11. **`server.py`**:
    - Maneja la integración del modelo con el flujo de datos de video.

#### Text-to-Speech
12. **`text_to_speech.py`**:
    - Convierte texto en audio utilizando la biblioteca gTTS.

#### Entrenamiento del Modelo
13. **`training_model.py`**:
    - Código para entrenar modelos de machine learning basados en los datos capturados.

#### Requisitos y Configuración
14. **`requirements.txt`**:
    - Lista de todas las dependencias necesarias para ejecutar el proyecto.

#### Base de Datos
15. **`bd/conectando_users.sql`**:
    - Script SQL para inicializar la base de datos de usuarios.

#### Modelos y Configuración
16. **`models/actions_15.keras`**:
    - Modelo preentrenado para la predicción de acciones.
17. **`models/words.json`**:
    - Configuración de palabras o acciones reconocibles por el modelo.


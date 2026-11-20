# Apartado de Transparencia y Declaración de Uso de Inteligencia Artificial
**Hackatón UAT CUTM Sur - Facultad de Ingeniería Tampico**

---

## 1. Declaración General de Uso Ético y Transparente
En cumplimiento con los lineamientos oficiales del Hackatón, el equipo declara de manera abierta y transparente el uso de herramientas de Inteligencia Artificial Generativa como asistente y acelerador durante las fases del ciclo de vida del proyecto.

---

## 2. Herramientas de IA Utilizadas
* **Gemini (Google DeepMind) / Google Antigravity:** Asistencia en ingeniería de requisitos, arquitectura de software, estructuración de Google Apps Script y redacción técnica bajo estándares IEEE 830 e ISO/IEC 25010.

---

## 3. Porcentaje de Apoyo Brindado por IA

| Actividad | Porcentaje (%) | Justificación del Apoyo |
| :--- | :---: | :--- |
| **Análisis** | **35%** | Apoyo en la formulación de preguntas de entrevistas de campo, definición de casos de uso y matriz de requisitos funcionales y no funcionales. |
| **Diseño** | **30%** | Generación de diagramas de arquitectura en sintaxis Mermaid (modelo entidad-relación y diagramas de secuencia) y diseño del esquema relacional de Google Sheets. |
| **Programación** | **40%** | Generación de plantillas de código para Google Apps Script (`Code.gs`), llamadas a API de SpreadsheetApp y maquetación responsiva con Bootstrap 5 y Chart.js en `Index.html`. |
| **Documentación** | **45%** | Estructuración del formato formal SRS IEEE 830, redacción del manual de usuario y desglose cronometrado del guión para el video demostrativo. |

---

## 4. Evidencias de Levantamiento y Prompts Utilizados

### Evidencia 1: Ingeniería de Requisitos
* **Prompt Utilizado:**
  > *"Actúa como un Ingeniero de Requisitos Senior. Diseña un documento SRS bajo la norma IEEE 830 para un sistema de control de acceso vehicular en las 3 casetas del campus CUTM Sur de la UAT con Google Apps Script y Google Sheets, incluyendo 4 entrevistas de campo estructuradas con preguntas y respuestas."*
* **Resultado Obtenido:** Estructura completa de las 4 entrevistas a personal de caseta, administración, seguridad y alumnos, con derivación directa a los requisitos RF-001 al RF-009 y RNF-001 al RNF-005.

### Evidencia 2: Optimización de Concurrencia en Apps Script
* **Prompt Utilizado:**
  > *"Genera el código en Google Apps Script para registrar entradas y salidas de vehículos calculando el tiempo de estancia en minutos, previniendo dobles ingresos si el auto ya está en estatus DENTRO y manteniendo una bitácora de auditoría inalterable."*
* **Resultado Obtenido:** Funciones modulares `registrarEntrada()`, `registrarSalida()`, `obtenerVehiculosDentro()` y `obtenerEstadisticas()` en `Code.gs`.

---

## 5. Beneficios Obtenidos y Limitaciones Encontradas

### Beneficios Obtenidos:
1. **Reducción del Tiempo de Desarrollo:** Aceleración en la generación de la interfaz web responsiva y fórmulas de Google Sheets, permitiendo enfocar los esfuerzos en la experiencia de usuario y trabajo de campo.
2. **Alineación con Estándares Internacionales:** Garantía de cumplimiento estricto con las normas IEEE 830 e ISO 25010 exigidas en la rúbrica del jurado.
3. **Calidad de Código:** Modularidad en funciones de backend y prevención de errores comunes en llamadas `google.script.run`.

### Limitaciones Encontradas:
1. **Contexto Específico de Campus:** La IA no conoce la geografía física ni el flujo real de las avenidas de Tampico (Blv. Adolfo López Mateos); esto requirió la intervención directa del equipo para adaptar los nombres de las 3 casetas y dinámicas locales.
2. **Dependencias del Ecosistema Google:** Fue necesario ajustar manualmente las llamadas asíncronas para garantizar que la Web App funcione correctamente tanto en versión de escritorio como en navegadores móviles.

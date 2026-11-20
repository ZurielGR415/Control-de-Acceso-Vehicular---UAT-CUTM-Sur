# Guión Técnico y Cronometrado: Video Demostrativo
## Sistema de Control de Acceso Vehicular - UAT CUTM Sur
**Duración Total Estimada:** 8 minutos (dentro del rango oficial de 5 a 10 minutos)

---

## Estructura General del Video

```mermaid
gantt
    title Cronograma del Video Demostrativo (8 Minutos)
    dateFormat  m:s
    axisFormat  %M:%S
    
    section 1. Problemática
    Problemática actual y cuellos de botella :00:00, 01:00
    
    section 2. Levantamiento
    Entrevistas de campo y requisitos       :01:00, 03:00
    
    section 3. Demostración en Vivo
    Inicio de sesión y Caseta 1             :03:00, 03:45
    Registro de Entrada y Validación Placa  :03:45, 04:45
    Salida en 1 clic y cálculo estancia     :04:45, 05:30
    Consultas avanzadas y exportación Excel :05:30, 06:15
    Dashboard analítico y horas pico        :06:15, 07:00
    
    section 4. Cierre
    Conclusiones, impacto y visión futura   :07:00, 08:00
```

---

## Desglose Minuto a Minuto

### Minuto 00:00 a 01:00 (1 Minuto) — Bloque 1: Problemática Actual
* **Visual en Pantalla:** 
  * Portada con logotipo de la UAT y Facultad de Ingeniería Tampico (F1).
  * Fotografías o imágenes de referencia de las casetas del campus CUTM Sur (Caseta 1 Principal sobre Blv. López Mateos).
  * Muestra de una libreta física de papel con anotaciones manuales borrosas.
* **Voz en Off / Locución:**
  > *"Muy buenos días, jurado evaluador. En el Centro Universitario Tampico-Madero Sur de la UAT, diariamente ingresan cientos de vehículos entre estudiantes, docentes, personal administrativo y visitantes externos distribuidos en tres casetas de acceso. Actualmente, este registro se realiza de forma manual en libretas de papel. Este método provoca tres graves problemas: primero, cuellos de botella en horas pico que generan filas de hasta 15 vehículos; segundo, falta de certeza sobre qué automóviles permanecen dentro del campus al anochecer; y tercero, imposibilidad de generar reportes estadísticos confiables para la administración universitaria. Para resolverlo, desarrollamos el Sistema de Control de Acceso Vehicular basado en Google Apps Script y Google Sheets."*

---

### Minuto 01:00 a 03:00 (2 Minutos) — Bloque 2: Entrevistas y Levantamiento de Requisitos
* **Visual en Pantalla:** 
  * Diapositivas con la síntesis de las 4 entrevistas realizadas y fotografías del trabajo de campo.
  * Tabla resumen de hallazgos y diagrama de casos de uso (IEEE 830).
* **Voz en Off / Locución:**
  > *"Para diseñar una solución verdaderamente adaptada a la realidad operativa, realizamos un riguroso levantamiento de requisitos mediante cuatro entrevistas obligatorias:*
  > *1. Con el personal operativo de caseta, descubrimos que un registro en papel tarda más de 30 segundos, por lo que establecimos como meta operativa un tiempo de registro menor a 3 segundos.*
  > *2. La administración del campus nos solicitó visibilidad en tiempo real para conocer cuántos autos están dentro en cada momento y auditar salidas por casetas distintas a la de entrada.*
  > *3. El área de seguridad universitaria demandó una bitácora inalterable y control específico para visitantes externos.*
  > *4. Y los estudiantes y docentes manifestaron la necesidad de un sistema que reconozca automáticamente su matrícula sin demoras.*
  > *Todo este análisis quedó formalizado bajo los estándares internacionales IEEE 830, ISO 29148 e ISO 25010, derivando en 9 requisitos funcionales clave."*

---

### Minuto 03:00 a 07:00 (4 Minutos) — Bloque 3: Demostración del Sistema en Vivo (Navegador)

#### Segmento 3.1: Entorno y Selección de Caseta (03:00 - 03:45)
* **Visual en Pantalla:** 
  * Grabación directa del navegador web mostrando la interfaz con los colores institucionales de la UAT (azul y naranja).
  * Demostración del selector de caseta: se cambia de *Caseta 1 (Principal)* a *Caseta 2 (Norte)* y *Caseta 3 (Sur)*.
* **Locución:**
  > *"Aquí tenemos la plataforma web. Es 100% responsiva y se ejecuta sobre Google Apps Script conectado directamente a Google Sheets. En la barra superior, el oficial selecciona la caseta que está operando en su turno. Vemos también el reloj sincronizado en tiempo real y el indicador de conexión activa."*

#### Segmento 3.2: Registro de Entrada Vehicular (03:45 - 04:45)
* **Visual en Pantalla:** 
  * Se escribe la placa `ABC1234` y se presiona Enter.
  * La pantalla despliega al instante la tarjeta verde: *"Autorizado: Docente - Dr. Juan Carlos Pérez - Facultad de Ingeniería Tampico"*.
  * Se hace clic en **REGISTRAR ENTRADA**.
  * Aparece la alerta de confirmación de SweetAlert2 y el vehículo pasa a la lista de autos en campus.
  * A continuación, se captura una placa no registrada (`VIS-9988`), se muestra cómo el sistema lo clasifica automáticamente como *Visitante*, se anota el nombre y motivo y se registra el acceso.
* **Locución:**
  > *"Para dar acceso a un vehículo, el guardia solo digita la placa. Al presionar Enter, el sistema consulta en milisegundos el catálogo maestro de Google Sheets. Como vemos, reconoce de inmediato al Dr. Juan Carlos Pérez, docente de la F1. Damos clic en 'Registrar Entrada' y en menos de 2 segundos el acceso queda grabado con fecha y hora exacta. Si llega un visitante externo, el sistema lo detecta como no empadronado, permitiendo ingresar el nombre y motivo de visita sin perder agilidad."*

#### Segmento 3.3: Registro de Salida en 1 Clic (04:45 - 05:30)
* **Visual en Pantalla:** 
  * Se muestra la tabla derecha: *"Vehículos en Campus (Pendientes de Salida)"*.
  * Se observa la placa ingresada, con su hora de entrada y el contador de minutos de estancia.
  * Se hace clic en el botón rojo **"Salida"**.
  * Se confirma y el sistema muestra el mensaje con el cálculo automático del tiempo de permanencia.
* **Locución:**
  > *"En el panel derecho tenemos el monitoreo en vivo de todas las unidades dentro de la UAT. Cuando el vehículo sale del campus —incluso si sale por una caseta diferente a la que entró— el oficial únicamente hace un clic en el botón 'Salida'. El sistema concluye el folio, registra la hora de egreso y calcula automáticamente el tiempo total de estancia en minutos."*

#### Segmento 3.4: Consultas Avanzadas y Exportación a Excel (05:30 - 06:15)
* **Visual en Pantalla:** 
  * Clic en la pestaña **"Consultas y Filtros"**.
  * Se filtra por tipo de usuario (*Docente*) y por Caseta 1.
  * Se presiona **"Buscar Registros"** y se observa la tabla resultante.
  * Clic en el botón verde **"Exportar a Excel (CSV)"**; se muestra la descarga del archivo `.csv`.
* **Locución:**
  > *"En el módulo de consultas, el personal de seguridad y auditoría puede filtrar por placa específica, rangos de fechas, caseta o tipo de usuario. Toda la información histórica se consulta de inmediato y puede exportarse con un solo clic a formato Excel para su resguardo institucional."*

#### Segmento 3.5: Dashboard Analítico y Horas Pico (06:15 - 07:00)
* **Visual en Pantalla:** 
  * Clic en la pestaña **"Dashboard y Reportes"**.
  * Enfoque en los 4 KPIs superiores (Autos dentro, ingresos hoy, caseta líder).
  * Explicación del histograma de barras con las horas pico (picos de 07:00 AM y 13:00 PM).
  * Gráfica de dona por tipo de usuario y gráfica de barras por caseta.
* **Locución:**
  > *"Por último, el Dashboard gerencial ofrece a los directivos indicadores clave en tiempo real: vehículos dentro ahora, afluencia total de hoy y el histograma interactivo de horas pico, permitiendo identificar que entre 7 y 8 de la mañana se concentra el 40% del tráfico. Esto permite tomar decisiones basadas en datos para reforzar el personal de casetas en los horarios de mayor demanda."*

---

### Minuto 07:00 a 08:00 (1 Minuto) — Bloque 4: Conclusiones y Mejoras Futuras
* **Visual en Pantalla:** 
  * Cuadro comparativo: Antes (Libreta física) vs. Ahora (Sistema Web UAT).
  * Hoja de cálculo de Google Sheets con los datos sincronizados en tiempo real.
  * Créditos del equipo, Facultad de Ingeniería Tampico, y agradecimiento al jurado.
* **Locución:**
  > *"En conclusión, hemos transformado un proceso manual y lento de más de 30 segundos en una solución digital ágil, segura y confiable que registra accesos en menos de 3 segundos, cumpliendo al 100% con los requerimientos técnicos y de ingeniería del Hackatón. Como trabajo a futuro, el sistema está preparado para integrar lectura de códigos QR institucionales en la credencial de alumno/docente y cámaras con reconocimiento automático de placas (LPR). Muchas gracias."*

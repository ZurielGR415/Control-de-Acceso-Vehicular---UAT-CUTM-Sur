# Manual de Usuario
## Sistema de Control de Acceso Vehicular - UAT CUTM Sur
**Facultad de Ingeniería Tampico - Universidad Autónoma de Tamaulipas**

---

## 1. Introducción al Sistema
El **Sistema de Control de Acceso Vehicular de la UAT CUTM Sur** es una plataforma web desarrollada en **Google Apps Script** y **Google Sheets**, diseñada para operar de manera ágil tanto en computadoras de escritorio de caseta como en dispositivos móviles (tablets o smartphones de los guardias de seguridad).

---

## 2. Inicio de Sesión y Selección de Caseta

### Paso 1: Acceso a la Plataforma
1. Abra el navegador web institucional e ingrese a la URL de la aplicación web de Google Apps Script.
2. Inicie sesión con su cuenta de correo institucional `@uat.edu.mx`.

### Paso 2: Selección de Caseta de Operación
En la esquina superior derecha de la barra de navegación institucional (color azul marino UAT), seleccione la caseta física donde se encuentra asignado:
* **Caseta 1 (Principal):** Boulevard Adolfo López Mateos.
* **Caseta 2 (Acceso Norte):** Zona de Estadio Olímpico / Polideportivo.
* **Caseta 3 (Acceso Sur):** Zona Deportiva / Acceso Perimetral.

> [!NOTE]
> Todos los registros de entrada o salida realizados se etiquetarán automáticamente con la caseta seleccionada en el encabezado.

---

## 3. Registro de Entradas Vehiculares

1. Diríjase a la pestaña **"Operación de Casetas"**.
2. En el panel izquierdo (**Registro de Entrada**), localice el campo **PLACA DEL VEHÍCULO**.
3. Ingrese la placa (las letras se convierten automáticamente a mayúsculas, por ejemplo: `ABC-1234`).
4. Presione **Enter** o haga clic en el botón de **Lupa**:
   * **Si el vehículo está en el padrón:** Aparecerá una tarjeta verde con el nombre del conductor, facultad o dependencia y el distintivo institucional (*Docente*, *Estudiante* o *Administrativo*).
   * **Si es un visitante externo:** El sistema seleccionará automáticamente el tipo *Visitante* y le permitirá capturar el nombre del conductor y el motivo de su visita.
5. Haga clic en el botón naranja grande **"REGISTRAR ENTRADA"**.
6. El sistema confirmará con un mensaje en pantalla (*¡Entrada Autorizada!*) y registrará la fecha y hora exacta con precisión de segundos en Google Sheets.

---

## 4. Registro de Salidas Vehiculares (Operación en 1 Clic)

El sistema agiliza el egreso vehicular para evitar embotellamientos:

1. En el panel derecho de la pestaña de operación, observe la sección **"Vehículos en Campus (Pendientes de Salida)"**.
2. Esta tabla muestra todos los vehículos que se encuentran actualmente dentro de las instalaciones universitarias, indicando su hora de ingreso y minutos de estancia transcurridos.
3. Para dar salida a un vehículo:
   * Localice la fila de la placa correspondiente (puede usar el buscador del navegador o buscar visualmente).
   * Haga clic en el botón rojo **"Salida"**.
   * Confirme la acción en el cuadro de diálogo.
4. El sistema actualizará inmediatamente el estatus a **CONCLUIDO**, estampará la hora de salida, la caseta de egreso (permitiendo registrar salidas por casetas distintas a la de entrada) y calculará el tiempo total de estancia en el campus.

---

## 5. Módulo de Consultas y Búsqueda Avanzada

Para auditar movimientos o buscar vehículos específicos:

1. Haga clic en la pestaña **"Consultas y Filtros"**.
2. Configure cualquiera de los siguientes criterios (pueden combinarse):
   * **Por Placa:** Escriba parcial o totalmente la matrícula.
   * **Por Rango de Fechas:** Seleccione *Fecha Desde* y *Fecha Hasta*.
   * **Por Caseta:** Filtre por Caseta 1, Caseta 2, Caseta 3 o Todas.
   * **Por Tipo de Usuario:** Estudiantes, Docentes, Administrativos o Visitantes.
3. Haga clic en **"Buscar Registros"**.
4. La tabla inferior desplegará los folios, horas exactas, tiempos de permanencia y estados.
5. **Exportación a Excel:** Haga clic en el botón verde **"Exportar a Excel (CSV)"** para descargar la lista completa en un archivo compatible con Microsoft Excel.

---

## 6. Dashboard de Analítica y Reportes

Para directivos y personal de coordinación de seguridad:

1. Haga clic en la pestaña **"Dashboard y Reportes"**.
2. En la parte superior observará los **4 Indicadores Clave (KPIs)**:
   * **Vehículos Dentro Ahora:** Conteo en tiempo real de unidades en el campus.
   * **Ingresos de Hoy:** Total acumulado del día.
   * **Caseta Más Concurrida:** Punto de acceso con mayor aforo.
   * **Tiempo Promedio de Estancia:** Duración promedio de los usuarios.
3. **Gráficos Dinámicos:**
   * **Horarios de Mayor Afluencia (Histograma):** Identifica las horas pico de tráfico (ej. 7:00 AM y 1:00 PM).
   * **Accesos por Tipo de Usuario (Gráfica de Dona):** Porcentaje de estudiantes, profesores, personal y visitantes.
   * **Afluencia por Caseta (Gráfica de Barras):** Comparativa de carga vehicular entre las Casetas 1, 2 y 3.
   * **Top 5 Vehículos Más Frecuentes:** Ranking de placas con mayor número de ingresos en el período.

---

## 7. Gestión de Usuarios y Seguridad

* **Roles del Sistema:**
  * **Operador de Caseta:** Registra entradas y salidas, visualiza vehículos en campus.
  * **Supervisor / Guardia en Jefe:** Acceso a consultas históricas y exportación de reportes.
  * **Administrador:** Inicialización y mantenimiento de la base de datos de Google Sheets.
* **Bitácora de Auditoría:** Cada acción (inicio de sesión, consulta, registro) queda asentada con sello de tiempo e identificación de usuario en la hoja `Bitacora_Logs` de Google Sheets para garantizar el no repudio.

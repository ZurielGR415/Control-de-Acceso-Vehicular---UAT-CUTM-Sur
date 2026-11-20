# Estructura de Base de Datos: Sistema de Control de Acceso Vehicular UAT CUTM Sur
**Plataforma de Persistencia:** Google Sheets (Backend relacional)

---

## 1. Hoja: `Vehiculos_Autorizados`
Contiene el catálogo maestro de vehículos registrados de la comunidad universitaria y visitantes recurrentes.

| Columna | Nombre de Campo | Tipo de Dato | Ejemplo / Valores Permitidos | Descripción |
| :---: | :--- | :--- | :--- | :--- |
| **A** | `ID_Vehiculo` | Texto (Único) | `VEH-001`, `VEH-002` | Identificador único del registro. |
| **B** | `Placas` | Texto (Mayúsculas) | `ABC-123-D`, `WXZ-889-A` | Placa vehicular sin guiones o normalizada. Llave de búsqueda rápida. |
| **C** | `Tipo_Usuario` | Enum | `Estudiante`, `Docente`, `Administrativo`, `Visitante` | Clasificación institucional según el PDF. |
| **D** | `Nombre_Completo` | Texto | `Ing. Roberto Hernández Garza` | Nombre del conductor o propietario asignado. |
| **E** | `Matricula_Nomina` | Texto | `219302145` (Alumno) / `DOC-4412` | Matrícula UAT o número de nómina de empleado. |
| **F** | `Facultad_Dependencia` | Texto | `Facultad de Ingeniería Tampico (F1)`, `FADU`, `FCACS` | Dependencia o escuela de adscripción. |
| **G** | `Marca_Modelo` | Texto | `Nissan Versa 2021 Gris` | Descripción visual del vehículo. |
| **H** | `Color` | Texto | `Gris Plata`, `Blanco`, `Rojo` | Color de la carrocería. |
| **I** | `Estado_Autorizacion` | Enum | `Activo`, `Suspendido`, `En Revisión` | Control de permiso de acceso. |
| **J** | `Fecha_Alta` | Fecha | `2026-02-15` | Fecha de registro en el padrón vehicular. |

---

## 2. Hoja: `Casetas`
Catálogo de las 3 casetas de acceso y egreso de la UAT CUTM Sur.

| Columna | Nombre de Campo | Tipo de Dato | Valores Permitidos | Descripción |
| :---: | :--- | :--- | :--- | :--- |
| **A** | `ID_Caseta` | Texto (PK) | `CAS-01`, `CAS-02`, `CAS-03` | Identificador de caseta. |
| **B** | `Nombre_Caseta` | Texto | `Caseta 1 (Principal - Blv. López Mateos)`, `Caseta 2 (Acceso Norte - Estadio)`, `Caseta 3 (Acceso Sur)` | Nombre descriptivo. |
| **C** | `Carriles_Operativos` | Número | `2`, `1`, `1` | Número de plumas vehiculares. |
| **D** | `Estado` | Enum | `Operativa`, `Mantenimiento` | Estado de disponibilidad. |

---

## 3. Hoja: `Registro_Accesos`
Bitácora transaccional en tiempo real donde se almacena cada flujo de entrada y salida vehicular.

| Columna | Nombre de Campo | Tipo de Dato | Ejemplo / Fórmula | Descripción |
| :---: | :--- | :--- | :--- | :--- |
| **A** | `ID_Acceso` | Texto (PK) | `ACC-2026-0001` | Folio correlativo autogenerado. |
| **B** | `Fecha` | Fecha | `2026-11-20` | Fecha del movimiento (`YYYY-MM-DD`). |
| **C** | `Hora_Entrada` | Fecha/Hora | `2026-11-20 07:15:23` | Timestamp automático del registro de ingreso. |
| **D** | `Hora_Salida` | Fecha/Hora | `2026-11-20 13:40:10` | Timestamp automático al marcar la salida (vacío mientras está dentro). |
| **E** | `Placas` | Texto | `ABC-123-D` | Placa registrada. |
| **F** | `Tipo_Usuario` | Enum | `Estudiante`, `Docente`, `Administrativo`, `Visitante` | Tipo de usuario verificado. |
| **G** | `Conductor_Nombre` | Texto | `Roberto Hernández` | Nombre tomado del catálogo o capturado para visitantes. |
| **H** | `ID_Caseta_Entrada` | Texto | `CAS-01` | Caseta por la que ingresó el vehículo. |
| **I** | `ID_Caseta_Salida` | Texto | `CAS-03` | Caseta por la que salió (permite entrar por una y salir por otra). |
| **J** | `Estado_Vehiculo` | Enum | `DENTRO`, `CONCLUIDO` | Estatus en campus. Si es `DENTRO`, el auto aún está en el campus. |
| **K** | `Tiempo_Estancia_Min` | Número | `=SI(ESBLANCO(D2), REDONDEAR((AHORA()-C2)*1440, 0), REDONDEAR((D2-C2)*1440, 0))` | Minutos totales de permanencia en el campus. |
| **L** | `Vigilante_Turno` | Texto | `Oficial Ramos (Turno Matutino)` | Identificación del guardia de caseta que validó. |
| **M** | `Observaciones` | Texto | `Visitante a Dirección F1`, `Sin incidencias` | Motivo de visita o notas de seguridad. |

---

## 4. Hoja: `Bitacora_Logs`
Historial de seguridad inalterable (Seguridad y Auditoría solicitada en el PDF).

| Columna | Nombre de Campo | Tipo de Dato | Ejemplo | Descripción |
| :---: | :--- | :--- | :--- | :--- |
| **A** | `ID_Log` | Texto (PK) | `LOG-1001` | Identificador de evento. |
| **B** | `Timestamp` | Fecha/Hora | `2026-11-20 07:15:24` | Momento exacto de la operación. |
| **C** | `Usuario_Sesion` | Texto | `caseta1_operador@uat.edu.mx` | Cuenta institucional que realizó la acción. |
| **D** | `Accion` | Enum | `LOGIN`, `ENTRADA_REGISTRADA`, `SALIDA_REGISTRADA`, `CONSULTA_HISTORIAL`, `EXPORTAR_EXCEL` | Tipo de evento ejecutado. |
| **E** | `Detalle` | Texto | `Ingreso autorizado placa ABC-123-D en Caseta 1` | Descripción detallada para auditorías. |

---

## 5. Hoja: `Dashboard_Metricas` (Fórmulas Automáticas en Google Sheets)
Esta hoja se autocalcula para alimentar las gráficas de afluencia y reportes:

* **Vehículos Actualmente Dentro del Campus:**
  ```excel
  =CONTAR.SI(Registro_Accesos!J:J, "DENTRO")
  ```
* **Total de Entradas Hoy:**
  ```excel
  =CONTAR.SI.CONJUNTO(Registro_Accesos!B:B, HOY())
  ```
* **Afluencia por Caseta (Caseta 1):**
  ```excel
  =CONTAR.SI(Registro_Accesos!H:H, "CAS-01")
  ```
* **Distribución por Tipo de Usuario:**
  ```excel
  =QUERY(Registro_Accesos!A:J, "SELECT F, COUNT(A) WHERE F IS NOT NULL GROUP BY F LABEL COUNT(A) 'Total'")
  ```
* **Horarios de Mayor Afluencia (Picos de Tráfico por Hora):**
  ```excel
  =QUERY(Registro_Accesos!A:K, "SELECT HOUR(C), COUNT(A) WHERE C IS NOT NULL GROUP BY HOUR(C) ORDER BY COUNT(A) DESC LABEL HOUR(C) 'Hora del Día', COUNT(A) 'Accesos'")
  ```

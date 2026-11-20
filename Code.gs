/**
 * PROYECTO HACKATÓN UAT CUTM SUR - FACULTAD DE INGENIERÍA TAMPICO
 * Sistema de Control de Acceso Vehicular con Google Apps Script y Google Sheets
 * 
 * Backend: API de operaciones, gestión de catálogos, registros de casetas y analítica.
 */

const CONFIG = {
  NOMBRE_SISTEMA: "Sistema de Control de Acceso Vehicular - UAT CUTM Sur",
  HOJAS: {
    VEHICULOS: "Vehiculos_Autorizados",
    CASETAS: "Casetas",
    REGISTROS: "Registro_Accesos",
    LOGS: "Bitacora_Logs"
  }
};

/**
 * Sirve la interfaz web del sistema (Web App)
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle(CONFIG.NOMBRE_SISTEMA)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, shrink-to-fit=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Obtiene la hoja de cálculo activa
 */
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Inicializa automáticamente la estructura de la base de datos con datos de prueba
 * de la UAT CUTM Sur si no existen las hojas.
 */
function inicializarBaseDatos() {
  const ss = getSpreadsheet();
  
  // 1. Catálogo de Casetas
  let hojaCasetas = ss.getSheetByName(CONFIG.HOJAS.CASETAS);
  if (!hojaCasetas) {
    hojaCasetas = ss.insertSheet(CONFIG.HOJAS.CASETAS);
    hojaCasetas.appendRow(["ID_Caseta", "Nombre_Caseta", "Carriles_Operativos", "Estado"]);
    hojaCasetas.appendRow(["CAS-01", "Caseta 1 (Principal - Blv. López Mateos)", 2, "Operativa"]);
    hojaCasetas.appendRow(["CAS-02", "Caseta 2 (Acceso Norte - Estadio)", 1, "Operativa"]);
    hojaCasetas.appendRow(["CAS-03", "Caseta 3 (Acceso Sur - Deportivo)", 1, "Operativa"]);
    formatearCabecera(hojaCasetas);
  }

  // 2. Catálogo de Vehículos Autorizados
  let hojaVehiculos = ss.getSheetByName(CONFIG.HOJAS.VEHICULOS);
  if (!hojaVehiculos) {
    hojaVehiculos = ss.insertSheet(CONFIG.HOJAS.VEHICULOS);
    hojaVehiculos.appendRow([
      "ID_Vehiculo", "Placas", "Tipo_Usuario", "Nombre_Completo", 
      "Matricula_Nomina", "Facultad_Dependencia", "Marca_Modelo", "Color", "Estado_Autorizacion", "Fecha_Alta"
    ]);
    hojaVehiculos.appendRow(["VEH-001", "ABC1234", "Docente", "Dr. Juan Carlos Pérez", "DOC-1029", "Facultad de Ingeniería Tampico (F1)", "Honda Civic", "Blanco", "Activo", new Date()]);
    hojaVehiculos.appendRow(["VEH-002", "XYZ9876", "Estudiante", "Mariana Torres Morales", "22031045", "FADU (Arquitectura)", "Nissan Versa", "Gris", "Activo", new Date()]);
    hojaVehiculos.appendRow(["VEH-003", "TMX5542", "Administrativo", "Lic. Fernando Ruiz Cruz", "ADM-8831", "Rectoría / Admón Campus", "Chevrolet Aveo", "Azul", "Activo", new Date()]);
    hojaVehiculos.appendRow(["VEH-004", "VVE3321", "Estudiante", "Carlos Alberto Méndez", "21932087", "Facultad de Ingeniería Tampico (F1)", "Volkswagen Vento", "Rojo", "Activo", new Date()]);
    formatearCabecera(hojaVehiculos);
  }

  // 3. Registro de Accesos (Transacciones)
  let hojaRegistros = ss.getSheetByName(CONFIG.HOJAS.REGISTROS);
  if (!hojaRegistros) {
    hojaRegistros = ss.insertSheet(CONFIG.HOJAS.REGISTROS);
    hojaRegistros.appendRow([
      "ID_Acceso", "Fecha", "Hora_Entrada", "Hora_Salida", "Placas", 
      "Tipo_Usuario", "Conductor_Nombre", "ID_Caseta_Entrada", "ID_Caseta_Salida", 
      "Estado_Vehiculo", "Tiempo_Estancia_Min", "Vigilante_Turno", "Observaciones"
    ]);
    formatearCabecera(hojaRegistros);
  }

  // 4. Bitácora de Auditoría
  let hojaLogs = ss.getSheetByName(CONFIG.HOJAS.LOGS);
  if (!hojaLogs) {
    hojaLogs = ss.insertSheet(CONFIG.HOJAS.LOGS);
    hojaLogs.appendRow(["ID_Log", "Timestamp", "Usuario_Sesion", "Accion", "Detalle"]);
    formatearCabecera(hojaLogs);
  }

  registrarLog("SISTEMA", "INICIALIZACION", "Base de datos inicializada correctamente para UAT CUTM Sur.");
  return { exito: true, mensaje: "Base de datos inicializada con éxito." };
}

function formatearCabecera(hoja) {
  const rango = hoja.getRange(1, 1, 1, hoja.getLastColumn());
  rango.setBackground("#0b3b60");
  rango.setFontColor("#ffffff");
  rango.setFontWeight("bold");
  hoja.setFrozenRows(1);
}

/**
 * Registra eventos en la bitácora de seguridad
 */
function registrarLog(usuario, accion, detalle) {
  try {
    const ss = getSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG.HOJAS.LOGS);
    if (!hoja) return;
    const idLog = "LOG-" + Utilities.formatDate(new Date(), "America/Monterrey", "yyyyMMdd-HHmmss") + "-" + Math.floor(Math.random() * 1000);
    hoja.appendRow([idLog, new Date(), usuario || "Operador Caseta", accion, detalle]);
  } catch (err) {
    Logger.log("Error al escribir log: " + err.message);
  }
}

/**
 * Busca si una placa está registrada en el padrón de autorizados
 */
function buscarVehiculoPorPlaca(placaNormalizada) {
  const placaLimpia = (placaNormalizada || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (!placaLimpia) return { encontrado: false };

  const ss = getSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG.HOJAS.VEHICULOS);
  if (!hoja) return { encontrado: false };

  const datos = hoja.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    const placaFila = (datos[i][1] + "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (placaFila === placaLimpia) {
      return {
        encontrado: true,
        idVehiculo: datos[i][0],
        placas: datos[i][1],
        tipoUsuario: datos[i][2],
        nombreCompleto: datos[i][3],
        matriculaNomina: datos[i][4],
        dependencia: datos[i][5],
        marcaModelo: datos[i][6],
        color: datos[i][7],
        estadoAutorizacion: datos[i][8]
      };
    }
  }

  return { encontrado: false, placas: placaLimpia, tipoUsuario: "Visitante" };
}

/**
 * Registra el ingreso de un vehículo en una caseta específica
 */
function registrarEntrada(datos) {
  try {
    const ss = getSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG.HOJAS.REGISTROS);
    if (!hoja) throw new Error("La hoja de registros no existe.");

    const placaLimpia = (datos.placas || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (!placaLimpia) throw new Error("Debe ingresar una placa válida.");

    // Validar si el vehículo ya está marcado como DENTRO
    const filas = hoja.getDataRange().getValues();
    for (let i = 1; i < filas.length; i++) {
      const placaActual = (filas[i][4] + "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
      const estadoActual = filas[i][9];
      if (placaActual === placaLimpia && estadoActual === "DENTRO") {
        return {
          exito: false,
          yaAdentro: true,
          mensaje: `El vehículo con placas ${placaLimpia} ya tiene un ingreso activo sin salida registrada (Folio: ${filas[i][0]}).`
        };
      }
    }

    const idAcceso = "ACC-" + Utilities.formatDate(new Date(), "America/Monterrey", "yyyyMMdd-HHmmss") + "-" + Math.floor(Math.random() * 100);
    const ahora = new Date();
    const fechaSolo = Utilities.formatDate(ahora, "America/Monterrey", "yyyy-MM-dd");

    hoja.appendRow([
      idAcceso,
      fechaSolo,
      ahora,
      "", // Hora salida vacía
      placaLimpia,
      datos.tipoUsuario || "Visitante",
      datos.nombreCompleto || "Sin Registrar / Visitante",
      datos.idCaseta || "CAS-01",
      "", // Caseta de salida vacía
      "DENTRO",
      0, // Tiempo inicial
      datos.vigilante || "Guardia en Turno",
      datos.observaciones || "Ingreso normal"
    ]);

    registrarLog(datos.vigilante, "REGISTRO_ENTRADA", `Entrada registrada: ${placaLimpia} en ${datos.idCaseta} (${datos.tipoUsuario})`);

    return {
      exito: true,
      idAcceso: idAcceso,
      placas: placaLimpia,
      horaEntrada: Utilities.formatDate(ahora, "America/Monterrey", "HH:mm:ss"),
      mensaje: `Ingreso registrado exitosamente para ${placaLimpia}.`
    };
  } catch (error) {
    return { exito: false, mensaje: "Error al registrar entrada: " + error.message };
  }
}

/**
 * Obtiene los vehículos que se encuentran actualmente dentro del campus
 */
function obtenerVehiculosDentro(idCasetaFiltro) {
  try {
    const ss = getSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG.HOJAS.REGISTROS);
    if (!hoja) return [];

    const datos = hoja.getDataRange().getValues();
    const dentro = [];

    for (let i = datos.length - 1; i >= 1; i--) {
      const estado = datos[i][9];
      if (estado === "DENTRO") {
        const filaCaseta = datos[i][7];
        if (!idCasetaFiltro || idCasetaFiltro === "TODAS" || filaCaseta === idCasetaFiltro) {
          const horaEntradaDate = new Date(datos[i][2]);
          const minutosEstancia = Math.max(0, Math.floor((new Date() - horaEntradaDate) / (1000 * 60)));
          
          dentro.push({
            idAcceso: datos[i][0],
            fecha: datos[i][1],
            horaEntrada: Utilities.formatDate(horaEntradaDate, "America/Monterrey", "yyyy-MM-dd HH:mm:ss"),
            placas: datos[i][4],
            tipoUsuario: datos[i][5],
            conductor: datos[i][6],
            casetaEntrada: datos[i][7],
            minutosEstancia: minutosEstancia,
            observaciones: datos[i][12]
          });
        }
      }
    }
    return dentro;
  } catch (err) {
    Logger.log("Error al obtener vehiculos dentro: " + err.message);
    return [];
  }
}

/**
 * Registra la salida vehicular calculando automáticamente el tiempo de estancia
 */
function registrarSalida(idAcceso, idCasetaSalida, vigilante, observaciones) {
  try {
    const ss = getSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG.HOJAS.REGISTROS);
    if (!hoja) throw new Error("Hoja de registros no encontrada.");

    const datos = hoja.getDataRange().getValues();
    let filaIndex = -1;

    for (let i = 1; i < datos.length; i++) {
      if (datos[i][0] === idAcceso && datos[i][9] === "DENTRO") {
        filaIndex = i + 1; // Base 1 para getRange
        break;
      }
    }

    if (filaIndex === -1) {
      throw new Error("No se encontró el registro activo o ya tiene salida asignada.");
    }

    const ahora = new Date();
    const horaEntrada = new Date(datos[filaIndex - 1][2]);
    const minutosTranscurridos = Math.max(1, Math.round((ahora - horaEntrada) / (1000 * 60)));
    const placa = datos[filaIndex - 1][4];

    hoja.getRange(filaIndex, 4).setValue(ahora); // Col D: Hora_Salida
    hoja.getRange(filaIndex, 9).setValue(idCasetaSalida || "CAS-01"); // Col I: ID_Caseta_Salida
    hoja.getRange(filaIndex, 10).setValue("CONCLUIDO"); // Col J: Estado_Vehiculo
    hoja.getRange(filaIndex, 11).setValue(minutosTranscurridos); // Col K: Tiempo_Estancia_Min

    if (observaciones) {
      const obsPrevias = datos[filaIndex - 1][12] || "";
      hoja.getRange(filaIndex, 13).setValue(obsPrevias + " | Salida: " + observaciones);
    }

    registrarLog(vigilante, "REGISTRO_SALIDA", `Salida registrada: ${placa} en ${idCasetaSalida}. Estancia: ${minutosTranscurridos} min.`);

    return {
      exito: true,
      placas: placa,
      horaSalida: Utilities.formatDate(ahora, "America/Monterrey", "HH:mm:ss"),
      minutosEstancia: minutosTranscurridos,
      mensaje: `Salida registrada para ${placa}. Tiempo de estancia: ${minutosTranscurridos} minutos.`
    };
  } catch (error) {
    return { exito: false, mensaje: "Error al registrar salida: " + error.message };
  }
}

/**
 * Consulta avanzada con filtros por placa, rango de fechas, acceso y tipo de usuario
 */
function consultarHistorial(filtros) {
  try {
    const ss = getSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG.HOJAS.REGISTROS);
    if (!hoja) return [];

    const datos = hoja.getDataRange().getValues();
    const resultados = [];

    const placaBuscada = (filtros.placas || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const fechaDesde = filtros.fechaDesde ? new Date(filtros.fechaDesde + "T00:00:00") : null;
    const fechaHasta = filtros.fechaHasta ? new Date(filtros.fechaHasta + "T23:59:59") : null;
    const casetaFiltro = filtros.caseta;
    const tipoUsuarioFiltro = filtros.tipoUsuario;

    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      const placaFila = (fila[4] + "").toUpperCase();
      const fechaEntrada = new Date(fila[2]);
      const tipoUsuarioFila = fila[5];
      const casetaEntrada = fila[7];
      const casetaSalida = fila[8];

      if (placaBuscada && !placaFila.includes(placaBuscada)) continue;
      if (fechaDesde && fechaEntrada < fechaDesde) continue;
      if (fechaHasta && fechaEntrada > fechaHasta) continue;
      if (casetaFiltro && casetaFiltro !== "TODAS" && casetaEntrada !== casetaFiltro && casetaSalida !== casetaFiltro) continue;
      if (tipoUsuarioFiltro && tipoUsuarioFiltro !== "TODOS" && tipoUsuarioFila !== tipoUsuarioFiltro) continue;

      resultados.push({
        idAcceso: fila[0],
        fecha: fila[1],
        horaEntrada: fila[2] ? Utilities.formatDate(new Date(fila[2]), "America/Monterrey", "yyyy-MM-dd HH:mm:ss") : "",
        horaSalida: fila[3] ? Utilities.formatDate(new Date(fila[3]), "America/Monterrey", "yyyy-MM-dd HH:mm:ss") : "En campus",
        placas: fila[4],
        tipoUsuario: fila[5],
        conductor: fila[6],
        casetaEntrada: fila[7],
        casetaSalida: fila[8] || "-",
        estado: fila[9],
        minutos: fila[10],
        vigilante: fila[11],
        observaciones: fila[12]
      });
    }

    return resultados.reverse();
  } catch (err) {
    Logger.log("Error en consultarHistorial: " + err.message);
    return [];
  }
}

/**
 * Genera métricas y datos estadísticos para los dashboards y reportes de afluencia
 */
function obtenerEstadisticas() {
  try {
    const ss = getSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG.HOJAS.REGISTROS);
    if (!hoja) return { totalDentro: 0, totalHoy: 0, tipos: {}, casetas: {}, horas: new Array(24).fill(0), masFrecuentes: [] };

    const datos = hoja.getDataRange().getValues();
    const hoyStr = Utilities.formatDate(new Date(), "America/Monterrey", "yyyy-MM-dd");

    let totalDentro = 0;
    let totalHoy = 0;
    const tipos = { Estudiante: 0, Docente: 0, Administrativo: 0, Visitante: 0 };
    const casetas = { "CAS-01": 0, "CAS-02": 0, "CAS-03": 0 };
    const horasHistograma = new Array(24).fill(0);
    const frecuenciasPlacas = {};

    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      const estado = fila[9];
      const tipo = fila[5];
      const casetaEntrada = fila[7];
      const placa = fila[4];
      const fechaEntrada = fila[2] ? new Date(fila[2]) : null;

      if (estado === "DENTRO") totalDentro++;

      if (fechaEntrada) {
        const fechaStr = Utilities.formatDate(fechaEntrada, "America/Monterrey", "yyyy-MM-dd");
        if (fechaStr === hoyStr) {
          totalHoy++;
        }
        const hora = fechaEntrada.getHours();
        if (hora >= 0 && hora < 24) {
          horasHistograma[hora]++;
        }
      }

      if (tipos[tipo] !== undefined) tipos[tipo]++;
      if (casetas[casetaEntrada] !== undefined) casetas[casetaEntrada]++;

      if (placa) {
        frecuenciasPlacas[placa] = (frecuenciasPlacas[placa] || 0) + 1;
      }
    }

    // Top 5 vehículos más frecuentes
    const masFrecuentes = Object.keys(frecuenciasPlacas)
      .map(p => ({ placa: p, total: frecuenciasPlacas[p] }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return {
      totalDentro,
      totalHoy,
      tipos,
      casetas,
      horas: horasHistograma,
      masFrecuentes
    };
  } catch (err) {
    Logger.log("Error en obtenerEstadisticas: " + err.message);
    return null;
  }
}

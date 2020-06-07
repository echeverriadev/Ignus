//STATUS TRANSACTIONS

const TRANSACTION_IN_PROCESS = 'P'
const TRANSACTION_INCIDENCE = 'I'
const TRANSACTION_COMPLETED = 'D'
const TRANSACTION_CANCELED = 'C'
const TRANSACTION_RESERVED = 'R'
const TRANSACTION_PUBLISHED = 'H'
const TRANSACTION_FINISHED = 'F'
const TRANSACTION_QUALIFIED = 'Q'
const ALL_STATUS_TRANSACTION = [TRANSACTION_IN_PROCESS,TRANSACTION_INCIDENCE, TRANSACTION_COMPLETED, TRANSACTION_FINISHED, TRANSACTION_CANCELED, TRANSACTION_RESERVED, TRANSACTION_PUBLISHED, TRANSACTION_QUALIFIED]
const STATUS_TRANSACTION_WITHOUT = (status) => {
    return ALL_STATUS_TRANSACTION.filter(item => status!=item)
}

const STATUS_TRANSACTION_STR = {
  [TRANSACTION_IN_PROCESS]: "En proceso",
  [TRANSACTION_INCIDENCE]: "En incidencia",
  [TRANSACTION_COMPLETED]: "Completada",
  [TRANSACTION_PUBLISHED]: "Publicada en catálogo",
  [TRANSACTION_FINISHED]: "Finalizada",
  [TRANSACTION_CANCELED]: "Cancelada",
  [TRANSACTION_QUALIFIED]: "Calificada",
  [TRANSACTION_RESERVED]: "Reservada"
}

const DATE_TRANSACTION_STATUS = {
  [TRANSACTION_IN_PROCESS]: "inProcessDate", 
  [TRANSACTION_INCIDENCE]: "incidenceDate", 
  [TRANSACTION_COMPLETED]: "completedDate", 
  [TRANSACTION_PUBLISHED]: "publishedDate", 
  [TRANSACTION_FINISHED]: "finishedDate", 
  [TRANSACTION_CANCELED]: "canceledDate", 
  [TRANSACTION_QUALIFIED]: "qualifiedDate", 
  [TRANSACTION_RESERVED]: "reservedDate", 
}

const MESSAGES_BY_TRANSACTION_STATUS = {
    [TRANSACTION_IN_PROCESS]: "E059",
    [TRANSACTION_INCIDENCE]: "E065",
    [TRANSACTION_COMPLETED]: "E069",
    [TRANSACTION_PUBLISHED]: "E073",
    [TRANSACTION_FINISHED]: "E061",
    [TRANSACTION_CANCELED]: "E063", 
    [TRANSACTION_QUALIFIED]: "E075",
    [TRANSACTION_RESERVED]: "E077"
}


//STATUS PROPERTY

const PROPERTY_INITIAL = 'I'
const PROPERTY_DESIRED = 'D'
const PROPERTY_PUBLISHED = 'P'
const PROPERTY_RESERVED = 'R'
const PROPERTY_FINISHED = 'H'


const ALL_STATUS_PROPERTY = [PROPERTY_INITIAL, PROPERTY_DESIRED, PROPERTY_PUBLISHED, PROPERTY_RESERVED, PROPERTY_FINISHED]
const STATUS_PROPERTY_WITHOUT = (status) => {
    return ALL_STATUS_PROPERTY.filter(item => status!=item)
}

const STATUS_PROPERTY_STR = {
     [PROPERTY_INITIAL]: 'Inicial',
     [PROPERTY_DESIRED]: 'Deseado',
     [PROPERTY_PUBLISHED]: 'Publicado',
     [PROPERTY_RESERVED]: 'Reservado',
     [PROPERTY_FINISHED]: 'Finalizado'
}

const MESSAGES_BY_PROPERTY_STATUS = {
     [PROPERTY_INITIAL]: 'E079',
     [PROPERTY_DESIRED]: 'E081',
     [PROPERTY_PUBLISHED]: 'E083',
     [PROPERTY_RESERVED]: 'E085',
     [PROPERTY_FINISHED]: 'E087'
}



const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const TABLES = [
    {name: 'Cliente', id: 'Client'},
    {name: 'Inmueble', id: 'Property'},
    {name: 'Solicitud', id: 'Request'},
    {name: 'Transaccion', id: 'Transaction'}
]

const COLUMNS = [
    {
        table: 'Client', attrib: [
            {name: 'identificacion', id: 'identification'},
            {name: 'fechaNacimiento', id: 'birthDate'},
            {name: 'nombre', id: 'firstName'},
            {name: 'apellido', id: 'lastName'},
            {name: 'telefono', id: 'phoneNumber'},
            {name: 'sexo', id: 'gender'},
        ]
    },
    {
        table: 'Property', attrib: [
            {name: 'ubicacion', id: 'ubication'},
            {name: 'fechaConstruccion', id: 'buildDate'}
        ]
    },
    {
        table: 'Request', attrib: [
            {name: 'fechaSolicitud', id: 'requestDate'},
            {name: 'fechaAprobacion', id: 'aprobationDate'},
            {name: 'fechaAtendida', id: 'attendedDate'},
            {name: 'fechaDeseada', id: 'wishDate'},
            {name: 'estado', id: 'status'}
        ]
    },
    {
        table: 'Transaction', attrib: [
            {name: 'estado', id: 'status'},
            {name: 'fechaProceso', id: 'inProcessDate'},
            {name: 'fechaIncidencia', id: 'incidenceDate'},
            {name: 'fechaCompletada', id: 'completedDate'},
            {name: 'fechaPublicacion', id: 'publishedDate'}
        ]
    }
]

const TYPE_SERVICE_OPPOSITE_ID = {
    1: 3,
    2: 4,
    3: 1,
    4: 2,
}

const TYPE_SERVICE_OPPOSITE_STRING = {
    1: "Venta",
    2: "Arriendo",
    3: "Compra",
    4: "Alquiler",
}


module.exports = {
    TRANSACTION_IN_PROCESS,
    TRANSACTION_INCIDENCE,
    TRANSACTION_COMPLETED,
    TRANSACTION_FINISHED,
    TRANSACTION_CANCELED,
    TRANSACTION_RESERVED,
    TRANSACTION_PUBLISHED,
    TRANSACTION_QUALIFIED,
    ALL_STATUS_TRANSACTION,
    STATUS_TRANSACTION_WITHOUT,
    STATUS_TRANSACTION_STR,
    DATE_TRANSACTION_STATUS,
    MESSAGES_BY_TRANSACTION_STATUS,
    
    PROPERTY_INITIAL,
    PROPERTY_DESIRED,
    PROPERTY_PUBLISHED,
    PROPERTY_RESERVED,
    PROPERTY_FINISHED,
    ALL_STATUS_PROPERTY,
    STATUS_PROPERTY_WITHOUT,
    STATUS_PROPERTY_STR,
    MESSAGES_BY_PROPERTY_STATUS,

    MONTHS,
    TABLES,
    COLUMNS,
    
    TYPE_SERVICE_OPPOSITE_ID,
    TYPE_SERVICE_OPPOSITE_STRING,
}
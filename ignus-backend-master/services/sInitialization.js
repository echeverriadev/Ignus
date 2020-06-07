const models = require("../models"),
  url = require("../config").url;
const states = require("../static/states");
const cities = require("../static/cities");
const municipalities = require("../static/municipalities");
const parishes = require("../static/parishes");
const sTransaction = require("./sTransaction");
const C = require("../config/properties/constants")


const propertyId1 = require('../static/propertyId1')
const propertyId2 = require('../static/propertyId2')
const propertyId3 = require('../static/propertyId3')
const propertyId4 = require('../static/propertyId4')
const propertyId5 = require('../static/propertyId5')
const propertyId6 = require('../static/propertyId6')
const propertyId7 = require('../static/propertyId7')
const propertyId8 = require('../static/propertyId8')
const propertyId9 = require('../static/propertyId9')
const propertyId10 = require('../static/propertyId10')
const propertyId11 = require('../static/propertyId11')
const propertyId12 = require('../static/propertyId12')
const propertyId13 = require('../static/propertyId13')
const propertyId14 = require('../static/propertyId14')
const propertyId15 = require('../static/propertyId15')

const InitialpropertyId16 = require('../static/InitialpropertyId16')
const InitialpropertyId17 = require('../static/InitialpropertyId17')
const InitialpropertyId18 = require('../static/InitialpropertyId18')

const DesiredpropertyId19 = require('../static/DesiredpropertyId19')
  
  
  
  
const activities1 = [1,2,3,4,7,8,9]
const activities2 = [1,2,3,4,7,8,9]
const activities3 = [1,2,3,5,6,8,9]
const activities4 = [1,2,3,5,6,8,9]

const requirements1 = [12, 13]
const requirements2 = [12, 13]
const requirements3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const requirements4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14]

async function initialization() {
  await models.sequelize.sync({ force: true })
  await models.State.bulkCreate(states)
  await models.City.bulkCreate(cities)
  await models.Municipality.bulkCreate(municipalities)
  await models.Parish.bulkCreate(parishes)
  await models.Agency.bulkCreate([{
    rif: "J929939399-2",
    name: "INMOBILIARIUM C.A.",
    mission: "Prestar el mejor servicio de ventas, administración de inmuebles y condominios, de manera efectiva cumpliendo con los principios éticos y morales, para así satisfacer las necesidades del mercado inmobiliario: Residencial, Comercial e Industrial, obteniendo plena satisfacción de nuestros clientes a nivel regional, mediante la integración de un equipo de trabajo capacitado, con tecnología e información avanzada, proporcionando servicio con altos estándares de calidad que permita la identificación de nuestros clientes con la empresa.",
    vision: "Estar bajo el reconocimiento de la ciudadanía local, regional y nacional, como una empresa comercializadora de bienes muebles y administración de condominios con la solidez de servicios basados en la reputación, seguridad y estabilidad con el fin de lograr ser pionera en el mercado como organización única y ejemplo para la competencia bajo principios morales y éticos.",
    generalObjective: "Para INMOBILIARIUM C.A. el objetivo esencial es manifestar nuestro existir, los altos valores de honestidad y responsabilidad, unidos a la pasión, ingenio y constancia han sido las fuentes de inspiración del trabajo realizado, el cual unido a la tecnología actual, hacen de nuestra organización una herramienta útil, segura y confiable para nuestros clientes.",
    ubication: "Av.Los Leones, Centro Comercial París, Piso 2, Nivel París, Local 3-1 Barquisimeto, Edo. Lara",
    foundationDate: "1995-10-01",
    phoneNumber: "0416-4333456",
    phoneNumber2: "0251-2349583",
  }])
  
  let agency = await models.Agency.findByPk(1)
  await models.TypeService.bulkCreate([{
      name: "Compra",
      description: "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
      urlImage: url + "/public/imgs/typeService/compra.jpg",
      offeringProperty: true
    },
    {
      name: "Alquiler",
      description: "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
      urlImage: url + "/public/imgs/typeService/alquila.jpg",
      offeringProperty: true
    },
    {
      name: "Venta",
      description: "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
      urlImage: url + "/public/imgs/typeService/venta.jpg",
      offeringProperty: false
    },
    {
      name: "Arrendamiento",
      description: "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
      urlImage: url + "/public/imgs/typeService/arrendar.jpg",
      offeringProperty: false
    },
  ])
  await models.SocialNetwork.bulkCreate([{
      name: "Facebook",
      urlAgencySocialNetwork: "https://www.facebook.com/inmobiliarium.perez",
      urlLogo: url + "/public/imgs/socialNetwork/facebook.png",
      fontAwesome: 'fa-facebook',
      iconIonic: "logo-facebook"
    },
    {
      name: "Twitter",
      urlAgencySocialNetwork: "https://twitter.com/inmobiliariumve",
      urlLogo: url + "/public/imgs/socialNetwork/twitter.png",
      fontAwesome: 'fa-twitter',
      iconIonic: "logo-twitter"
    },
    {
      name: "Instagram",
      urlAgencySocialNetwork: "https://www.instagram.com/inmobiliariumve",
      urlLogo: url + "/public/imgs/socialNetwork/instagram.png",
      fontAwesome: 'fa-instagram',
      iconIonic: "logo-instagram"
    },
    {
      name: "Google+",
      urlLogo: url + "/public/imgs/socialNetwork/google-plus.png",
      fontAwesome: 'fa-google-plus',
      iconIonic: "logo-googleplus"
    },
    {
      name: "Linkedin",
      urlLogo: url + "/public/imgs/socialNetwork/linkedin.png",
      fontAwesome: 'fa-linkedin',
      iconIonic: "logo-linkedin"
    }
  ])
  await agency.setSocialNetworks([1,2,3]) // without google or linkedin
  await models.TypeEmployee.bulkCreate([
    { name: "Agente", description: "Agente de bienes raices" },
    { name: "Secretaria", description: "Secretaria" },
  ])
  await models.Role.bulkCreate([
    { name: "Root", description: "Modo Dios" },
    { name: "Admin", description: "Admin" },
    { name: "Empleado", description: "Rol Empleado" },
    { name: "Cliente", description: "Rol cliente" },
  ])
  
  
  
  
  
  
  
  
  await models.Function.bulkCreate([
    { name: "Dashboard", description: "Dashboard", link: "/dashboard", icon: "fa fa-fw fa-dashboard" },
    { name: "Dashboard", description: "Dashboard (Cliente)", link: "/dashboardcustomer", icon: "fa fa-fw fa-dashboard" },
    { name: "Transacciones", description: "Transacciones", link: null, icon: "fa fa-address-book" },
    { name: "Solicitud", description: "Transaccion-Solicitud", link: null, icon: "fa fa-address-book", parent_id: 3 },
    { name: "Registro", description: "Transaccion-Solictud-Registro", link: '/registrosolicitud', icon: "fa fa-user", parent_id: 4 },
    { name: "Atención", description: "Transaccion-Solictud-Atencion", link: '/solicitud', icon: "fa fa-building", parent_id: 4 },
    { name: "Inspección", description: "Transaccion-Solictud-Visitas", link: '/visita', icon: "fa fa-calendar", parent_id: 4 },
    { name: "Lista de transacciones", description: "Transaccion-Lista de transacciones", link: '/listransactions', icon: "fa fa-calendar", parent_id: 3 },
    { name: "Citas", description: "Transaccion-Citas", link: '/citas', icon: "fa fa-calendar", parent_id: 3 },
    { name: "Actividades y recaudos", description: "Transaccion-Actividades y recaudos (cliente)", link: "/activitiesCollections", icon: "fa fa-address-book", parent_id: 3 },
    { name: "Actividades y recaudos", description: "Transaccion-Actividades y recaudos (agente)", link: "/activitiesEmployee", icon: "fa fa-address-book", parent_id: 3 },
    { name: "Reserva", description: "Transaccion-Reserva", link: "/reserva", icon: "fa fa-list-alt", parent_id: 3 },
    { name: "Publicación", description: "Transaccion-Registro", link: "/publicacion", icon: "fa fa-user", parent_id: 3 },
    { name: "Contrato", description: "Transaccion-Contrato", link: "/contrato", icon: "fa fa-fw fa-edit", parent_id: 3 },
    { name: "Calificación del servicio", description: "Transaccion-Calificacion del servicio", link: "/valoracion", icon: "fa fa-star", parent_id: 3 },
    { name: "Incidencias", description: "Incidencias", link: "/incidencias", icon: "fa fa-fw fa-edit" },
    { name: "Atención de incidencias", description: "Atención de incidencias", link: "/atencionincidencias", icon: "fa fa-fw fa-edit" },
    { name: "Post-Servicio", description: "Post servicio", link: null, icon: "fa fa-address-book" },
    { name: "Promociones", description: "Post-servicio-Promociones", link: '/asignarpromociones', icon: "fa fa-user", parent_id: 18 },
    { name: "Contacto", description: "Post-servicio-Contacto", link: '/contact', icon: "fa fa-user-circle-o", parent_id: 18 },
    { name: "Atención al cliente", description: "Post-servicio-Atención al cliente", link: '/atencionclientes', icon: "fa fa-calendar", parent_id: 18 },
    { name: "Configuración del negocio", description: "Cfg. del Negocio", link: null, icon: "fa fa-cog" },
    { name: "Inmobiliaria", description: "Cfg. del negocio-Inmobiliaria", link: '/agency', icon: "fa fa-building", parent_id: 22 },
    { name: "Inmuebles", description: "Cfg. del negocio-Inmuebles", link: '/inmueble', icon: "fa fa-building", parent_id: 22 },
    { name: "Clientes", description: "Cfg. del negocio-Clientes", link: '/cliente', icon: "fa fa-user", parent_id: 22 },
    { name: "Empleados", description: "Cfg. del negocio-Empleados", link: '/empleados', icon: "fa fa-calendar", parent_id: 22 },
    { name: "Promociones", description: "Cfg. del negocio-Promociones", link: '/promociones', icon: "fa fa-bullhorn", parent_id: 22 },
    { name: "Recaudos", description: "Cfg. del negocio-Recaudos", link: '/recaudo', icon: "fa fa-calendar-plus-o", parent_id: 22 },
    { name: "Actividades", description: "Cfg. del negocio-Actividades", link: '/actividades', icon: "fa fa-check", parent_id: 22 },
    { name: "Especificaciones", description: "Cfg. del negocio-Especificaciones", link: '/especificacion', icon: "fa fa-check", parent_id: 22 },
    { name: "Tipo de especificaciones", description: "Cfg. del negocio-Tipo de especificaciones", link: '/tipoespecificacion', icon: "fa fa-check", parent_id: 22 },
    { name: "Tipo de contacto", description: "Cfg. del negocio-Tipo de contacto", link: '/tipocontacto', icon: "fa fa-check", parent_id: 22 },
    { name: "Redes Sociales", description: "Cfg. del negocio-Redes sociales", link: '/socialnetworks', icon: "fa fa-comments", parent_id: 22 },
    { name: "Configuración del sistema", description: "Cfg. del Sistema", link: null, icon: "fa fa-cog" },
    { name: "Servicios", description: "Cfg. del sistema-Servicios", link: '/services', icon: "fa fa-home", parent_id: 34 },
    { name: "Roles", description: "Cfg. del sistema-Roles", link: '/role', icon: "fa fa-user-circle-o", parent_id: 34 },
    { name: "Reportes", description: "Reportes", link: null, icon: "fa fa-cog" },
    { name: "Estadisticos", description: "Reportes-Estadisticos", link: null, icon: "fa fa-bar-chart", parent_id: 37 },
    { name: "Mas solicitado", description: "Reportes-Estadisticos-Mas solicitado", link: "/promedio", icon: "fa fa-user", parent_id: 38 },
    { name: "Reclamos", description: "Reportes-Estadisticos-Reclamos", link: "/reclamo", icon: "fa fa-building", parent_id: 38 },
    { name: "Calificación", description: "Reportes-Estadisticos-Calificacion", link: "/calificacion", icon: "fa fa-calendar", parent_id: 38 },
    { name: "Solicitudes", description: "Reportes-Estadisticos-Solicitudes", link: "/solicitudes", icon: "fa fa-calendar", parent_id: 38 },
    { name: "Cita", description: "Reportes-Estadisticos-Cita", link: "/cita", icon: "fa fa-calendar", parent_id: 38 },
    { name: "Incidencia", description: "Reportes-Estadisticos-Incidencia", link: "/reporteincidencia", icon: "fa fa-address-book", parent_id: 38 },
    { name: "Transacciones", description: "Reportes-Estadisticos-Transacciones", link: "/transacciones", icon: "fa fa-address-book", parent_id: 38 },
    { name: "Suscripciones", description: "Reportes-Estadisticos-Registros", link: "/registros", icon: "fa fa-address-book", parent_id: 38 },
    { name: "Estructurado", description: "Reportes-Estructurado", link: "/post-servicio", icon: "fa fa-list-alt", parent_id: 37 },
    { name: "No Estructurados", description: "Reportes-No Estructurados", link: "/noestructurado", icon: "fa fa-list-alt", parent_id: 37 },
  ])

  // For Mobile functions
  await models.Function.bulkCreate([
    { name: "Home", description: "Main page", link: "DashboardPage", icon: "home", typeApplication: "M"},
    { name: "Perfil", description: "Perfil page", link: "ProfilePage", icon: "contact", typeApplication: "M"},
    { name: "Agenda", description: "Agenda", link: "SchedulePage", icon: "calendar", typeApplication: "M"},
    { name: "Catálogo", description: "Catálogo", link: "PortfolioPage", icon: "briefcase", typeApplication: "M"},
    { name: "Preferencias", description: "Preferencias", link: "UserPreferencesPage", icon: "settings", typeApplication: "M"},
    { name: "Calificación", description: "Calificación", link: "QualificationPage", icon: "star", typeApplication: "M"},
    { name: "Incidencias", description: "Incidencias", link: "IncidentsPage", icon: "copy", typeApplication: "M"},
    { name: "Atención de Incidencias", description: "Atención de Incidencias", link: "AtencionIncidenciaPage", icon: "copy", typeApplication: "M"},
    { name: "Atención al Cliente", description: "Atención al Cliente", link: "AttentionClientPage", icon: "archive", typeApplication: "M"},
    { name: "Contacto", description: "Contacto", link: "SuggestionsPage", icon: "archive", typeApplication: "M"},
  ])

  let rootRole = await models.Role.findByPk(1);
  
  //All linkeables functions
  const root_array = [
    1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    // mobile functions
    49,50,51,52,53,54,55,56,57,58
  ];
  
  await rootRole.setFunctions(root_array);
  let employeeRole = await models.Role.findByPk(3);
  await employeeRole.setFunctions([1, 6, 7, 8, 9, 11, 12, 13, 14, 17, 19, 21,
  //mobile functions
  49,50,51,52,53,56,57
  ]);
  
  let clientRole = await models.Role.findByPk(4);
  await clientRole.setFunctions([2, 5, 10, 15, 16, 20,
  //mobile functions
  49,50,51,52,53,54,55,58
  ]);

  await models.Requirement.bulkCreate([
    { name: "Títulos supletorios.", description: "Subir Títulos supletorios." },
    { name: "Declaración sucesoral (principal).", description: "Subir Declaración sucesoral (principal)." },
    { name: "Declaración sucesoral (sustitutiva).", description: "Subir Declaración sucesoral (sustitutiva)." },
    { name: "Declaración por prescripción.", description: "Subir Declaración por prescripción." },
    { name: "Solvencias Municipales.", description: "Subir Solvencias Municipales." },
    { name: "Boletín catastral.", description: "Subir Boletín catastral." },
    { name: "División de parcelas.", description: "Subir División de parcelas." },
    { name: "Integración de parcelas.", description: "Subir Integración de parcelas." },
    { name: "Cedulas catastrales.", description: "Subir Cedulas catastrales." },
    { name: "Variables urbanas.", description: "Subir Variables urbanas." },
    { name: "Documentó de venta.", description: "Subir Documentó de venta." },
    { name: "Documento de sociedades mercantiles.", description: "Subir Documento de sociedades mercantiles." },
    { name: "Documento de liberación de hipoteca.", description: "Subir Documento de liberación de hipoteca." },
    { name: "Poderes especiales y amplios.", description: "Subir Poderes especiales y amplios." },
    { name: "Documento de opción a compra.", description: "Subir Documento de opción a compra." },
    { name: "Documento de reserva inmobiliaria.", description: "Subir Documento de reserva inmobiliaria." },
  ])

  await models.Activity.bulkCreate([
    { name: "Suscribirse al sistema", description: "" },
    { name: "Confirmar cita", description: "" },
    { name: "Asistir a la cita pauta", description: "" },
    { name: "Visitar inmueble", description: "" },
    { name: "Realizar inspección del inmueble", description: "" },
    { name: "Acordar monto a publicar", description: "" },
    { name: "Reunión con dueño del inmueble", description: "" },
    { name: "Acordar medios de pago", description: "" },
    { name: "Disposiciones finales", description: "" }
  ])

  let service;
  service = await models.TypeService.findByPk(1)
  await service.setRequirements(requirements1)
  await service.setActivities(activities1)
  service = await models.TypeService.findByPk(2)
  await service.setRequirements(requirements2)
  await service.setActivities(activities2)
  service = await models.TypeService.findByPk(3)
  await service.setRequirements(requirements3)
  await service.setActivities(activities3)
  service = await models.TypeService.findByPk(4)
  await service.setRequirements(requirements4)
  await service.setActivities(activities4)
  
  await models.User.bulkCreate([
    { username: 'ysidrofernandez3012@gmail.com', password: '12345' },
    { username: 'camacaroj21@gmail.com', password: '12345' },
    { username: 'jrosendo', password: '12345' },
    { username: 'jorgechiquinv@gmail.com', password: '12345' },
    { username: 'jochix21@gmail.com', password: '12345' },
    { username: 'martagimenezgomez93@gmail.com', password: '12345' },
    { username: 'dianaromerog1991@gmail.com', password: '12345' },
    { username: 'pablopperezmartinez@gmail.com', password: '12345' },
  ])
  
  await models.TypeNotification.bulkCreate([
  /*1*/  { name: "Recaudo aprobado", urlImage: url + "/public/imgs/typeNotification/RecaudoAprobado.png", urlRedirectIntranet: '/activitiesCollections'},
  /*2*/  { name: "Recaudo rechazado", urlImage: url + "/public/imgs/typeNotification/RecaudoReprobado.png", urlRedirectIntranet: '/activitiesCollections'},
  /*3*/  { name: "Actividad aprobada", urlImage: url + "/public/imgs/typeNotification/ActividadesAprobadas.png", urlRedirectIntranet: '/activitiesCollections'},
  /*4*/  { name: "Actividad rechazada", urlImage: url + "/public/imgs/typeNotification/ActividadesReprobado.png", urlRedirectIntranet: '/activitiesCollections'},
  /*5*/  { name: "Solicitud aprobada", urlImage: url + "/public/imgs/typeNotification/SolicitudAprobadas.png", urlRedirectIntranet: '/activitiesCollections'},
  /*6*/  { name: "Solicitud rechazada", urlImage: url + "/public/imgs/typeNotification/SolicitudReprobados.png", urlRedirectIntranet: '/dashboardcustomer'},
  /*7*/  { name: "Recordatorio", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '/activitiesCollections'},
  /*8*/  { name: "Promoción", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '#'},
  /*9*/  { name: "Solicitud realizada", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '/solicitud'},
  /*10*/ { name: "Cita confirmada", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '/dashboardcustomer'},
  /*11*/ { name: "Cita cancelada", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '/dashboardcustomer'},
  /*12*/ { name: "Transacción cambio de estatus", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '/activitiesCollections'},
  /*13*/ { name: "Recuerda calificarnos", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '/valoracion'},
  /*14*/ { name: "Recaudo subido", urlImage: url + "/public/imgs/typeNotification/Recordatorio.png", urlRedirectIntranet: '/valoracion'}
  ])
  

  let user1 = await models.User.findByPk(1);
  let user2 = await models.User.findByPk(2);
  let user3 = await models.User.findByPk(3);
  let user4 = await models.User.findByPk(4);
  let user5 = await models.User.findByPk(5);
  let user6 = await models.User.findByPk(6);
  let user7 = await models.User.findByPk(7);
  let user8 = await models.User.findByPk(8);

  await user1.setRoles([4]);
  await user3.setRoles([3]);
  await user2.setRoles([3]);
  await user4.setRoles([1]);
  await user5.setRoles([4]);
  
  await user6.setRoles([3]);
  await user7.setRoles([4]);
  await user8.setRoles([4]);

  await models.Client.bulkCreate([{
    UserId: user1.id,
    identification: "25638459",
    birthDate: "30/10/1995",
    firstName: "Ysidro José",
    lastName: "Fernández Sangronis",
    bankName: "Provincial",
    bankAccount: "01089298237843892366",
    phoneNumber: "+584245459394",
    gender: "Masculino",
    ParishId: 12
  },
  {
    UserId: user4.id,
    identification: "26141319",
    birthDate: "23/08/1995",
    firstName: "Jorge",
    lastName: "Chiquín",
    bankName: "Provincial",
    bankAccount: "01089298237843892366",
    phoneNumber: "+584245944668",
    gender: "Masculino",
    ParishId: 120
  },
  {
    UserId: user5.id,
    identification: "2438694",
    birthDate: "19/05/1995",
    firstName: "Luis",
    lastName: "Barraez",
    bankName: "Provincial",
    bankAccount: "01089298237843892366",
    phoneNumber: "04167587462",
    gender: "Masculino",
    ParishId: 200
  },
  {
    UserId: 7,
    identification: "2436994",
    birthDate: "19/05/1995",
    firstName: "Diana",
    lastName: "Romero",
    bankName: "Provincial",
    bankAccount: "01089298237843892366",
    phoneNumber: "04167587462",
    gender: "Femenino",
    ParishId: 302
  },
  {
    UserId: 8,
    identification: "286994",
    birthDate: "19/05/1995",
    firstName: "Pablo",
    lastName: "Perez Martinez",
    bankName: "Provincial",
    bankAccount: "01089298237843892366",
    phoneNumber: "04167587462",
    gender: "Femenino",
    ParishId: 360
  },
  ])
  

  await models.Employee.bulkCreate([{
      UserId: user2.id,
      identification: "24758462",
      firstName: "José Rafael",
      lastName: "Camacaro",
      gender: "Masculino",
      phoneNumber: "04164567391"
    },
    {
      UserId: user3.id,
      identification: "24841262",
      firstName: "Joan",
      lastName: "Rosendo",
      gender: "Masculino",
      phoneNumber: "04164567391"
    },
    {
      UserId: 6,
      identification: "243294",
      firstName: "Marta",
      lastName: "Gimenez Gomez",
      gender: "Femenino",
      phoneNumber: "04164567391"
    }
  ])
  
  await models.Day.bulkCreate([{
      sunday: false,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      EmployeeId: 1
    },
    {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: true,
      thursday: true,
      friday: false,
      saturday: false,
      EmployeeId: 2
    },
    {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      EmployeeId: 3
    },
  ])
  
  await models.Warranty.bulkCreate([
    { name: "Daños electricos", description: "Servicio" },
    { name: "Vigilancia", description: "Vigilantes en las entradas" },
    { name: "Perdidas", description: "Algun siniestro" }
  ])
  await models.TypeRequest.bulkCreate([
    { name: "Visita a inmueble", description: "Solicitar visita a inmueble" },
    { name: "Uso de garantia", description: "Solicitud por uso de garantia" },
    { name: "Servicio", description: "Solicitar un servicio" },
  ])
  
  await models.TypeImage.bulkCreate([
    { name: "Logo", description: "Imágenes de logo" },
    { name: "Carrousel", description: "Imágenes del Carrousel" },
    { name: "Fondo", description: "Imágenes de fondo" },
    { name: "Inmueble", description: "Imágenes de Inmueble" },
  ])
  
  await models.Image.bulkCreate([
    /*{ 
      url: url + "/public/imgs/logo/basic-logo.png",
      description: "Logo sin fondo blanco",
      AgencyId: 1,
      TypeImageId: 1
    },*/
    { 
      url: url + "/public/imgs/logo/gray-logo.png",
      description: "Logo sin fondo gris",
      AgencyId: 1,
      TypeImageId: 1
    }
  ])
  
 
  await models.TypeIncidence.bulkCreate([
    { name: "Error de contrato", description: "Cambiar luego" },
    { name: "Disponibilidad", description: "Cambiar luego" },
    { name: "Impuntualidad del agente", description: "Cambiar luego" },
    { name: "Impuntualidad del cliente", description: "Cambiar luego" },
    { name: "Falta de recaudos", description: "Cambiar luego" },
    { name: "No firmó contrato", description: "Cambiar luego" },
  ])
  
  await models.TypeSpecification.bulkCreate([
    { name: "Estructura", description: "Especificaciones de infraestructura" },
    { name: "Diseño", description: "Color, tipo de piso, etc" },
    { name: "Cercanía", description: "Especificaciones de cercanía" },
  ])

  await models.Specification.bulkCreate([
    { name: "Cantidad de baños", TypeSpecificationId: 1, typeInput: "number" },
    { name: "Cantidad de habitaciones", TypeSpecificationId: 1, typeInput: "number" },
    { name: "Estacionamiento", TypeSpecificationId: 1, typeInput: "checkbox" },
    { name: "Número de plantas", TypeSpecificationId: 1, typeInput: "number" },
    { name: "Número de piso", TypeSpecificationId: 1, typeInput: "number" },
    { name: "Ascensor", TypeSpecificationId: 1, typeInput: "checkbox" },
    { name: "Metros cuadrados", TypeSpecificationId: 1, typeInput: "number" },
    { name: "Cocina", TypeSpecificationId: 1, typeInput: "checkbox" },
    { name: "Sala", TypeSpecificationId: 1, typeInput: "checkbox" },
    { name: "Patio trasero", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Piscina", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Jardín", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Piso de madera", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Piso de granito", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Piso de baldosa", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Piso pulido", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "techo de madera", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "techo de acerolit", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "techo de asbesto", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Cantidad de ventanas", TypeSpecificationId: 2, typeInput: "number" },
    { name: "Alfombras", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Amueblado", TypeSpecificationId: 2, typeInput: "checkbox" },
    { name: "Cerca de escuela", TypeSpecificationId: 3, typeInput: "checkbox" },
    { name: "Cerca de hospital", TypeSpecificationId: 3, typeInput: "checkbox" },
    { name: "Cerca de universidad", TypeSpecificationId: 3, typeInput: "checkbox" },
    { name: "Cerca de aeropuerto", TypeSpecificationId: 3, typeInput: "checkbox" },
    { name: "Cerca de centro comercial", TypeSpecificationId: 3, typeInput: "checkbox" },
    { name: "Cerca de terminal", TypeSpecificationId: 3, typeInput: "checkbox" },
  ])

  await models.TypeAppointment.bulkCreate([
    { name: "Solicitud de servicio", description: "" },
    { name: "Inspección", description: "" },
    { name: "Informal", description: "" },
    { name: "Firma de contrato", description: "" },
    { name: "Visitar inmuebles", description: "" },
    { name: "Por incidencia", description: "" }
  ])
  
    
  await models.Promotion.bulkCreate([
    { name: "Apartamentos a mitad de precio", description: "No te lo pierdas!", urlImage: url + "/public/imgs/promotion/promocion3.jpg" },
    { name: "Casas con 2 cuartos en oferta", description: "Oferta", urlImage: url + "/public/imgs/promotion/promociones2.png" },
    { name: "Alquila un apartamento y lo pintamos", description: "Promocion", urlImage: url + "/public/imgs/promotion/promocion5.jpg" },
  ])


  await models.TypeProperty.bulkCreate([
    { name: "Casa"},
    { name: "Apartamento"},
    { name: "Terreno"},
    { name: "Local Comercial"},
    { name: "Galpón"},
    { name: "Anexo"},
    { name: "Habitación"},
    { name: "Apartamento tipo estudio"}
  ])

  await propertyId1()
  await propertyId2()
  await propertyId3()
  await propertyId4()
  await propertyId5()
  await propertyId6()
  await propertyId7()
  await propertyId8()
  await propertyId9()
  await propertyId10()
  await propertyId11()
  await propertyId12()
  await propertyId13()
  await propertyId14()
  await propertyId15()
  await InitialpropertyId16()
  await InitialpropertyId17()
  await InitialpropertyId18()
  await DesiredpropertyId19()
  

  let typeProperty = await models.TypeProperty.findByPk(1);
  await typeProperty.setSpecifications([1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
  typeProperty = await models.TypeProperty.findByPk(2);
  await typeProperty.setSpecifications([1,2,3,4,6,7,8,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
  typeProperty = await models.TypeProperty.findByPk(3);
  await typeProperty.setSpecifications([7,23,24,25,26,27,28]);
  typeProperty = await models.TypeProperty.findByPk(4);
  await typeProperty.setSpecifications([1,2,3,4,5,6,7,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
  typeProperty = await models.TypeProperty.findByPk(5);
  await typeProperty.setSpecifications([1,3,7,13,14,15,16,17,18,19,23,24,25,26,27,28]);
  typeProperty = await models.TypeProperty.findByPk(6);
  await typeProperty.setSpecifications([1,2,3,4,6,7,8,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
  typeProperty = await models.TypeProperty.findByPk(7);
  await typeProperty.setSpecifications([1,2,3,4,6,7,8,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
  typeProperty = await models.TypeProperty.findByPk(8);
  await typeProperty.setSpecifications([1,2,3,4,6,7,8,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
  
  await models.Request.bulkCreate([
//offeringProperty true
  /*1*/  { requestDate: "28/12/2018", attendedDate: "30/12/2018", wishDate: "30/12/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 1, PropertyId: 1, status: 'R' },
  /*2*/  { requestDate: "28/12/2018", attendedDate: "30/12/2018", wishDate: "31/12/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 1, PropertyId: 1, status: 'A' },
  /*3*/  { requestDate: "28/11/2018", attendedDate: "30/11/2018", wishDate: "30/11/2018", ClientId : 2, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 2, PropertyId: 2, status: 'R' },
  /*4*/  { requestDate: "28/09/2018", attendedDate: "30/09/2018", wishDate: "30/09/2018", ClientId : 2, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 2, PropertyId: 2, status: 'R' },
  /*5*/  { requestDate: "28/09/2018", attendedDate: "30/09/2018", wishDate: "30/09/2018", ClientId : 2, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 2, PropertyId: 2, status: 'R' },
  /*6*/  { requestDate: "02/09/2018", attendedDate: "30/09/2018", wishDate: "30/09/2018", ClientId : 2, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 1, PropertyId: 1, status: 'A' },
  /*7*/  { requestDate: "02/10/2018", attendedDate: "02/10/2018", wishDate: "07/10/2018", ClientId : 2, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 1, PropertyId: 4, status: 'A' },
  /*8*/  { requestDate: "02/01/2019", attendedDate: "02/01/2019", wishDate: "03/01/2019", ClientId : 1, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 2, PropertyId: 9, status: 'A' },
  /*9*/  { requestDate: "05/01/2019", attendedDate: "05/01/2019", wishDate: "06/01/2019", ClientId : 1, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 2, PropertyId: 14, status: 'A' },
  /*10*/  { requestDate: "07/01/2019", attendedDate: "07/01/2019", wishDate: "08/01/2019", ClientId : 2, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 2, PropertyId: 14, status: 'A' },
  /*11*/  { requestDate: "28/09/2018", attendedDate: "30/09/2018", wishDate: "30/09/2018", ClientId : 2, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 2, PropertyId: 7, status: 'A' },
  /*12*/  { requestDate: "20/01/2019", wishDate: "02/02/2019", ClientId : 2, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 2, PropertyId: 11 },
  /*13*/  { requestDate: "21/01/2019", wishDate: "01/02/2019", ClientId : 1, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 2, PropertyId: 11 },
  /*14*/  { requestDate: "21/01/2019", wishDate: "03/02/2019", ClientId : 1, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 1, PropertyId: 13 },
  /*15*/  { requestDate: "21/01/2019", wishDate: "03/02/2019", ClientId : 1, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 1, PropertyId: 13 },
//offeringProperty false  
  /*16*/  { requestDate: "28/09/2018", attendedDate: "30/09/2018", wishDate: "30/09/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 3, PropertyId: 16, status: 'R' },
  /*17*/  { requestDate: "28/12/2018", attendedDate: "28/12/2018", wishDate: "30/12/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 3, PropertyId: 16, status: 'A' },
  /*18*/  { requestDate: "06/08/2018", attendedDate: "06/08/2018", wishDate: "08/08/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 3, PropertyId: 16, status: 'A' },
  /*19*/  { requestDate: "01/01/2019", attendedDate: "01/01/2019", wishDate: "03/01/2019", ClientId : 1, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 4, PropertyId: 17, status: 'A' },
  /*20*/  { requestDate: "24/12/2018", attendedDate: "24/12/2018", wishDate: "27/12/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 4, PropertyId: 17, status: 'R' },
  /*21*/  { requestDate: "24/10/2018", attendedDate: "24/10/2018", wishDate: "27/10/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 4, PropertyId: 17, status: 'R' },
  /*22*/  { requestDate: "24/09/2018", attendedDate: "24/09/2018", wishDate: "27/09/2018", ClientId : 1, TypeRequestId: 3, EmployeeId: 2, TypeServiceId: 4, PropertyId: 17, status: 'R' },
  /*23*/  { requestDate: "21/01/2019", wishDate: "04/02/2019", ClientId : 2, TypeRequestId: 3, EmployeeId: 1, TypeServiceId: 4, PropertyId: 18 },
  
  /*24*/  { requestDate: "21/01/2019", ClientId : 1, TypeRequestId: 3, TypeServiceId: 4, PropertyId: 19, status: 'D' },
    
  ])
  
  await models.Appointment.bulkCreate([
    {
      dateAppointment: "31/12/2018",
      RequestId: 2,
      turn: "PM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "02/01/2019",
      RequestId: 2,
      turn: "AM",
      TypeAppointmentId: 3,
      reason: "Conversar acerca de unos recaudos",
      status: 'E'
    },
    {
      dateAppointment: "30/09/2018",
      RequestId: 6,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "07/10/2018",
      RequestId: 7,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "03/01/2019",
      RequestId: 8,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "06/01/2019",
      RequestId: 9,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "08/01/2019",
      RequestId: 10,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "30/09/2018",
      RequestId: 11,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "30/12/2018",
      RequestId: 17,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "08/08/2018",
      RequestId: 18,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
    {
      dateAppointment: "03/01/2019",
      RequestId: 19,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'E'
    },
//Pending appointments
    {
      dateAppointment: "02/02/2019",
      RequestId: 12,
      turn: "PM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'S'
    },
    {
      dateAppointment: "01/02/2019",
      RequestId: 13,
      turn: "PM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'S'
    },
    {
      dateAppointment: "03/02/2019",
      RequestId: 14,
      turn: "PM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'S'
    },
    {
      dateAppointment: "03/02/2019",
      RequestId: 15,
      turn: "AM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'S'
    },
    {
      dateAppointment: "04/02/2019",
      RequestId: 23,
      turn: "PM",
      TypeAppointmentId: 1,
      reason: "Cita inicial para la solicitud de servicio.",
      status: 'S'
    }
    
  ])
  
  await models.Inspection.bulkCreate([
    { observation: "Casa en buen estado", RequestId: 17, urlFileInspection: url + "/public/documents/inspection/INITIAL_0d9c3c3cfcc44e643a2a134811906062.txt" },
    { observation: "Se detectaron fallas eléctricas", RequestId: 18, urlFileInspection: url + "/public/documents/inspection/INITIAL_0d9c3c3cfcc44e643a2a134811906062.txt" },
  ])
  
  await models.Transaction.bulkCreate([
//offeringProperty true    
  /*1*/  { RequestId: 2, status: C.TRANSACTION_IN_PROCESS, inProcessDate: "2018-12-30" },
  /*2*/  { RequestId: 6, status: C.TRANSACTION_IN_PROCESS, inProcessDate: "2018-09-30" },
  /*3*/  { RequestId: 7, status: C.TRANSACTION_COMPLETED, inProcessDate: "2018-10-07", completedDate: "2018-10-27" },
  /*4*/  { RequestId: 8, status: C.TRANSACTION_CANCELED, inProcessDate: "2019-01-02", incidenceDate: "2019-01-03", canceledDate: "2019-01-07" },
  /*5*/  { RequestId: 9, status: C.TRANSACTION_RESERVED, inProcessDate: "2019-01-06", completedDate: "2019-01-08", reservedDate: "2019-01-11" },
  /*6*/  { RequestId: 10, status: C.TRANSACTION_COMPLETED, inProcessDate: "2019-01-08", completedDate: "2019-01-10" },
  /*7*/  { RequestId: 11, status: C.TRANSACTION_FINISHED, inProcessDate: "2018-09-30", completedDate: "2018-10-30", reservedDate: "2018-11-02", finishedDate: "2018-11-03", },
//offeringProperty false
  /*8*/  { RequestId: 17, status: C.TRANSACTION_IN_PROCESS, inProcessDate: "2018-12-30" },
  /*9*/  { RequestId: 18, status: C.TRANSACTION_INCIDENCE, inProcessDate: "2018-08-08", incidenceDate: "2018-08-12" },
  /*10*/  { RequestId: 19, status: C.TRANSACTION_COMPLETED, inProcessDate: "2019-01-03",  completedDate: "2019-01-12" },
  ])
  
  let transaction1 = await models.Transaction.findByPk(1);
  
  await transaction1.setActivities(activities1)
  await transaction1.setRequirements(requirements1)
  await models.TransactionRequirement.update(
    {
      reviewDate: "4/01/2018",
      uploadDate: "4/01/2018",
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_7789587b43a1b1a0da795b23f973ccf9.pdf",
      status: 'A'
    },
    { 
      where:{
        RequirementId: 1,
        TransactionId: 1,
      }
    }
  )
  await models.TransactionRequirement.update(
    {
      uploadDate: "4/01/2018",
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
      status: 'E'
    },
    { 
      where:{
        RequirementId: 2,
        TransactionId: 1,
      }
    }
  )
  await models.TransactionRequirement.update(
    {
      reviewDate: "5/01/2018",
      uploadDate: "4/01/2018",
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_a2f03211f521be812168a94eb0dad7cc.txt",
      status: 'R',
      observation: "Documento no legible, subirlo de nuevo."
    },
    { 
      where:{
        RequirementId: 3,
        TransactionId: 1,
      }
    }
  )
  
  await sTransaction.approveActivityByTransactionId(1,1)
  await sTransaction.rejectActivityByTransactionId(1, {activityId:2, observation: "Datos erróneos"})
  
  let transaction2 = await models.Transaction.findByPk(2);
  
  await transaction2.setActivities(activities1)
  await transaction2.setRequirements(requirements1)
  
  await models.TransactionRequirement.update(
    {
      reviewDate: "30/09/2018",
      uploadDate: "30/09/2018",
      status: 'A',
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
    },
    { 
      where:{
        TransactionId: 2,
        RequirementId: 13
      }
    }
  )
  
  await models.TransactionActivity.update(
    {
      reviewDate: "30/09/2018",
      uploadDate: "30/09/2018",
      status: 'A',
    },
    { 
      where:{
        TransactionId: 2,
      }
    }
  )
  
  let transaction3 = await models.Transaction.findByPk(3);
  
  await transaction3.setActivities(activities1)
  await transaction3.setRequirements(requirements1)
  
  await models.TransactionRequirement.update(
    {
      reviewDate: "27/10/2018",
      uploadDate: "27/10/2018",
      status: 'A',
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
    },
    { 
      where:{
        TransactionId: 3
      }
    }
  )
  
  await models.TransactionActivity.update(
    {
      reviewDate: "27/10/2018",
      uploadDate: "27/10/2018",
      status: 'A',
    },
    { 
      where:{
        TransactionId: 3
      }
    }
  )
  
  
  
  let transaction4 = await models.Transaction.findByPk(4);
  
  await transaction4.setActivities(activities2)
  await transaction4.setRequirements(requirements2)
  
  let transaction5 = await models.Transaction.findByPk(5);
  
  await transaction5.setActivities(activities2)
  await transaction5.setRequirements(requirements2)
  
  await models.TransactionRequirement.update(
    {
      reviewDate: "07/01/2019",
      uploadDate: "07/01/2019",
      status: 'A',
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
    },
    { 
      where:{
        TransactionId: 5
      }
    }
  )
  
  await models.TransactionActivity.update(
    {
      reviewDate: "07/01/2019",
      uploadDate: "07/01/2019",
      status: 'A',
    },
    { 
      where:{
        TransactionId: 5
      }
    }
  )
  
  let transaction6 = await models.Transaction.findByPk(6);
  
  await transaction6.setActivities(activities2)
  await transaction6.setRequirements(requirements2)
  
  await models.TransactionRequirement.update(
    {
      reviewDate: "09/01/2019",
      uploadDate: "09/01/2019",
      status: 'A',
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
    },
    { 
      where:{
        TransactionId: 6
      }
    }
  )
  
  await models.TransactionActivity.update(
    {
      reviewDate: "09/01/2019",
      uploadDate: "09/01/2019",
      status: 'A',
    },
    { 
      where:{
        TransactionId: 6
      }
    }
  )
  
  let transaction7 = await models.Transaction.findByPk(7);
  
  await transaction7.setActivities(activities2)
  await transaction7.setRequirements(requirements2)
  
  await models.TransactionRequirement.update(
    {
      reviewDate: "09/01/2019",
      uploadDate: "09/01/2019",
      status: 'A',
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
    },
    { 
      where:{
        TransactionId: 7
      }
    }
  )
  
  await models.TransactionActivity.update(
    {
      reviewDate: "09/01/2019",
      uploadDate: "09/01/2019",
      status: 'A',
    },
    { 
      where:{
        TransactionId: 7
      }
    }
  )
  
  let transaction8 = await models.Transaction.findByPk(8);
  
  await transaction8.setActivities(activities3)
  await transaction8.setRequirements(requirements3)
  
  await sTransaction.approveActivityByTransactionId(8,1)
  
  let transaction9 = await models.Transaction.findByPk(9);
  
  await transaction9.setActivities(activities3)
  await transaction9.setRequirements(requirements3)
  
  await sTransaction.approveActivityByTransactionId(9,1)
  
  
  
  let transaction10 = await models.Transaction.findByPk(10);
  
  await transaction10.setActivities(activities4)
  await transaction10.setRequirements(requirements4)
  
  await models.TransactionRequirement.update(
    {
      reviewDate: "09/01/2019",
      uploadDate: "09/01/2019",
      status: 'A',
      urlFileRequirement: url + "/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
    },
    { 
      where:{
        TransactionId: 10
      }
    }
  )
  
  await models.TransactionActivity.update(
    {
      reviewDate: "09/01/2019",
      uploadDate: "09/01/2019",
      status: 'A',
    },
    { 
      where:{
        TransactionId: 10
      }
    }
  )
  
  
  await models.Contract.bulkCreate([
    { folioNumber: "F001", elaborationDate: "03/11/2018", firmDate: "04/11/2018", urlFileContract: url + "/public/documents/contract/INITIAL_abd45ef84b9767d4a354ce2fec7cd326.pdf", TransactionId: 7 },
  ])
  
  
  await models.Incidence.bulkCreate([
    { name: "El cliente nunca apareció", description: "Ocurrió un problema", TypeIncidenceId: 5, TransactionId: 4, decision: true, status: 'A'},
    { name: "Detalles en la inspección", description: "Se encontraron fallas eléctricas graves", TypeIncidenceId: 3, TransactionId: 9 },
  ])
  
  await models.TypeContact.bulkCreate([
    { name: "Sugerencias", description: "Sugerencias de personas" },
    { name: "Quejas", description: "Quejas de personas" },
    { name: "Dudas", description: "Dudas de personas" },
  ])
  
  await models.Subject.bulkCreate([
      { name: "Respecto al Servicio", description: "falta poner" },
      { name: "Atencion al cliente", description: "falta poner" },
      { name: "Promociones y Ofertas", description: "falta poner" },
      { name: "Graficas y Contenido", description: "falta poner" },
      { name: "Tiempos de Respuesta", description: "falta poner" },
      { name: "Aplicacion Web", description: "falta poner" },
      { name: "Aplicacion Movil", description: "falta poner" },
      { name: "Otros", description: "falta poner" }
  ])

  await models.Contact.bulkCreate([
    { name: "Mejorar portal web", description: "Deberian mejorar el portal web", TypeContactId: 1, SubjectId: 5, guestEmail: "jorgechiquinv@gmail.com", status:'E', contactDate: "15/12/2018" },
    { name: "No puedo registrarme", description: "Como me registro ?", TypeContactId: 2, SubjectId: 6, guestEmail: "jorgechiquinv@gmail.com", status:'A', contactDate: "15/11/2018" },
    { name: "Como publico mi apartamento ?", description: "duda", TypeContactId: 3, UserId: 1, SubjectId: 1, status:'E', contactDate: "15/11/2018" },
    { name: "Mejorar este aspecto", description: "Los tiempos de respuestas podrían ser...", TypeContactId: 1, UserId: 4, SubjectId: 5, status:'A', contactDate: "15/12/2018" },
    { name: "No me parece", description: "No me gusta la interfaz", TypeContactId: 2, UserId: 4, SubjectId: 7, status:'E', contactDate: "15/01/2019" },
    { name: "No entiendo", description: "Cómo puedo solicitar un servicio por el correo?", TypeContactId: 3, UserId: 5, SubjectId: 1, status:'A', contactDate: "15/01/2019" },
    { name: "Está mal", description: "Nunca me llegan propiedades por promociones", TypeContactId: 2, UserId: 5, SubjectId: 3, status:'E', contactDate: "15/09/2018" },
    { name: "Puedo anunciarme con ustedes?", description: "Quiero colocar publicidad en su página web", TypeContactId: 3, UserId: 5, SubjectId: 6, status:'E', contactDate: "15/09/2018" },
    { name: "Queja con agente", description: "El agente que me atendió fue inecifiente", TypeContactId: 2, guestEmail: "jorgechiquinv@gmail.com", SubjectId: 2, status:'A', contactDate: "15/10/2018" },
    { name: "Nuevas notificaciones", description: "Podrían poner notificaciones mediante fax", TypeContactId: 1, UserId: 1, SubjectId: 8, status:'A', contactDate: "15/11/2018" },
    { name: "Nuevas notificaciones", description: "Podrían poner notificaciones mediante fax", TypeContactId: 2, UserId: 4, SubjectId: 7, status:'A', contactDate: "15/09/2018" },
  ])

  await models.TypeCalification.bulkCreate([
    { name: "La comunicación y el acuerdo sobre las fechas de visitas se efectuaron sin ningún tipo de problemas.", description: "" },
    { name: "El agente inmobiliario fue puntual.", description: "" },
    { name: "El agente actuó de manera profesional.", description: "" },
    { name: "El agente estuvo bien informado y nos facilitó todos los datos e información relevante", description: "" },
    { name: "¿Cómo evaluarías la calidad de servicios que proveemos?", description: "" }
  ])
  
  await models.QualificationCriteria.bulkCreate([
    { name: "Muy malo", description: "" },
    { name: "Malo", description: "" },
    { name: "Regular", description: "" },
    { name: "Bueno", description: "" },
    { name: "Muy bueno", description: "" }
  ])

  await models.Calification.bulkCreate([
    { QualificationCriteriumId: 1, TypeCalificationId: 1, TransactionId: 1 },
    { QualificationCriteriumId: 4, TypeCalificationId: 2, TransactionId: 1 },
    { QualificationCriteriumId: 5, TypeCalificationId: 3, TransactionId: 1 },
  ])

  
  
  await models.User.update({
    notificationEmail: true,
    notificationSMS: true,
    notificationWS: true
  },{ where: {}})
  
}

module.exports = {
  initialization,
}
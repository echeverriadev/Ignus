let authentication = require("./middlewares/authentication"),
	logRequest = require("./middlewares/logRequest");
	
let rUser = require("./routes/rUser"),
	rAgency = require("./routes/rAgency"),
	rClient = require("./routes/rClient"),
	rEmployee = require("./routes/rEmployee"),
	rRole = require("./routes/rRole"),
	rTypeEmployee = require("./routes/rTypeEmployee"),
	rTypeService = require("./routes/rTypeService"),
	rRequirement = require("./routes/rRequirement"),
	rActivity = require("./routes/rActivity"),
	rSocialNetwork = require("./routes/rSocialNetwork"),
	rFunction = require("./routes/rFunction"),
	rWarranty = require("./routes/rWarranty"),
	rContract = require("./routes/rContract"),
	rTypeRequest = require("./routes/rTypeRequest"),
	rTypeIncidence = require("./routes/rTypeIncidence"),
	rIncidence = require("./routes/rIncidence"),
	rTypeSpecification = require("./routes/rTypeSpecification"),
	rSpecification = require("./routes/rSpecification"),
	rState = require("./routes/rState"),
	rPromotion = require("./routes/rPromotion"),
	rProperty = require("./routes/rProperty"),
	rTypeProperty = require("./routes/rTypeProperty"),
	rRequest = require("./routes/rRequest"),
	rMunicipality = require("./routes/rMunicipality"),
	rTypeContact = require("./routes/rTypeContact"),
	rContact = require("./routes/rContact"),
	rTransaction = require("./routes/rTransaction"),
	rTypeCalification = require("./routes/rTypeCalification"),
	rCalification = require("./routes/rCalification"),
	rAppointment = require("./routes/rAppointment"),
	rNotification = require("./routes/rNotification"),
	rSubject = require("./routes/rSubject"),
	rColor = require("./routes/rColor"),
	rInspection = require("./routes/rInspection"),
	rQualificationCriteria = require("./routes/rQualificationCriteria"),
	rTypeAppointment = require("./routes/rTypeAppointment"),
	rReport = require("./routes/rReport");
		
		
let cUser = require("./controllers/cUser"),
		cInitialization = require("./controllers/cInitialization");

let formidable = require('express-formidable');
let favicon = require('serve-favicon')

let express = require("express"),
	bodyParser = require("body-parser"),
	cors = require('cors'),
	path = require('path');

const { pathRootStaticFiles } = require('./config')


let app = express();
//middlewares third-party
app.use(favicon(path.join(__dirname, 'public', 'imgs', 'src_favicon.ico')))
app.use(cors());
//app.use(bodyParser.json({limit: '50mb', extended: true}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(formidable(
		{
			encoding: 'utf-8',
			//uploadDir: path.join(__dirname, 'uploads'),
			multiples: true,
			keepExtensions:true// req.files to be arrays of files
		}
	)
);
app.use(`/${pathRootStaticFiles}`, express.static(__dirname + `/${pathRootStaticFiles}`));

//middlewares own
app.use(logRequest);
//app.use("/api", authentication);

//Private Routes
app.use("/api/user", rUser);
app.use("/api/client", rClient);
app.use("/api/employee", rEmployee);
app.use("/api/agency", rAgency);
app.use("/api/role", rRole);
app.use("/api/typeService", rTypeService);
app.use("/api/typeEmployee", rTypeEmployee);
app.use("/api/requirement", rRequirement);
app.use("/api/activity", rActivity);
app.use("/api/socialNetwork", rSocialNetwork);
app.use("/api/function", rFunction);
app.use("/api/warranty", rWarranty);
app.use("/api/contract", rContract);
app.use("/api/typeRequest", rTypeRequest);
app.use("/api/typeIncidence", rTypeIncidence);
app.use("/api/Incidence", rIncidence);
app.use("/api/typeSpecification", rTypeSpecification);
app.use("/api/Specification", rSpecification);
app.use("/api/state", rState);
app.use("/api/promotion", rPromotion);
app.use("/api/property", rProperty);
app.use("/api/typeProperty", rTypeProperty);
app.use("/api/promotion", rPromotion);
app.use("/api/request", rRequest);
app.use("/api/typeContact", rTypeContact);
app.use("/api/Contact", rContact);
app.use("/api/municipality", rMunicipality);
app.use("/api/transaction", rTransaction);
app.use("/api/typeCalification", rTypeCalification);
app.use("/api/calification", rCalification);
app.use("/api/appointment", rAppointment);
app.use("/api/notification", rNotification);
app.use("/api/subject", rSubject);
app.use("/api/color", rColor);
app.use("/api/inspection", rInspection);
app.use("/api/qualificationCriteria", rQualificationCriteria);
app.use("/api/typeAppointment", rTypeAppointment);
app.use("/api/report", rReport);

//Public Routes
// app.post('/users', cUser.addUser); // this path will be changed
app.get("/login",cUser.login);
app.get("/initialization",cInitialization.initialization);

app.get("/", (req,res) => {
	res.status(200).json({status:true,message:"A legend was born today"})
})

app.use((req, res, next) => {
  res.sendStatus(404)
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500)
});






module.exports = app;
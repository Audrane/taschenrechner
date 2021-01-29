import * as express from "express";

let __dirname;

const router: express.Express = express();
router.listen(9090);
router.use(express.urlencoded({extended: false}));
router.use(express.json());

//die route wird in html benötigt
router.use("/html", express.static(__dirname + "/html"));
router.use("/css", express.static(__dirname + "/css"));
router.use("/scripts", express.static(__dirname + "/scripts"));

router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendfile(__dirname + "/html/index.html");
});



router.post("/calculator/add", (req: express.Request, res: express.Response) => {
// wann req.query  get
// wann req.body? post

    try {
        const query = req.body;

        console.log("Ich bin da\n");
        console.log("Ich habe diese Operation bekommen " + query.operation);
        let y = eval(query.operation);
        console.log(y);

        res.status(200);
        res.json({wert:y});
    } catch (e) {
        console.log(e);
        res.status(404);
        res.send("Etwas ist schiefgelaufen in dem Server.\nSiehe bitte Log-Infos in Server-Konsole");
    }


});
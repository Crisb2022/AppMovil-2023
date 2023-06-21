import express, { request } from "express";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT :number= 3000;

app.use(cors());

app.get("/ping", (req, res) => {
    console.log("alguien a dado ping");
    res.setHeader("Content-Type", "application/json");
    res.send("pong")
})

app.get("/hola/:nombres/:apellidos", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const nombre = req.params.nombres;
    const apellido = req.params.apellidos;
    console.log("Alguien a ingresado sus nombres");

    res.send({nombre: nombre, apellido: apellido});

})

app.listen(PORT,() => {
     console.log("server iniciado" + PORT);
})


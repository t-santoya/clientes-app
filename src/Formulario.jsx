import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Formulario.css";

function Formulario() {
    const [datos, setDatos] = useState({
        nombre: "",
        telefono: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await addDoc(collection(db, "clientes"), {
            nombre: datos.nombre,
            telefono: datos.telefono,
            mensaje: datos.mensaje,
            fecha: new Date(),
        });

        alert("Cliente guardado correctamente ✅");
        setDatos({
            nombre: "",
            telefono: "",
            mensaje: ""
        });
    } catch (error) {
        console.error(error);
        alert("Error al guardar ❌");
    }
};

    return (
    <div className="contenedor">
        <div className="tarjeta">
        <h2 className="titulo">Registro de Clientes</h2>

        <form className="formulario" onSubmit={handleSubmit}>
            <input
            className="input"
            type="text"
            name="nombre"
            placeholder="Nombre del cliente"
            value={datos.nombre}
            onChange={handleChange}
            required
            />

            <input
            className="input"
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={datos.telefono}
            onChange={handleChange}
            required
            />

            <textarea
            className="input"
            name="mensaje"
            placeholder="Mensaje / pedido"
            value={datos.mensaje}
            onChange={handleChange}
            rows="3"
            required
            />

            <button className="boton" type="submit">
            Guardar cliente
            </button>
        </form>
        </div>
    </div>
    );
}

export default Formulario;

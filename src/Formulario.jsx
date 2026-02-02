import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Formulario.css";
import logo from "./assets/logo.png";

function Formulario() {
    const [datos, setDatos] = useState({
        nombre: "",
        telefono: "",
        informacion: "",
        compra: "no",
        cedula: "",
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
            informacion: datos.informacion || "",
            compra: datos.compra,
            cedula: datos.compra === "si" ? datos.cedula : "",
            fecha: new Date(),
        });

        alert("Cliente guardado correctamente ✅");

        setDatos({
            nombre: "",
            telefono: "",
            informacion: "",
            compra: "no",
            cedula: "",
        });
    } catch {
        alert("Error al guardar ❌");
    }
};

return (
<div className="contenedor">

        <div className="tarjeta">

        <img src={logo} alt="Logo" className="logo" />

        <h2 className="titulo">Registro de Clientes</h2>

        <form className="formulario" onSubmit={handleSubmit}>
            <input
            className="input"
            name="nombre"
            placeholder="Nombre"
            value={datos.nombre}
            onChange={handleChange}
            required
            />

            <input
            className="input"
            name="telefono"
            placeholder="Teléfono"
            value={datos.telefono}
            onChange={handleChange}
            required
            />

            <textarea
            className="input"
            name="informacion"
            placeholder="Información (opcional)"
            value={datos.informacion}
            onChange={handleChange}
            rows="3"
            />

          {/* COMPRA */}
            <div className="radio-group">
            <p>¿Realizó compra?</p>

            <label>
                <input
                type="radio"
                name="compra"
                value="si"
                checked={datos.compra === "si"}
                onChange={handleChange}
                    />
                    Sí
            </label>

            <label>
                <input
                type="radio"
                name="compra"
                value="no"
                checked={datos.compra === "no"}
                onChange={handleChange}
                />
                No
            </label>
    </div>

          {/* CÉDULA SOLO SI COMPRÓ */}
    {datos.compra === "si" && (
            <input
                className="input"
                name="cedula"
                placeholder="Cédula"
                value={datos.cedula}
                onChange={handleChange}
                required
            />
    )}

    <button className="boton" type="submit">
            Guardar cliente
    </button>
        </form>
    </div>
    </div>
    );
}

export default Formulario;

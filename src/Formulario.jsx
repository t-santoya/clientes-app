import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Formulario.css";

function Formulario() {
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    informacion: "",
    compra: "No",
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
        cedula: datos.compra === "Sí" ? datos.cedula : "",
        fecha: new Date(),
      });

      alert("Cliente guardado correctamente ✅");

      setDatos({
        nombre: "",
        telefono: "",
        informacion: "",
        compra: "No",
        cedula: "",
      });
    } catch {
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
            placeholder="Nombre"
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
            name="informacion"
            placeholder="Información (opcional)"
            value={datos.informacion}
            onChange={handleChange}
            rows="3"
          />

          <select
            className="input"
            name="compra"
            value={datos.compra}
            onChange={handleChange}
          >
            <option value="No">No compró</option>
            <option value="Sí">Sí compró</option>
          </select>

          {datos.compra === "Sí" && (
            <input
              className="input"
              type="text"
              name="cedula"
              placeholder="Cédula (solo si compra)"
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

import React from "react";
import "./DataNotFound.css";
import VecinoIcon from "./Icons/VecinoIcon";

const DataNotFound: React.FC<{hidden?: boolean}> = ({hidden=false}) => {
  return (
    <div className="ion-padding" hidden={hidden}>
      <div className="data-not-found-container">
        <VecinoIcon
          width="50"
          height="50"
          fill="#b0b0b0"
          className="data-not-found-icon"
        />
        <h2>Datos no encontrados</h2>
        <p>Lo sentimos, no pudimos encontrar datos para su búsqueda.</p>
      </div>
    </div>
  );
};

export default DataNotFound;

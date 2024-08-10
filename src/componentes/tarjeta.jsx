

function Tarjeta({ titulo, cuerpo, className }) {
  return (
    <div className={"card bg-base-100 w-96 shadow-xl " + className}>
      <div className="card-body">
        <h2 className="card-title">{titulo}</h2>
        <p>{cuerpo}</p>
      </div>
    </div>
  );
}

export default Tarjeta;
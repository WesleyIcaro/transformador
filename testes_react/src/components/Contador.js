import { useState } from 'react'

function Contador() {
  const [contador, setContador] = useState(1)

  function somador() {
    setContador(contador + 1)
  }
  return (
    <div>
      <div>{contador}</div>
      <button onClick={somador}>Adicionar</button>
    </div>
  )
}

export default Contador

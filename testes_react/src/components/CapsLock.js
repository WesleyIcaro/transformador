import { v4 as uuidv4 } from 'uuid'

import '../styles/CapsLock.css'

import { useEffect, useState } from 'react'
import React from 'react'

const API = 'http://localhost:5000'

function CapsLock() {
  const [textoMinusculo, setMinusculo] = useState('')
  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      const res = await fetch(API + '/palavras')
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))

      setLoading(false)

      setLista(res)
    }
    loadData()
  }, [])

  const guardarPalavraNoDb = async e => {
    e.preventDefault()

    const textoMaiusculo = textoMinusculo.toUpperCase()
    const palavra = {
      id: uuidv4(),
      textoMinusculo,
      textoMaiusculo
    }

    await fetch(API + '/palavras', {
      method: 'POST',
      body: JSON.stringify(palavra),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setLista(prevState => [...prevState, palavra])

    setMinusculo('')
  }

  function maiusculo() {
    setMinusculo(textoMinusculo)

    console.log(textoMinusculo)
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className="page">
      <h1 className="title">
        Transformador de frases ou palavras minúsculas em palavras maiúsculas
      </h1>
      <form className="form-control" onSubmit={guardarPalavraNoDb}>
        <input
          type="text"
          name="text"
          placeholder="Texto"
          onChange={e => setMinusculo(e.target.value)}
          value={textoMinusculo || ''}
          required
        />
        <button className="button" onClick={maiusculo}>
          Tornar maiuscula
        </button>
      </form>
      <div className="lists">
        <h2 className="subtitle">Frases ou palavras em maiúsuculo:</h2>
        {lista.length === 0 && <p>Não há Textos</p>}
        {lista.map(palavra => (
          <div className="list-items" key={palavra.id}>
            <p className="item">{palavra.textoMaiusculo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CapsLock

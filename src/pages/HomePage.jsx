import { useEffect, useState } from 'react'
import { fetchProductStatements } from '../lib/statements'

const PRODUCT_CODE = 'milebrick'
const LANG = 'pt'

export default function HomePage() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null })

  useEffect(() => {
    let active = true
    fetchProductStatements(PRODUCT_CODE, LANG)
      .then((data) => {
        if (active) setState({ status: 'ready', data, error: null })
      })
      .catch((error) => {
        if (active) setState({ status: 'error', data: null, error: error.message })
      })
    return () => {
      active = false
    }
  }, [])

  const { status, data, error } = state

  return (
    <main className="home">
      <p className="eyebrow">Cosmopia</p>

      {status === 'loading' && <p className="muted">Carregando…</p>}
      {status === 'error' && (
        <p className="alert">Não foi possível carregar o conteúdo: {error}</p>
      )}
      {status === 'ready' && !data && (
        <p className="muted">Supabase não configurado neste ambiente.</p>
      )}

      {status === 'ready' && data && (
        <>
          {data.vision && <h1>{data.vision}</h1>}
          {data.mission && <p className="home-hero__lead">{data.mission}</p>}

          {data.values.length > 0 && (
            <section className="home-values">
              {/* Title left implicit — the list stands on its own. */}
              <ul>
                {data.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  )
}

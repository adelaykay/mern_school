import { useState, useEffect } from 'react'

const useFetch = (url, meth = 'GET', args = {}) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortCont = new AbortController()

    fetch(url, {
      method: meth,
      // body: args && JSON.stringify(args),
      headers: { 'Content-Type': 'application/json' },
      signal: abortCont.signal,
    })
      .then(res => {
        console.log(res)
        if (!res.ok) {
          throw Error("Couldn't fetch data from server")
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        setData(data)
        setIsPending(false)
        setError(null)
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          setIsPending(false)
          setError(err.message)
        }
      })

    return () => abortCont.abort
  }, [url])

  return { data, isPending, error }
}

export default useFetch

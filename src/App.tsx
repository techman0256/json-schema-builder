// import { Button } from './components/ui/button'
import JSONObject from './components/JSONObject'
import './App.css'
import { useRef, useState } from 'react'

function App() {
  const [schema, setSchema] = useState({});
  const path = useRef([]);
  return (
    <>
     <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      JSON Schema Builder
    </h1>

      <JSONObject
        schema={schema}
        setSchema={setSchema}
        path={path.current}
      />

    </>
  )
}

export default App

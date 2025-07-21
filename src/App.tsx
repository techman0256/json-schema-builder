// import { Button } from './components/ui/button'
import { useEffect } from "react";
import JSONObject from './components/JSONObject'
import './App.css'
import { useRef, useState } from 'react'
import parseSchemaToJSON from '@/components/utils/schemaToJSON'
import JSONTextarea from "./components/JSONTextarea";

function App() {
  const [schema, setSchema] = useState({});
  const [JSON, setJSON] = useState({});
  const path = useRef([]);

  useEffect(() => {
    console.log('💾 schema now =', schema);
    const newJSON = parseSchemaToJSON(schema);
    console.log(newJSON);
    
    setJSON(newJSON);
  }, [schema]);
  
  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        JSON Schema Builder
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <JSONObject
          schema={schema}
          setSchema={setSchema}
          path={path.current}
        />

        <JSONTextarea data={JSON} />
      </div>
    </>
  )
}

export default App

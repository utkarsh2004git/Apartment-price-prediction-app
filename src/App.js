import React, { useEffect, useState } from 'react'

const App = () => {


  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    fetch("api/ml")
      .then(res => res.json())
      .then(data => { setAccuracy(data.accuracy) })
  }, [])

  return (
    <>

      <div className=''>Accuracy : {accuracy}</div>
    </>
  )
}

export default App
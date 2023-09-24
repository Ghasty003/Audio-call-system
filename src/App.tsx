import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import CallModal from './components/CallModal'
import CallScreen from './components/CallScreen'

function App() {
  const { ui } = useSelector((state: any) => state.interface)

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (ui !== "modal") {
      setShowModal(false);
    }
  }, [ui]);

  return (
    <>
      <CallModal show={showModal} />
      <CallScreen show={!showModal} />
    </>
  )
}

export default App

import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    } 

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]) //setPassword for optimization only 

  // copy function
  const copyPasswordToClipboard = useCallback(
    () => {
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select();
      // to select a range of password only
      passwordRef.current?.setSelectionRange(0, 50);
      // passwordRef.current?.focus();
    },
    [password]
  )
  


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-200">
      <h1 className="text-xl font-bold text-center mb-4">Password Generator</h1>

      {/* Input + Copy Button Side by Side */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 rounded-l"
          placeholder="Your Password"
          readOnly
          ref = {passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
        className="outline-none bg-blue-700 text-white px-3 py-1 rounded-r">
          Copy
        </button>
      </div>

      {/* Range Slider Below on Left */}
      <div className='flex items-center gap-x-2'>
      <div className="flex items-center gap-x-2">
        <input
          type="range"
          min={8}
          max={50}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <label>length: {length}</label>
      </div>
      <div className='flex items-center gap-x-0 '>
        <input
          type="checkbox"
          id='numberinput'
          defaultChecked={numberAllowed}
          onChange={() => { setNumberAllowed((prev) => !prev) }} />
        <label className = 'flex'htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-0'>
        <input
          type = 'checkbox'
          id='charinput'
          defaultChecked={charAllowed}
          onChange={ () => {setCharAllowed((prev) => !prev)}}
          />
          <label className = 'flex'htmlFor='charinput'>Characters</label>
   
      </div>
    </div>
    </div>
  )
}

export default App
  
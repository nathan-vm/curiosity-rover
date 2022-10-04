import { useCallback, useMemo, useState } from 'react'
import './styles/main.css'
import curiosityImg from './assets/curiosity.png'
import { useRover } from './context'
import api from './service/api'

function App() {
  const { position, setPosition } = useRover()
  const [movement, setMovement] = useState("")

  const delay = useCallback((timeOut: number) => new Promise((res, rej) => setTimeout(res, timeOut)), [])

  const handleSubmit = useCallback(async (movement: string) => {
    const { data } = await api.post("/move", {
      position,
      movement
    })

    for (var i = 0; i < data.length; i++) {
      await delay(2000)
      console.log(data[i])
      setPosition(data[i])
    }

  }, [position])

  const table = useMemo(() => {
    const table = Array(9).fill(null).map(() => Array(9).fill(""))
    let displayY = position.y
    let displayX = position.x

    if (position.y > 4) {
      displayY = 4
    } else if (position.y < 0) {
      displayY = 0
    }
    if (position.x > 4) {
      displayX = 4
    } else if (position.x < 0) {
      displayX = 0
    }

    table[displayY][displayX] = position.direction
    return table
  }, [position])

  const image = useMemo(() => {
    let deg = 'rotate-0'
    switch (position.direction) {
      case "N":
        deg = 'rotate-0'
        break;
      case "S":
        deg = 'rotate-180'
        break;
      case "E":
        deg = 'rotate-90'
        break;
      case "W":
        deg = 'rotate-[270deg]'
        break;

      default:
        break;
    }

    return (
      <img className={`transform ${deg} transition-all`} src={curiosityImg} alt="curiosity" />
    )
  }, [position])

  const empty = useMemo(() => (
    <div className='w-10 h-10' ></div>
  ), [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <h1 className="text-6xl text-white font-black mt-10" >
        Curiosity Rover
      </h1>
      <main className='grid grid-cols-12 gap-4 mt-8'>
        <div className='bg-game-gradient p-10 rounded-lg col-span-10 content-center'>
          <table className='m-auto'>
            <tbody>
              {table.slice(0)
                .reverse()
                .map((row, idx) => (
                  (
                    <tr key={`${idx}-row`}>
                      <p className='font-bold'>
                        {table.indexOf(row)}
                      </p>
                      {row.map((col, idx) => (
                        <td key={`${idx}-col`} className='border p-4 w-3 h-3 border-solid border-spacing-1 border-black' >
                          {col ? image : empty}
                        </td>
                      ))}
                    </tr>
                  )
                )
                )}
            </tbody>
            <tfoot>
              <tr>
                <th>{" "}</th>
                {table[0].map((_, i) => (
                  <th className='p-4 w-3 h-3'>{i}</th>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        <div className=' ' >
          <input value={movement} onChange={(e) => setMovement(e.target.value)} />
          <button onClick={() => handleSubmit(movement)} >Teste</button>
          <button onClick={() => setPosition({ x: 1, y: 2, direction: "N" })} >Reset</button>
        </div>
      </main>

    </div>
  )
}

export default App

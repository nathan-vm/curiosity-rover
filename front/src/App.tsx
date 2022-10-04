import { useCallback, useMemo, useState } from 'react'
import './styles/main.css'
import curiosityImg from './assets/curiosity.png'
import { Direction, useRover } from './context'
import api from './service/api'

function App() {
  const { position, setPosition } = useRover()
  const [movement, setMovement] = useState("")
  const [directionSeted, setDirectionSeted] = useState<Direction>("N")
  const [size, setSize] = useState(9)
  const [positionY, setPositionY] = useState(0)
  const [positionX, setPositionX] = useState(0)

  const delay = useCallback((timeOut: number) => new Promise((res, rej) => setTimeout(res, timeOut)), [])

  const handleSubmit = useCallback(async (movement: string) => {
    const { data } = await api.post("/move", {
      position,
      movement
    })

    for (var i = 0; i < data.length; i++) {
      await delay(500)
      setPosition(data[i])
    }

  }, [position])

  const table = useMemo(() => {
    const table = Array(size).fill(null).map(() => Array(size).fill(""))
    const maxIndex = size - 1
    let displayY = position.y
    let displayX = position.x

    if (position.y > maxIndex) {
      displayY = maxIndex
    } else if (position.y < 0) {
      displayY = 0
    }
    if (position.x > maxIndex) {
      displayX = maxIndex
    } else if (position.x < 0) {
      displayX = 0
    }

    table[displayY][displayX] = position.direction
    return table
  }, [position, size])

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

  const verifyDirection = useCallback((direction: string): Direction => {
    switch (direction) {
      case "N":

        return "N"
      case "S":

        return "S"
      case "E":

        return "E"
      case "W":

        return "W"

      default:
        return "N"
    }
  }, [])

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
        <div className='grid grid-rows-12 gap-4 ' >
          <div>
            <label id='size' > Bord Size </label>
            <input
              id='size'
              name='size'
              type="number"
              placeholder='size'
              value={size}
              onChange={(e) => setSize(Number(e.target.value) > 1 ? Number(e.target.value) : 2)}
            />
          </div>
          <div>

            <label id='position-x' > Position X</label>
            <input
              id='position-x'
              name='position-x'
              placeholder='position-x'
              value={positionX}
              onChange={(e) => setPositionX(Number(e.target.value))}
            />
            <label id='position-y' > Position Y</label>
            <input placeholder='position-y' value={positionY} onChange={(e) => setPositionY(Number(e.target.value))} />

            <label id='direction' > Direction </label>
            <input placeholder='direction' value={directionSeted} onChange={(e) => setDirectionSeted(verifyDirection(e.target.value))} />
            <button onClick={() => setPosition({ x: positionX, y: positionY, direction: directionSeted })} >Set Position</button>
          </div>

          <div>
            <label id='movement' > Movement (only "M" | "L" | "R") </label>
            <input name="movement" value={movement} onChange={(e) => setMovement(e.target.value)} />
            <button onClick={() => handleSubmit(movement)} >Teste</button>
          </div>
        </div>
      </main>

    </div>
  )
}

export default App

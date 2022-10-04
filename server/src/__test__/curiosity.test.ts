import { Curiosity, State } from "../curiosity"

describe("Curiosity rover business rules", ()=>{
  it("should be able to move forward", ()=>{
    const curiosity = new Curiosity({x:0,y:0,direction:'N'})

    curiosity.move("M")

    const expectedState: State = {
      x:0,
      y:1,
      direction: "N"
    }

    expect(curiosity.state).toStrictEqual(expectedState)
  })
  it("should be able to recibe movement string and interpret it", ()=>{
    const curiosity = new Curiosity({x:1,y:2,direction:'N'})

    curiosity.move("LMLMLMLMM")

    const expectedState: State = {
      x:1,
      y:3,
      direction: "N"
    }

    expect(curiosity.state).toStrictEqual(expectedState)
  })

  it("should be able to ignore invalid args", ()=>{
    const curiosity = new Curiosity({x:0,y:0,direction:'N'})

    curiosity.move("invalid movement")

    const expectedState: State = {
      x:0,
      y:0,
      direction: "N"
    }

    expect(curiosity.state).toStrictEqual(expectedState)
  })

  it("should be calls moveForward function every \"M\" string received", ()=>{
    const curiosity = new Curiosity({x:0,y:0,direction:'N'})
    const spyFn = jest.spyOn(Curiosity.prototype as any, "moveForward")
    curiosity.move("MMM")

    expect(spyFn).toBeCalledTimes(3)
  })
})
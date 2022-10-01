export type State = { 
  x: number; 
  y: number; 
  direction: 'N' | 'S' | 'W' | 'E' 
}
type MovChar = "L" | "R" | "M"

export class Curiosity {
  constructor(public state: State = {x:0, y:0, direction:'N'}) { }

  public move(movements: string): State[] {
    const moves = movements.split("") as MovChar[]

    if (!moves.length) {
      return [this.state]
    }

    return moves.map(m => {
      if (m === "M") {
        this.moveForward()
      } else {
        this.changeDirection(m)
      }
      return {...this.state}
    })

  }

  private moveForward() {
    switch (this.state.direction) {
      case 'N':
        this.state.y += 1
        break;
      case 'S':
        this.state.y -= 1
        break;
      case 'E':
        this.state.x += 1
        break;
      case 'W':
        this.state.x -= 1
        break;
      default:
        break;
    }
  }

  private changeDirection(move: Exclude<MovChar, "M">) {
    switch (this.state.direction) {
      case 'N':
        if (move === "L") {
          this.state.direction = "W"
        } else if (move === "R") {
          this.state.direction = "E"
        }
        break;
      case 'S':
        if (move === "L") {
          this.state.direction = "E"
        } else if (move === "R") {
          this.state.direction = "W"
        }
        break;
      case 'E':
        if (move === "L") {
          this.state.direction = "N"
        } else if (move === "R") {
          this.state.direction = "S"
        }
        break;
      case 'W':
        if (move === "L") {
          this.state.direction = "S"
        } else if (move === "R") {
          this.state.direction = "N"
        }
        break;
      default:
        break;
    }
  }
}

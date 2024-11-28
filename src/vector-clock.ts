export type Clock = Map<string, number>

export class VectorClock {
  private readonly pid: string
  private clock: Clock = new Map()

  /*
   * @param pid: string - the process id for this clock
   * @param participants: string[] - the process ids for all participants in the system
   */
  constructor(pid: string, participants: string[]) {
    this.pid = pid
    this.clock.set(pid, 0)
    participants.forEach((participant) => {
      this.clock.set(participant, 0)
    })
  }

  /*
   * @returns the current clock
   */
  getClock = (): Clock => {
    return new Map(this.clock)
  }

  tick = () => {
    const currentTime = this.clock.get(this.pid) || 0
    this.clock.set(this.pid, currentTime + 1)
  }

  /*
   * Increments the clock and returns a deep copy of the current clock
   * @returns a deep copy of the current clock
   */
  send = () => {
    this.tick()

    return this.getClock()
  }

  /*
   * @param receivedClock: Clock - the clock received from another process
   */
  receive = (receivedClock: Clock) => {
    this.clock.forEach((value, pid) => {
      const receivedValue = receivedClock.get(pid) ?? 0
      this.clock.set(pid, Math.max(value, receivedValue))
    })
    this.tick()
  }

  /*
   * @param comparedClock: Clock - the clock to compare to
   * @returns -1 if this clock is less than the compared clock,
   *           1 if this clock is greater than the compared clock,
   *           0 if this clock is equal to the compared clock,
   *           and null if this clock is concurrent with the compared clock
   */
  compare = (comparedClock: Clock) => {
    let isLessThan = false
    let isGreaterThan = false

    const allNodes = new Set([...this.clock.keys(), ...comparedClock.keys()])

    for (const pid of allNodes) {
      const value = this.clock.get(pid) || 0
      const comparedValue = comparedClock.get(pid) || 0

      if (value < comparedValue) {
        isLessThan = true
      } else if (value > comparedValue) {
        isGreaterThan = true
      }
    }

    const isConcurrent = isLessThan && isGreaterThan
    if (isConcurrent) {
      return null
    }

    const isBehind = isLessThan && !isGreaterThan
    if (isBehind) {
      return -1
    }

    const isAhead = !isLessThan && isGreaterThan
    if (isAhead) {
      return 1
    }

    // This clock is equal to the compared clock
    return 0
  }
}

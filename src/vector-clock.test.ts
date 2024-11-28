import { describe, expect, it } from "vitest"
import { VectorClock } from "./vector-clock"

describe("VectorClock", () => {
  const processId: string = "1"

  it("initializes the clock.", () => {
    const clock = new VectorClock(processId, [])

    expect(clock.getClock()).toEqual(new Map([[processId, 0]]))
  })

  it("returns the value of the clock.", () => {
    const clock = new VectorClock(processId, [])

    expect(clock.getClock()).toEqual(new Map([[processId, 0]]))
  })

  it("increments the clock.", () => {
    const clock = new VectorClock(processId, [])

    clock.tick()

    expect(clock.getClock()).toEqual(new Map([[processId, 1]]))
  })

  it("sends the clock.", () => {
    const clock = new VectorClock(processId, [])

    expect(clock.send()).toEqual(new Map([[processId, 1]]))
  })

  it("receives the clock.", () => {
    const clock = new VectorClock(processId, [])
    const receivedClock = new Map([[processId, 1]])

    clock.receive(receivedClock)

    expect(clock.getClock()).toEqual(new Map([[processId, 2]]))
  })

  it("compares one clock ahead of another clock.", () => {
    const pid1 = "1"
    const pid2 = "2"
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid1, [pid2])

    clock1.tick()

    expect(clock1.compare(clock2.getClock())).toBe(1)
  })

  it("compares one clock behind another clock.", () => {
    const pid1 = "1"
    const pid2 = "2"
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid1, [pid2])

    clock2.tick()

    expect(clock1.compare(clock2.getClock())).toBe(-1)
  })

  it("compares two equal clocks.", () => {
    const pid1 = "1"
    const pid2 = "2"
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid1, [pid2])

    expect(clock1.compare(clock2.getClock())).toBe(0)
  })

  it("compares two concurrent clocks.", () => {
    const pid1 = "1"
    const pid2 = "2"
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid2, [pid2])

    clock1.tick()
    clock2.tick()

    expect(clock1.compare(clock2.getClock())).toBe(null)
  })
})

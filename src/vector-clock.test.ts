import { describe, expect, it } from "vitest"
import { VectorClock } from "./vector-clock"

describe("VectorClock", () => {
  const pid1 = "1"
  const pid2 = "2"

  it("initializes the clock.", () => {
    const clock = new VectorClock(pid1, [])

    expect(clock.getClock()).toEqual(new Map([[pid1, 0]]))
  })

  it("returns the value of the clock.", () => {
    const clock = new VectorClock(pid1, [])

    expect(clock.getClock()).toEqual(new Map([[pid1, 0]]))
  })

  it("increments the clock.", () => {
    const clock = new VectorClock(pid1, [])

    clock.tick()

    expect(clock.getClock()).toEqual(new Map([[pid1, 1]]))
  })

  it("sends the clock.", () => {
    const clock = new VectorClock(pid1, [])

    expect(clock.send()).toEqual(new Map([[pid1, 1]]))
  })

  it("receives the clock.", () => {
    const clock = new VectorClock(pid1, [])
    const receivedClock = new Map([[pid1, 1]])

    clock.receive(receivedClock)

    expect(clock.getClock()).toEqual(new Map([[pid1, 2]]))
  })

  it("compares one clock ahead of another clock.", () => {
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid1, [pid1])

    clock1.tick()

    expect(clock1.compare(clock2.getClock())).toBe(1)
  })

  it("compares one clock behind another clock.", () => {
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid1, [pid1])

    clock2.tick()

    expect(clock1.compare(clock2.getClock())).toBe(-1)
  })

  it("compares two equal clocks.", () => {
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid1, [pid1])

    expect(clock1.compare(clock2.getClock())).toBe(0)
  })

  it("compares two concurrent clocks.", () => {
    const clock1 = new VectorClock(pid1, [pid2])
    const clock2 = new VectorClock(pid2, [pid1])

    clock1.tick()
    clock2.tick()

    expect(clock1.compare(clock2.getClock())).toBe(null)
  })
})

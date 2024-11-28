# WTF
Local First software involves a hard set of problems that I failed to solve at Blackthorn. I need to understand the problem and how build solutions for it.

## The Problem
CRDTs are unintuitive and hard to get right. In order to better understand CRDTs, I need to understand time keeping in concurrency. Time keeping in distributed systems stretches my brain like thinking in callbacks or learning to write shaders. I need fundamentals and practice to build insight.

## The Solution
This repo is a playground for me to build distributed clocks and learn how this building block works. 

## Some Useful Links
- [Vector Clocks](https://sookocheff.com/post/time/vector-clocks/) by Kevin Sookocheff
  - The Vector Clock algorithm 
- [Local First Software](https://localfirstweb.dev/)
  - A bunch of resources on Local First software 

## Learnings
### There's a subtle difference between clocks being equal and clocks being concurrent.
Equal clocks have identical values. Concurrent clocks have different values, but the values are independent of each other (i.e. they are not causally related).

### Vector Clocks tick after receiving
One little subtlety in a Vector Clock happens on a clock's update. Updating a clock's state is an event that must be tracked on the clock. This is easily overlooked. I overlooked it when I was writing tests and spent a bit of time scratching my head wondering why the concurrency test I was writing wasn't working as expected. The implication seems to be that equality is a less probable state to get into after separate instances of vector clocks in a distributed system have started trading messages. I need to dig more to find when this case would show up beyond initialization.

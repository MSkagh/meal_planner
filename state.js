class State {
    currentlySelectedDay
    constructor(currentlySelectedDay) {
        this.currentlySelectedDay = currentlySelectedDay
    }
    getCurrentlySelectedDay() { return this.currentlySelectedDay }
    setCurrentlySelectedDay(day) { this.currentlySelectedDay = day }
}

const state = new State("monday")

export default state
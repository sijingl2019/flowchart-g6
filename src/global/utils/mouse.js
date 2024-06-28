export default {
    leftMouseDown : false,
    down() {
        console.log('down')
        this.leftMouseDown = true
    },

    up() {
        console.log('up')
        this.leftMouseDown = false
    },

    isLeftDown() {
        return this.leftMouseDown
    }
}

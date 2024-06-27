/**
 * Created by OXOYO on 2019/5/18.
 *
 * 全局BUS
 */

import mitt from 'mitt'

const bus = new mitt()

export default {
    $emit: (event, ...args) => {
        bus.emit(event, ...args)
    },
    $on: (event, fn) => {
        bus.on(event, fn)
    },
    $off: (event, fn) => {
        bus.off(event, fn)
    }
}

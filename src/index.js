import store from './store'
import component from './index.vue'
import preview from './preview.png'

export default {
  component,
  store,
  options: {
    name: '经典',
    code: 'classics',
    preview,
    themes: [
      {
        name: 'blue-dark',
        color: '#335285'
      },
      {
        name: 'default',
        color: '#03a9f4'
      }
    ]
  }
}

import DefaultTheme from 'vitepress/theme'
import HomeHero from '../../components/HomeHero.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
  }
}

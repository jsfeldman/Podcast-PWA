import { templateWrapper } from '../utils.mjs'
import searchBoxHtml from '../templates/searchBox.mjs'

export default () => `
  ${templateWrapper(searchBoxHtml, 'search-box-template')}
`
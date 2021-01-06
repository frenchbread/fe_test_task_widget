console.log('- demo.js loaded')

jQuery.load_script = url => new Promise((resolve, reject) => {
  jQuery.ajax({
    url,
    dataType: 'script',
    success: resolve,
    error: reject,
    async: true
  })
})

const Lib = function (config) {
  this.config = config || {}

  this.start = async () => {
    console.log('- widget attached')

    console.log(this)

    await this.load_reactjs()

    console.log('- react & react dom loaded')

    ReactDOM.render(
      React.createElement(this.get_app_component()),
      document.getElementById('react_container')
    )
  }

  this.load_reactjs = () => {
    const react_container = document.createElement('div')
    const placeholder_elem = document.querySelector(this.config.placeholder)

    react_container.setAttribute('id', 'react_container')
    placeholder_elem.appendChild(react_container)

    const react = 'https://unpkg.com/react@17/umd/react.development.js'
    const react_dom = 'https://unpkg.com/react-dom@17/umd/react-dom.development.js'

    const loaders = [$.load_script(react), $.load_script(react_dom)]

    return Promise.all(loaders)
  }

  this.get_app_component = () => {
    return class App extends React.Component {
      constructor (props) {
        super(props)
      }

      render () {
        return React.createElement(
          'div',
          {},
          'placeholder'
        )
      }
    }
  }
}

Widget = config => new Lib(config)

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

    await this.load_reactjs()

    console.log('- react & react dom loaded')

    ReactDOM.render(
      React.createElement(this.get_app_component()),
      document.getElementById('react_container')
    )
  }

  this.load_reactjs = async () => {
    const react_container = document.createElement('div')
    const placeholder_elem = document.querySelector(this.config.placeholder)

    react_container.setAttribute('id', 'react_container')
    placeholder_elem.appendChild(react_container)

    const react = 'https://unpkg.com/react@17/umd/react.development.js'
    const react_dom = 'https://unpkg.com/react-dom@17/umd/react-dom.development.js'

    await $.load_script(react)
    await $.load_script(react_dom)

    return
  }

  this.get_app_component = () => {
    const instance = this

    return class App extends React.Component {
      constructor (props) {
        super(props)
      }

      render () {
        return React.createElement(
          'div',
          {
            style: {
              marginTop: '1rem'
            }
          },
          [
            React.createElement(
              instance.get_button_component(),
              {
                handleClick: () => {},
                displayText: instance.config.placeholder_text
              }
            )
          ]
        )
      }
    }
  }

  this.get_button_component = () => {
    return class Button extends React.Component {
      constructor (props) {
        super(props)
      }

      render () {
        return React.createElement(
          'button',
          {
            key: 'btn',
            onClick: () => this.props.handleClick()
          },
          this.props.displayText
        )
      }
    }
  }
}

Widget = config => new Lib(config)

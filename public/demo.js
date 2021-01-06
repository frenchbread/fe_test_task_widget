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

        this.state = { modalIsShowing: false }
      }

      toggleModal () {
        this.setState({ modalIsShowing: !this.state.modalIsShowing })
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
                handleClick: this.toggleModal.bind(this),
                displayText: instance.config.placeholder_text
              }
            ),
            React.createElement(
              instance.get_modal_component(),
              {
                toggleModal: this.toggleModal.bind(this),
                modalIsShowing: this.state.modalIsShowing
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
            onClick: () => this.props.handleClick()
          },
          this.props.displayText
        )
      }
    }
  }

  this.get_modal_component = () => {
    const instance = this

    return class Modal extends React.Component {
      render () {
        if (this.props.modalIsShowing) {
          return React.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                zIndex: 100,
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            },
            React.createElement(
              instance.get_modal_contents(),
              {
                toggleModal: this.props.toggleModal
              }
            )
          )
        } else {
          return ''
        }
      }
    }
  }

  this.get_modal_contents = () => {
    const instance = this

    return class ModalContents extends React.Component {
      constructor (props) {
        super(props)

        this.state = { contentIsLoaded: true, isInitialPage: true }
      }

      render () {
        if (this.state.isInitialPage) {
          const active_img = document.querySelector('img.active')

          return React.createElement(
            'div',
            {
              style: {
                padding: '1rem',
                backgroundColor: '#fff',
                color: '#777'
              }
            },
            [
              React.createElement(
                'div',
                {
                  style: {
                    height: '30rem',
                    width: '30rem',
                    backgroundImage: `url('${active_img.src}')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }
                }
              ),
              React.createElement(
                'div',
                {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between'
                  }
                },
                [
                  React.createElement(
                    instance.get_button_component(),
                    {
                      displayText: 'close',
                      handleClick: () => this.props.toggleModal()
                    }
                  ),
                  React.createElement(
                    instance.get_button_component(),
                    {
                      displayText: 'Surprise me!',
                      handleClick: () => {}
                    }
                  )
                ]
              )
            ]
          )
        }
      }
    }
  }

}

Widget = config => new Lib(config)

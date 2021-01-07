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

    this.load_reactjs()
      .then(() => {
        console.log('- react & react dom loaded')

        ReactDOM.render(
          React.createElement(this.get_app_component()),
          document.getElementById('react_container')
        )
      })
      .catch(err => console.error('- failed to load reactjs scripts'))
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

        this.state = { chosenAttr: '', stage: 0 }
      }

      doSurprise () {
        this.setState({ ...this.state, stage: 1 })

        setTimeout(() => {
          this.setState({ ...this.state, stage: 2, chosenAttr: instance.get_random_attribute() })

          console.log(this.state)
        }, 2500)
      }

      selectAttribute () {
        document.querySelector(`input#${this.state.chosenAttr}`).checked = true
        document.querySelector('.active').classList.remove('active')
        document.querySelector(`.left-column img[data-image=${this.state.chosenAttr}]`).classList.add('active')

        this.setState({ chosenAttr: '', stage: 0 })

        this.props.toggleModal()
      }

      render () {
        if (this.state.stage === 0) {
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
                      handleClick: () => this.doSurprise()
                    }
                  )
                ]
              )
            ]
          )
        } else if (this.state.stage === 1) {
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
                    backgroundImage: `url('http://localhost:3355/animation.gif')`,
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
                    justifyContent: 'center',
                    paddingTop: '1rem',
                    fontSize: '1.2rem'
                  }
                },
                'hold on, surprising you can take a moment...'
              )
            ]
          )
        } else if (this.state.stage === 2) {
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
                    width: '10rem',
                    textAlign: 'center'
                  }
                },
                React.createElement(
                  'div',
                  {
                    style: {
                      display: 'inline-block',
                      height: '5rem',
                      width: '5rem',
                      backgroundColor: this.state.chosenAttr,
                      border: '3px solid #fff',
                      borderRadius: '50%',
                      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.33)'
                    }
                  }
                )
              ),
              React.createElement(
                'div',
                {
                  style: {
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    color: '#777',
                    paddingTop: '1rem'
                  }
                },
                this.state.chosenAttr
              ),
              React.createElement(
                'div',
                {
                  style: {
                    textAlign: 'center',
                    paddingTop: '1rem'
                  }
                },
                React.createElement(
                  instance.get_button_component(),
                  {
                    handleClick: () => this.selectAttribute(),
                    displayText: 'Select me!'
                  }
                )
              )
            ]
          )
        }
      }
    }
  }

  this.get_random_attribute = () => {
    const attributes = this.config.attributes

    const random_index = Math.round(Math.random() * attributes.length - 1)

    console.log(random_index, attributes[random_index])

    return attributes[random_index]
  }

}

Widget = config => new Lib(config)

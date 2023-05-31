import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {list: [], isTrue: false}

  componentDidMount() {
    this.getThePics()
  }

  getThePics = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    const datapack = data.packages
    const update = datapack.map(each => ({
      name: each.name,
      id: each.id,
      imageUrl: each.image_url,
      description: each.description,
    }))
    this.setState({list: update, isTrue: true})
  }

  renderResult = () => {
    const {list} = this.state
    return (
      <ul>
        {list.map(each => (
          <li key={each.id}>
            <img src={each.imageUrl} alt={each.name} />
            <h1 className="name">{each.name}</h1>
            <p className="description">{each.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    const {isTrue} = this.state
    return (
      <div data-testid="loader" className="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  render() {
    const {isTrue} = this.state
    return (
      <div className="container">
        <h1 className="head">Travel Guide</h1>
        {isTrue ? this.renderResult() : this.renderLoader()}
      </div>
    )
  }
}
export default App

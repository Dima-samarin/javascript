import React from 'react'
import axios from 'axios'


import './App.css'
import logo from './logo.png'

function App() {
  const [img, setImg] = React.useState(null)
  const [avatar, setAvatar] = React.useState(null)

  const sendFile = React.useCallback(async () => {
    try {
      const data = new FormData()
      data.append('avatar', img)

      await axios.post('/api/upload', data, {
        headers: {
          'content-type': 'mulpipart/form-data'
        }
      })

      .then(res => setAvatar(res.data.path))
    } catch (error) {}
  }, [img])

  return (
    <div className="App">
      <div className="avatar">
          {
            avatar
              ? <img className="logo" src={`${avatar}`} alt="avatar" />
              : <img className="logo" src={`${logo}`} alt="avatar" />
          }
      </div>
        <input type="file" onChange={e => setImg(e.target.files[0])}  />
        <button className="btn" onClick={sendFile}>Изменить аватар</button>
    </div>
  )
}

export default App

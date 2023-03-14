import './App.css'
import { useState } from 'react';

function App() {
  const JobShip_Logo = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"

  return (
    <div className="App">
      <header>
        <img src = {JobShip_Logo}/>
      </header>
      <main>
        <div className='Signup_Step_Wrapper'>
          <div>hello world</div>
        </div>
        <div className='Profile_Input_Wrapper'>
          <div>hello world</div>
        </div>
        <div className='Button_Nextstep_Wrapper'>
          <button className='Button_Nextstep'>次へ</button>
        </div>
      </main>
      <footer>
        © 2023 Hakuchumu, Inc. 
      </footer>
    </div>
  )
}

export default App

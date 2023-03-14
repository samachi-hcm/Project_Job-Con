import './App.css'
import { useState } from 'react';
const JobShip_Logo = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"


function App() {
  
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
          <input type="text" value="" placeholder="姓"></input>
          <input type="text" value="" placeholder="名"></input>
          <input type="text" value="" placeholder="Family name"></input>
          <input type="text" value="" placeholder="first name"></input>
          <input type="email" value="" placeholder="Gmail(任意)"></input>
          <input type="url" value="" placeholder="Twitter URL(任意)"></input>
          <input type="url" value="" placeholder="Facebook URL(任意)"></input>
          <input type="url" value="" placeholder="Instagram URL(任意)"></input>
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

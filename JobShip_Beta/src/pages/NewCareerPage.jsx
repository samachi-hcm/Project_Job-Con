import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import CareerInput from '../components/CareerInput'
import Button from '../components/Button'
import AddButton from '../components/AddButton'
import DeleteButton from '../components/DeleteButton'
//linked page

//styles
import './css/NewCarrerPage.css'



const NewCareerPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const deleteCareerInput = (input) => {
    const newCareerInputs = careerInputs.slice();
    const index = newCareerInputs.indexOf(input);
    newCareerInputs[index].flag = true;
    setCareerInputs(newCareerInputs);
  }

  const careerInput = {
    body: (<div className='CareerField'>
      <CareerInput />
      <DeleteButton onClick={deleteCareerInput}/>
    </div>),
    flag:false
  }

  const [careerInputs, setCareerInputs] = useState([])
  
  const display = careerInputs.map((careerInput) => {
    if (careerInput.flag) {
      return null; 
    }
    return (
      <div className='CareerField'>
        <CareerInput />
        <DeleteButton onClick={() => deleteCareerInput(careerInput)} />
      </div>
    );
  });

  const addCareerInputs = () => {
    const newCareerInputs = [...careerInputs,careerInput]
    setCareerInputs(newCareerInputs)
  }

  return (
    <div className='NewCareerPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        <form>
          {display}
        <AddButton onClick={addCareerInputs}/>
        <Button buttonRabel="次へ" />
        </form>
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewCareerPage
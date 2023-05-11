import React, { useState,useEffect,useRef } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc,getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';

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

  const [user, loading] = useAuthState(auth)

  const [userData, setUserData] = useState({})

  const [count, setCount] = useState(-1)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [savedCareerData, setSavedCareerData] = useState()

  const userDataRef = useRef({});

useEffect(() => {
  if (user) {
    const { photoURL, displayName } = auth.currentUser;
    userDataRef.current = { ...userDataRef.current, photoURL, displayName };
  }
}, [user]);

useEffect(() => {
  const fetchData = async () => {
    if (user) {
      const docRef = doc(db, userDataRef.current.displayName, 'Data');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const saveShot = docSnap.data().careerData;
        setSavedCareerData(saveShot)
      }
    }
  };

  fetchData();
}, [user]);

useEffect(() => {
  if (savedCareerData) {
    const newCareerInputs = savedCareerData.map((_, index) =>
      createCareerInput(index)
    );
    setCareerInputs(newCareerInputs);
    setCount(savedCareerData.length - 1);
  }
}, [savedCareerData]);





const onSubmit = async (data) => {
  const careerData = data.year.map((year, index) => ({
    year: year,
    month: data.month[index],
    career: data.career[index],
  }));

  userDataRef.current = { ...userDataRef.current, careerData }
  await setDoc(doc(db, userDataRef.current.displayName, "Data"), {
    careerData,
  });
};

  

  const deleteCareerInput = (input) => {
    const newCareerInputs = careerInputs.map((item) =>
      item.id === input.id ? { ...item, flag: true } : item
    );
    setCareerInputs(newCareerInputs);
  };

  const createCareerInput = (currentCount) => {
    const id = uuidv4();
    const careerInput = {
      id: id,
      index: currentCount,
      body: (
        <div className="CareerField" key={id}>
          <CareerInput
            year={register(`year[${currentCount}]`)}
            month={register(`month[${currentCount}]`)}
            career={register(`career[${currentCount}]`)}
          />
          <DeleteButton onClick={() => deleteCareerInput({ id })} />
        </div>
      ),
      flag: false,
    };
    return careerInput;
  };
  

  const [careerInputs, setCareerInputs] = useState([])
  
  const display = careerInputs.map((careerInput) => {
    if (careerInput.flag) {
      return null;
    }
    return (
      <div className="CareerField" key={careerInput.id}>
        <CareerInput
          savedCareer={savedCareerData?.[careerInput.index]}
          year={register(`year[${careerInput.index}]`)}
          month={register(`month[${careerInput.index}]`)}
          career={register(`career[${careerInput.index}]`)}
        />
        <DeleteButton onClick={() => deleteCareerInput(careerInput)} />
      </div>
    );
  });
  
  const addCareerInputs = () => {
    const newCount = count + 1;
    const newCareerInput = createCareerInput(newCount);
    const newCareerInputs = [...careerInputs, newCareerInput];
    setCareerInputs(newCareerInputs);
    setCount(newCount);
  };

  return (
    <div className='NewCareerPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
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
import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';

// components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import RecordForm from '../components/RecordForm'
import RedirectButton from '../components/RedirectButton';
import AddButton from '../components/AddButton'
import DeleteButton from '../components/DeleteButton'

// styles
import './css/RecordForms.css'

const RecordForms = () => {
  const [user, loading] = useAuthState(auth)

  const [count, setCount] = useState(-1)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [savedRecordData, setSavedRecordData] = useState()

  const userDataRef = useRef({});

  useEffect(() => {
    if (user) {
      const { photoURL, displayName,email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName,email };
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db,"UserData", userDataRef.current.email, 'Data',"recordData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const saveShot = docSnap.data().recordData;
          setSavedRecordData(saveShot)
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (savedRecordData) {
      const newRecordInputs = savedRecordData.map((_, index) =>
        createRecordInput(index)
      );
      setRecordInputs(newRecordInputs);
      setCount(savedRecordData.length - 1);
    }
  }, [savedRecordData]);

  const onSubmit = async (data) => {
    const recordData = data.year.map((year, index) => ({
      year: year,
      month: data.month[index],
      record: data.record[index],
    }));
    
    userDataRef.current = { ...userDataRef.current, recordData }
    await setDoc(doc(db, "UserData",userDataRef.current.email, "Data","recordData"), {
      recordData,
    });
  };

  const deleteRecordInput = (input) => {
    const newRecordInputs = recordInputs.map((item) =>
      item.id === input.id ? { ...item, flag: true } : item
    );
    setRecordInputs(newRecordInputs);
  };

  const createRecordInput = (currentCount) => {
    const id = uuidv4();
    const recordInput = {
      id: id,
      index: currentCount,
      body: (
        <div className="RecordField" key={id}>
          <RecordForm
            year={register(`year[${currentCount}]`)}
            month={register(`month[${currentCount}]`)}
            record={register(`record[${currentCount}]`)}
          />
          <DeleteButton onClick={() => deleteRecordInput({ id })} />
        </div>
      ),
      flag: false,
    };
    return recordInput;
  };


  const [recordInputs, setRecordInputs] = useState([])

  const display = recordInputs.map((recordInput) => {
    if (recordInput.flag) {
      return null;
    }
    return (
      <div className="RecordField" key={recordInput.id}>
        <RecordForm
          savedRecord={savedRecordData?.[recordInput.index]}
          year={register(`year[${recordInput.index}]`)}
          month={register(`month[${recordInput.index}]`)}
          record={register(`record[${recordInput.index}]`)}
        />
        <DeleteButton onClick={() => deleteRecordInput(recordInput)} />
      </div>
    );
  });

  const addRecordInputs = () => {
    const newCount = count + 1;
    const newRecordInput = createRecordInput(newCount);
    const newRecordInputs = [...recordInputs, newRecordInput];
    setRecordInputs(newRecordInputs);
    setCount(newCount);
  };

  return (
    <div className='Forms'>
      <div className='MainWrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {display}
          <AddButton onClick={addRecordInputs} />
          <RedirectButton buttonRabel="次へ" />
        </form>
      </div>
    </div>
  )
}

export default RecordForms

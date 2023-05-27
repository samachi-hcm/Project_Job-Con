import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Stepper = ({ nowStep }) => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setStep(nowStep);
    }, [nowStep]);

    const handleOnClick = (stepNumber) => {
        // Update the current step
        setStep(stepNumber);
        
        // Navigate to the specific page based on the step number
        switch(stepNumber) {
            case 1:
                navigate('/NewProfilePage');
                break;
            case 2:
                navigate('/NewCareerPage');
                break;
            case 3:
                navigate('/NewPortfolioPage');
                break;
            default:
                break;
        }
    }

    return (
      <Nav variant="pills" activeKey={step} className="justify-content-center">
          <Nav.Item>
              <Nav.Link 
                eventKey={1} 
                onClick={() => handleOnClick(1)}
                style={{backgroundColor: step === 1 ? "#7233B4" : "", color: step === 1 ? "#fff" : "#000"}}
              >
                プロフィール
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link 
                eventKey={2} 
                onClick={() => handleOnClick(2)}
                style={{backgroundColor: step === 2 ? "#7233B4" : "", color: step === 2 ? "#fff" : "#000"}}
              >
                経歴
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link 
                eventKey={3} 
                onClick={() => handleOnClick(3)}
                style={{backgroundColor: step === 3 ? "#7233B4" : "", color: step === 3 ? "#fff" : "#000"}}
              >
                レコード
              </Nav.Link>
          </Nav.Item>
      </Nav>
  );
  
};

export default Stepper;

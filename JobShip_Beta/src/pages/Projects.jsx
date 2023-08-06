import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Project from './Project';
import RedirectButton from '../components/RedirectButton';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'ProjectData'));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (id) => {
    navigate(`/Project/${id}`);
  };

  return (
    <div className='Project' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header />
      </div>
      <Container fluid style={{ marginTop: '30px', flexGrow: 1 }}>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
            {projects.map((project) => (
              <Card key={project.id} style={{ marginBottom: '10px' }} onClick={() => handleProjectClick(project.id)}>
                <Card.Body>
                  <Project receivedId={project.id} onPage={true}/>
                  <RedirectButton onClick={() => handleProjectClick(project.id)} buttonRabel={"プロジェクトを確認する"} />
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <div className='FooterWrapper' style={{ marginTop: '100px' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Projects;

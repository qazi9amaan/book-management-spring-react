import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
import { MHidden } from '../components/@material-extend';
import AdminRegisterForm from '../components/admin/register';
import { updateAdmin, getAdmin } from '../service/AdminService';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: theme.spacing(12, 0)
}));

export default function AdminUpdate() {
  const { id } = useParams();

  const [inititalState, setinititalState] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    getAdmin(id).then((res) => {
      setinititalState({
        username: res.data.username,
        password: res.data.password
      });
    });
  }, []);

  const onSubmit = (values) => {
    console.log(values);
    updateAdmin(id, values).then((res) => {
      window.history.back();
    });
  };

  return (
    <Container>
      <ContentStyle>
        <AdminRegisterForm inititalState={inititalState} onSubmit={onSubmit} />
      </ContentStyle>
    </Container>
  );
}

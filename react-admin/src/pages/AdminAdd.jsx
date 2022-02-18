import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import AdminRegisterForm from '../components/admin/register';

import { createAdmin } from '../service/AdminService';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

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

// ----------------------------------------------------------------------

export default function AdminAdd() {
  const inititalState = {
    username: '',
    password: ''
  };

  const onSubmit = (values) => {
    console.log(values);
    createAdmin(values).then((res) => {
      window.history.back();
    });
  };

  return (
    <RootStyle title="Add admin ">
      <Container>
        <ContentStyle>
          <AdminRegisterForm inititalState={inititalState} onSubmit={onSubmit} />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

"use client";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button/Button';
import AddIcon from '@mui/icons-material/Add';
import {CategoryDto} from "@/types/category/category-types";
import Grid from "@mui/material/Grid/Grid";
import Category from "@/components/category/category";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/global-store";
import {getCategories, getSharedCategories} from "@/services/category-service";
import Loading from "@/components/loading/loading";
import {Pagination} from "@mui/material";
import Paper from "@mui/material/Paper/Paper";

export default function MyCategories() {
  const [sharedCategories, setSharedCategories] = useState<CategoryDto[] | null>(null);
  const [myCategories, setMyCategories] = useState<CategoryDto[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [sharedCategoriesPage, setSharedCategoriesPage] = useState<number>(0);
  const [size] = useState<number>(10);

  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    getCategories(page, size)
    .then((categories) => {
      setMyCategories(categories);
    });
  }, [page, size]);

  useEffect(() => {
    getSharedCategories(sharedCategoriesPage, size)
    .then((categories) => {
      setSharedCategories(categories);
    });
  }, [sharedCategoriesPage, size]);

  if (!isAuthenticated) {
    router.push('/auth/login');
    return (<Typography variant={'h5'}>Redirecting...</Typography>);
  }

  const displayMyCategories = () => {
    if (!myCategories) {
      return (<Loading title={'Loading categories...'}/>);
    } else if (myCategories.length !== 0 || page !== 0) {
      return (
          <>
            <Grid container spacing={2}>
              {myCategories.map((category) => (
                  <Grid key={category.id} item xs={12} sm={6} md={4}>
                    <Category category={category}/>
                  </Grid>
              ))}
            </Grid>
            <Box flex={'1'} component={'div'} display={'flex'}
                 justifyContent={'center'} alignItems={'end'} mt={12}>
              <Pagination count={10} onChange={(e, value) => setPage(value - 1)} color="primary"/>
            </Box>
          </>
      );
    } else {
      return (
          <Paper sx={{p: 2, textAlign: 'center', width: 'fit-content'}}>
            <Typography variant={'h6'} fontStyle={'italic'} color={'grey'}>
              You don't have any own categories yet.
            </Typography>
          </Paper>
      );
    }
  };

  const displaySharedCategories = () => {
    if (!sharedCategories) {
      return (<Loading title={'Loading shared categories...'}/>);
    } else if(sharedCategories.length !== 0 || sharedCategoriesPage !== 0) {
      return (
          <>
            <Grid container spacing={2}>
              {sharedCategories.map((category) => (
                  <Grid key={category.id} item xs={12} sm={6} md={4}>
                    <Category category={category}/>
                  </Grid>
              ))}
            </Grid>
            <Box flex={'1'} component={'div'} display={'flex'}
                 justifyContent={'center'} alignItems={'end'} mt={12}>
              <Pagination count={10} onChange={(e, value) => setSharedCategoriesPage(value - 1)} color="primary"/>
            </Box>
          </>
      );
    } else {
      return (
          <Paper sx={{p: 2, textAlign: 'center', width: 'fit-content'}}>
            <Typography variant={'h6'} fontStyle={'italic'} color={'grey'}>
              You don't have any shared categories yet.
            </Typography>
          </Paper>
      );
    }
  };

  return (
      <Container component='main' maxWidth="lg">
        <Box component={'div'} display={'flex'} justifyContent={'space-between'}
             alignItems={'center'} mb={1}>
          <Typography variant="h4" color="primary" gutterBottom mt={3}
                      sx={{textDecoration: 'underline'}}>
            My categories
          </Typography>
          <Link href={'/categories/create'}>
            <Button startIcon={<AddIcon/>} variant={'outlined'}>
              Add category
            </Button>
          </Link>
        </Box>
        {displayMyCategories()}
        <Typography variant="h4" color="primary" gutterBottom
                    sx={{textDecoration: 'underline'}} my={3}>
          Shared
        </Typography>
        {displaySharedCategories()}
      </Container>
  )
}

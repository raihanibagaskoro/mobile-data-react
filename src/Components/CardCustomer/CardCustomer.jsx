import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { FetchPaketList, FetchTransaction, FetchUser } from '../../Redux/Action';
import { connect, useSelector } from 'react-redux';

const CardCustomer = (props) => {
    const paperStyle = {padding: 20, height: '45vh', width: 1000, margin: '20px auto'}
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      const userId = localStorage.getItem("id")
    // const dataTrans = useSelector(state => state)
    // console.log(dataTrans);
    // const filteredPaketList = props.paket.paketlist.filter(item => item.userId === userId);
    // console.log(filteredPaketList);
      useEffect(() => {
        props.loaduser()
        props.loadpaket()
        props.loadtrans()
        // console.log(props);
      }, [])
      
  return (
    <Grid>
        <Paper elevation={5} style={paperStyle}>
            <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
                <Avatar></Avatar>
                <Typography>{props.user.userlist.firstName} {props.user.userlist.lastName}</Typography>
                
            </Grid>
            <Typography>Transaction History</Typography>
            <Stack spacing={2}>
                {props.trans.translist ? (
                    props.trans.translist.map((item) => (
                        <Item key={item.id}>{item.name}</Item>

                    ))
                ) : (
                    <Typography>Loading ...</Typography>
                )}
            </Stack>
        </Paper>
    </Grid>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        paket: state.paket,
        trans: state.trans
    }
}

// const mapStateTrans = (state) => {
//     return {
//         trans: state.trans
//     }
// }

// const mapDispatchTrans = (dispatch) => {
//     const userId = parseInt(localStorage.getItem('id'), 10);
//     return {
//         loadtrans: () => dispatch(FetchTransaction(userId))
//     }
// }

const mapDispatchToProps = (dispatch) => {
    const userId = parseInt(localStorage.getItem('id'), 10); // Convert to integer
    // console.log(typeof(userId));
    return {
        loaduser: () => dispatch(FetchUser(userId)),
        loadpaket: () => dispatch(FetchPaketList()),
        loadtrans: () => dispatch(FetchTransaction(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardCustomer)
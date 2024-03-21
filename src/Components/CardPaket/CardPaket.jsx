import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoIcon from "@mui/icons-material/Info";
import { FetchPaketList, FunctionAddTransaction } from "../../Redux/Action";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CardPaket = (props) => {
  useEffect(() => {
    props.loadpaket();
  }, []);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userId = localStorage.getItem("id")
  const handleBuy = (itemId) => {
    const transobj = {userId, itemId}
    dispatch(FunctionAddTransaction(transobj))
    navigate('/customer')
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5} style={{ marginTop: "20px" }} direction="row">
        {props.paket.paketlist ? (
          props.paket.paketlist.map((item) => (
            <Grid item xs={12} sm={3} ms={4} key={item.id}>
              <Card
                sx={{ maxWidth: 345 }}
                style={{ padding: "10px", marginBottom: "30px" }}
              >
                <CardMedia height="140" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
                <Typography variant="h6" gutterBottom>
                  Benefits
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <MoreTimeIcon sx={{ color: "#ed2324" }} fontSize="medium" />
                  <Typography
                    fontSize="small"
                    color="text.primary"
                    marginLeft={1}
                  >
                    Validity {item.validity} days
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <SignalCellularAltIcon
                    sx={{ color: "#ed2324" }}
                    fontSize="medium"
                  />
                  <Typography
                    fontSize="small"
                    color="text.primary"
                    marginLeft={1}
                  >
                    Main Quota {item.quota} GB
                  </Typography>
                </Box>
                <br></br>
                <Typography
                variant="h6"
                  gutterBottom
                >
                  Price
                </Typography>
                <Typography variant="h5" color="#ed1c24" gutterBottom>
                  Rp. {item.price} / {item.validity} Days
                </Typography>
                <CardActions>
                  <Button color="error" variant="contained" size="medium" onClick={() => handleBuy(item.id)}>
                    Beli Paket
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    paket: state.paket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadpaket: () => dispatch(FetchPaketList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPaket);

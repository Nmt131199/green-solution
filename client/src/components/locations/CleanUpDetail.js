import React from 'react';
import { connect } from "react-redux";
import { deleteLocation, getAllLocations, getLocation, updateLocation } from "../../redux/actions/LocationActions";
import NavBar from "../navigation/NavBar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
//import JoinCleanUpForm from "./forms/JoinCleanSiteForm";
import Grid from "@material-ui/core/Grid"
import placeholderImage from "../../assets/imgs/home_page_img.jpg";
import Button from "@material-ui/core/Button"
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined'
import {CleanUpDetailMap} from "./maps/CleanUpDetailMap"

const styles = {
    joinButton: {
        textAlign: "center"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
        backgroundColor: "#F6EDD9",
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 35,
    },
    helpTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 14,
    },
    cardTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 25,
        textAlign: "center",

    },
    cardText: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 18,

    },
    grid: {
        backgroundColor: "#ccffcc",
        padding: "20px",
        marginTop: "20px",
        height: "400px",
    },
    image: {
        borderRadius: '50%',
        height: "250px",
        width: "250px",
        borderColor: "white",
        borderWidth: "3px",
        borderStyle: "solid"
    },
    locationGrid: {
        position: "relative",

    },
    gridCenter: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        position: "absolute"
    },
    mapCenter:{
        left: "50%",
        transform: "translateX(-50%)",
        position: "absolute"
    },
    card: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
        padding: "20px",
        minWidth: "300px",
    },
    icon: {
        display: "inline",
        verticalAlign: "middle"
    },
    joinButton: {
        width: "100%",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
        marginTop: "20px"
    },
    mapContainer: {
        marginTop:"20px",
        width: "500px",
        height: "400px",

        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
    },
    mapGrid: {
        position: "relative",
        width:"100%",
        textAlign:"center"
    },
};

class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                name: 'RMIT Clean Up',
                description: 'Dọn trường',
                address: '702 Nguyễn Văn Linh Q7 TPHCM',
                startDate: '2019-12-24',
                startTime: '00:00',
                endDate: '2019-12-24',
                endTime: '02:00',
                agenda: "23:45: Meet up\n 00:00 - 01:30: Clean\n 01:30 - 02:00: Classify trash etc.",
                lat:10.763963,
                lng:106.68189970000003

            }
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.location !== state.location) {
    //         return {
    //             location: props.location
    //         }
    //     }
    //     return null;
    // }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavBar />
                <Grid container spacing={2} className={classes.grid}>
                    <Grid item sm={2} />
                    <Grid item sm={2} className={classes.locationGrid}>
                        <div className={classes.gridCenter}>

                            <img src={placeholderImage} alt="Location's image" className={classes.image} />

                        </div>
                    </Grid>
                    <Grid item sm={3} className={classes.locationGrid}>
                        <div className={classes.gridCenter}>
                            <Typography gutterBottom variant="h4" component="h2" className={classes.title}>
                                {this.state.location.name}
                            </Typography>
                            <Typography variant="body2" component="p" className={classes.helperText}>
                                {this.state.location.description}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item sm={1} />
                    <Grid item sm={2} className={classes.locationGrid}>
                        <div className={classes.gridCenter}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom component="h3" className={classes.cardTitle}>Thông tin</Typography>
                                    <Typography gutterBottom variant="body2" component="p" className={classes.cardText}>
                                        <LocationOnOutlinedIcon className={classes.icon} />
                                        {`     ${this.state.location.address}`}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" component="p" className={classes.cardText}>

                                        <AccessTimeOutlinedIcon className={classes.icon} />
                                        {`     ${this.state.location.startTime} ${this.state.location.startDate} - ${this.state.location.endTime} ${this.state.location.endDate}`}
                                    </Typography>

                                    <Button className={classes.joinButton}>Tham gia</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid item sm={2} />

                </Grid>

                <Grid container spacing={2} style={{padding:"20px",marginTop:"20px",minHeight:"500px"}}>
                    <Grid item xs={6} style={{width:"100%",textAlign:"center"}}>
                        <div>
                            <Typography gutterBotton variant="h4" component="h2" className={classes.title}>Kế Hoạch Sự Kiện</Typography>
                            <Typography gutterBottom variant="body2" paragraph className={classes.cardText}>
                                {this.state.location.agenda}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.mapGrid}>
                        <div className={classes.mapCenter}>
                            <Typography gutterBotton variant="h4" component="h2" className={classes.title}>Bản đồ</Typography>    
                            <div className={classes.mapContainer}>
                                <CleanUpDetailMap coord={{lat:this.state.location.lat,lng:this.state.location.lng}} />
                        
                            </div>
                        </div>
                    </Grid>
                </Grid>
                
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    location: state.locationsData.location
});

const mapDispatchToProps = {
    getLocation,
    updateLocation,
    getAllLocations,
    deleteLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CleanUpDetail));

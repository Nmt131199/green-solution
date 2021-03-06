import React from 'react';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {CleanUpDetailMap} from "./maps/CleanUpDetailMap";
import jwtDecode from "jwt-decode";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import Divider from "@material-ui/core/Divider";
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import withStyles from "@material-ui/core/styles/withStyles";
import NavBar from "../navigation/NavBar";
import placeholderImage from "../../assets/imgs/home_page_img.jpg";
import myImage from "../../assets/imgs/aboutus.jpg";
import img2 from "../../assets/imgs/img2.jpg";
import img1 from "../../assets/imgs/img1.jpg";
import ImageGridList from "../locations/clean_site_detail/ImageGridList";
import UserGridList from "../locations/clean_site_detail/UserGridList";
import UpdatePhotos from "../locations/clean_site_detail/UpdatePhotos";
import JoinCleanUpForm from "./join_clean_site/JoinCleanUpForm";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
//import {openUpdateSiteForm} from "../../redux/actions/FormActions";
import EventResultForm from "../profiles/EventResultForm";
import {getUser} from "../../redux/actions/UserActions";
import {deleteLocation, getAllLocations, getLocation, updateLocation} from "../../redux/actions/LocationActions";
import UpdateCleanSiteForm from "./update_clean_site/UpdateCleanSiteForm";
import DeleteCleanSiteDialog from "./delete_clean_site/DeleteCleanSiteDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import SendEmailForm from "./forms/SendEmailForm"

const styles = {
    title: {
        fontFamily: "'Oswald', sans-serif;",
    },
    text: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    margin: {
        marginTop: 10
    },
    gridContent: {
        height: "auto",
        margin: "5px 0"
    },
    gridHeader: {
        padding: "20px",
        marginTop: "10px",
        height: "auto",
    },
    image: {
        borderRadius: '50%',
        height: "80px",
        width: "80px",
        borderColor: "white",
        borderWidth: "3px",
        borderStyle: "solid",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",

    },
    icon: {
        display: "inline",
        verticalAlign: "middle",
        padding: "0 5px"
    },
    joinButton: {
        width: "100%",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
        marginTop: "20px"
    },
    mapContainer: {
        marginTop: "10px",
        height: "550px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
    },
    organizerAvatar: {
        height: "auto",
        justifyContent: "center",
        textAlign: "center"
    },
    mapGrid: {
        position: "relative",
        width: "100%",
        textAlign: "center",
    },

    gridListContainer: {
        height: "auto"
    },
    activeStatus: {
        fontFamily: "'Quicksand', sans-serif;",
        backgroundColor: "rgb(99,151,68)",
        letterSpacing: 1,
        textTransform: "uppercase",
        color: "white"
    },
    disableStatus: {
        fontFamily: "'Quicksand', sans-serif;",
        backgroundColor: "rgb(185,72,66)",
        letterSpacing: 1,
        textTransform: "uppercase",
        color: "black"
    },

    userCardItem: {
        minHeight: "auto",
        minWidth: "auto",
        margin: "auto",
        textAlign: "center",
        padding: "10px 10px"
    },
    joinBtn: {
        width: 150,
        marginTop: 10,
        fontSize: 17,
        textTransform: "uppercase",
        fontFamily: "'Quicksand', sans-serif;",
        border: "none",
        backgroundColor: "rgb(99,151,68)",
        color: "white",
        transition: "all 350ms ease-in-out",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
        },
    },
    backdrop: {
        zIndex: 1
    },
    progress:{
        padding:"30px"
    },
    progressContainer:{
        width:"100%",
        textAlign:"center"
    }
};

const imageList = [myImage, placeholderImage, img1, img2];


class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxStep: imageList.length,
            location: {},
            openDropImage: false,
            openResultForm: false,
            joinLocation: false,
            updateLocation: false,
            openDeleteDialog: false,
            deleteLocation: false,
            emailForm: false,
            emailList:[]
        }
    }

    componentDidMount() {
        const locationId = this.props.match.params.id;
        this.props.getLocation(locationId);
        if ("FBIdToken" in sessionStorage) {
            const decodedToken = jwtDecode(sessionStorage.getItem("FBIdToken"));
            this.props.getUser({email: decodedToken.email});
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location !== state.location) {
            return {location: props.location};
        }
        return null;
    }


    toggleJoinForm = () => {
        this.setState({joinLocation: !this.state.joinLocation});
    };

    toggleUpdateForm = () => {
        this.setState({updateLocation: !this.state.updateLocation});
    };

    toggleDeleteForm = () => {
        this.setState({deleteLocation: !this.state.deleteLocation});
    };

    toggleUpdatePhotos = () => {
        this.setState({openDropImage: !this.state.openDropImage});
    };

    handleOpenResultForm = () => {
        this.setState({openResultForm: !this.state.openResultForm});
    };

    handleOpenEmailForm = ()=>{
        this.setState({
            emailForm:!this.state.emailForm
        })
    };

    addEmail = (email)=>{
        if(this.state.emailList.includes(email)){
            const currentList = this.state.emailList
            var index = currentList.indexOf(email)
            currentList.splice(index,1)
            this.setState({
                emailList:currentList
            })
        }
        else{
            const currentList = this.state.emailList
            currentList.push(email)
            this.setState({
                emailList:currentList
            })
        }
    }

    clearEmailList = ()=>{
        this.setState({
            emailList:[]
        })
    }

    selectAllEmails = ()=>{
        this.setState({
            emailList:this.props.location.registeredUsers
        })
    };

    render() {

        const {location,classes, user,  history, loading, locationExists, done} = this.props;
        const {joinLocation, updateLocation, deleteLocation, openDropImage, openResultForm, emailForm, emailList} = this.state;

        console.log("Hoan thanh: "+ location.done);
        return (
            <div>
                <NavBar />
                
                {loading ? <div className={classes.progressContainer}>
                    <CircularProgress size={100} variant="indeterminate" className={classes.progress}/>
                </div> :
                locationExists ?
                <div>
                <Grid container>
                    <ImageGridList
                        imageList={location.locationImages && location.locationImages.length !== 0 ? location.locationImages : imageList}
                        open={this.toggleUpdatePhotos} checkUser={user.email === location.creator} />
                </Grid>

                <Grid container className={classes.gridHeader}>
                    <Grid item sm={1}/>

                    <Grid item sm={10}>
                        <Grid container>
                            <Grid item sm={8}>
                                <Grid container direction="column">
                                    <Typography gutterBottom variant="h3"
                                                className={classes.title}>{location.name}</Typography>

                                    <Typography variant="h5" className={classes.title}>
                                        {`Địa chỉ: ${location.street}`}
                                    </Typography>

                                    <Grid container className={classes.margin}>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" className={classes.title}>Trạng thái:</Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            {location.done === 0 ? <Chip className={classes.activeStatus} label="Còn chỗ"/>
                                            : <Chip className={classes.disableStatus} label="Kết thúc"/>}
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.margin}>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" className={classes.title}>Ngày bắt
                                                đầu:</Typography>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <Typography variant="subtitle1" className={classes.text}>
                                                <EventNoteOutlinedIcon className={classes.icon}/>
                                                {`${location.startDate}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.margin}>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" className={classes.title}>Thời gian:</Typography>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <Typography variant="subtitle1" className={classes.text}>
                                                <AccessTimeOutlinedIcon className={classes.icon}/>
                                                {`${location.startTime} - ${location.endTime}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item sm={1}/>

                            <Grid item sm={3}>
                                <Grid container direction="column"
                                      alignItems="center" justify="center" className={classes.organizerAvatar}>
                                    <img src={location.logoUrl ? location.logoUrl : placeholderImage}
                                         alt="location-avatar" className={classes.image}/>
                                    <Typography variant="subtitle1"
                                                className={classes.text}>{location.organization}</Typography>
                                    <br/>
                                    {user.email === location.creator ?
                                        <div style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>
                                            <Tooltip
                                                title={location.done === 1 ? "Sự kiện đã hoàn thành" : "Cập nhật thông tin"}>
                                                <div>
                                                    <IconButton disabled={location.done === 1}
                                                                onClick={this.toggleUpdateForm}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                title={location.done === 1 ? "Sự kiện đã hoàn thành" : "Đánh dấu đã hoàn thành"}>
                                                <div>
                                                    <IconButton disabled={location.done === 1}
                                                                onClick={() => this.handleOpenResultForm()}>
                                                        <CheckCircleOutlineIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="Xóa sự kiện">
                                                <IconButton className={classes.button} onClick={this.toggleDeleteForm}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        :
                                        <Button className={classes.joinBtn} onClick={this.toggleJoinForm}>Tham
                                            gia</Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={1}/>
                </Grid>
                <br/>
                <Divider style={{marginLeft: "25%", marginRight: "25%"}} variant="middle"/>
                <Grid container className={classes.gridHeader}>
                    <Grid item sm={1}/>
                    <Grid item sm={5}>
                        <Grid container className={classes.gridContent}>
                            <Grid item>
                                <Grid container direction="column">
                                    <Typography className={classes.title} variant="h6">Miêu tả:</Typography>
                                    <Typography className={classes.text}
                                                paragraph>{location.description}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.gridContent}>
                            <Grid item>
                                <Grid container direction="column">
                                    <Typography className={classes.title} variant="h6">Lịch trình:</Typography>
                                    <Typography className={classes.text}
                                                paragraph>{location.agenda}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sm={5}>
                        <Typography align="center" gutterBottom variant="h4" className={classes.title}>Bản
                            đồ</Typography>
                        <div className={classes.mapContainer}>
                            {location.lat && location.lng ? <CleanUpDetailMap
                                center={{lat: location.lat, lng: location.lng}}/> : ""}
                        </div>
                    </Grid>
                    <Grid item sm={1}/>
                </Grid>
                <br/>


                <Divider style={{marginLeft: "25%", marginRight: "25%"}} variant="middle"/>

                <Grid container className={classes.gridHeader}>
                    <Grid item sm={1}/>
                    <Grid item sm={10}>
                        <UserGridList checkUser={user.email === location.creator} userList={location.registeredUsers} handleOpenEmailForm={this.handleOpenEmailForm} emailList={emailList} addEmail={this.addEmail} clear={this.clearEmailList} selectAll={this.selectAllEmails}/>
                    </Grid>
                    <Grid item sm={1}/>
                </Grid>

                <JoinCleanUpForm location={location} user={user} locationId={location.id}
                                 open={joinLocation} close={this.toggleJoinForm}/>
                <UpdateCleanSiteForm close={this.toggleUpdateForm}
                                     email={user.email} open={updateLocation}/>
                <DeleteCleanSiteDialog history={history} close={this.toggleDeleteForm} open={deleteLocation}/>
                <UpdatePhotos open={openDropImage} handleOpenDropImages={this.toggleUpdatePhotos}/>
                <EventResultForm history={history}  location={location} open={openResultForm} handleOpenResultForm={this.handleOpenResultForm} />
                <SendEmailForm clear={this.clearEmailList} open={emailForm} emailList={emailList} handleOpenEmailForm={this.handleOpenEmailForm} />
            </div>:<div className={classes.progressContainer}><Typography>Sự kiện không tồn tại :(.</Typography></div>}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    location: state.locationsData.location,
    user: state.user.user,
    openUpdateSite: state.formState.openUpdateSite,
    loading:state.formState.loading,
    locationExists: state.locationsData.locationExists
});

const mapDispatchToProps = {
    getLocation,
    updateLocation,
    getAllLocations,
    deleteLocation,
    getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CleanUpDetail));

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink, Route } from "react-router-dom";
// import AutoComplete from '../components/AutoComplete';
import SelectTable from '../components/SelectTable';
import TemplateQuery from '../components/TemplateQuery';
import ExecuteList from '../components/ExecuteList';
import QueryResult from '../components/QueryResult';
import { useSelector, useDispatch } from 'react-redux';
import { showSnackBar, getAllTable } from '../redux/actions/dbaAction'

// STYLE
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    Snackbar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        // color: '#fff',
    },
}));

//FUNCTION
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function renderTemplate() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <SelectTable />
            </Grid>
            <Grid item xs={12}>
                <TemplateQuery />
            </Grid>
            <Grid item xs={12}>
                <ExecuteList />
            </Grid>
        </Grid>
    );
}

function renderResult() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <QueryResult />
            </Grid>
        </Grid>
    );
}

//COMPONENTS
function LoadingComponent() {
    const showLoading = useSelector(state => state.dbaReducer.showLoading);

    return (
        <Collapse in={showLoading} >
            <LinearProgress />
        </Collapse>
    );
}
function BackdropComponent() {
    const showLoading = useSelector(state => state.dbaReducer.showLoading);
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={showLoading} invisible={true} />
    );
}
function SnackbarComponent() {
    const snackBar = useSelector(state => state.dbaReducer.snackBar);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(showSnackBar(false, snackBar.message, snackBar.severity));
    };

    return (
        <Snackbar open={snackBar.showSnackBar} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} severity={snackBar.severity}>{snackBar.message}</Alert>
        </Snackbar>
    );
}

//EXPORT
export default function DBAHome() {
    const classes = useStyles();

    const dispatch = useDispatch();

    //Get all table
    useEffect(() => {
        dispatch(getAllTable());
    }, []);

    useEffect(() => {
        console.log("render DBA home");
    });

    

    return (
        <div className={classes.root}>
            <SnackbarComponent />
            <BackdropComponent />

            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton color="inherit" component={React.useMemo(() => React.forwardRef((itemProps, ref) => <RouterLink to="/" ref={ref} {...itemProps} />))}>
                        <EditIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" align="center" noWrap className={classes.title}>DBA</Typography>
                    <IconButton color="inherit" component={React.useMemo(() => React.forwardRef((itemProps, ref) => <RouterLink to="/result" ref={ref} {...itemProps} />))}>
                        <ListIcon />
                    </IconButton>
                </Toolbar>
                <LoadingComponent />
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {/* Main Content */}

                    {/* <AutoComplete /> */}
                    <Route exact component={renderTemplate} path="/" />
                    <Route exact component={renderResult} path="/result" />

                    {/* Main Content */}
                </Container>
            </main>
        </div>
    );
}
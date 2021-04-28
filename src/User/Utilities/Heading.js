import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '20px'
    },
    header: {
        textAlign: 'center'
    },
    title: {
        fontSize: '60px',
        fontWeight: '800',
        marginTop: '20px'
    },
    options: {
        listStyleType: 'none',
        padding: '0',
        marginLeft: '12px',
        '& li': {
            display: 'inline-block',
            marginRight: '20px',
            color: theme.palette.common.black
        }
    },
    divider: {
        marginTop: '12px',
        width: '300px',
    },
    selectedOption: {
        fontWeight: '800'
    },
    optionUrl: {
        textDecoration: 'none',
        fontSize: '22px',
        color: 'black',
    }
}));

function Heading({ title, links = [] }){
    const classes = useStyles();

    const getOption = (optionUrl, optionName) => {
        return <NavLink exact 
                        className={classes.optionUrl} 
                        activeClassName={classes.selectedOption}
                        onClick={() => console.log(`Navigation to ${optionUrl}`)} 
                        to={optionUrl}> 
                    {optionName} 
                </NavLink>
    };

    const headingLinks = links.map(link => {
        return (
            <li>
                {getOption(link.url, link.display)}
            </li>
        );
    });

    return (
        <div className={classes.header}>
            <div className={classes.title}>{title}</div>

            <ul className={classes.options}>
                {headingLinks}
            </ul> 
            
            <hr className={classes.divider}/>
        </div>
    );
}

export default Heading;
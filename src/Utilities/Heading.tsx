import { makeStyles, Theme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { HeadingLink } from '../GlobalTypes';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        margin: '20px'
    },
    header: theme.custom.centerContainer,
    title: {
        fontSize: '60px',
        fontWeight: 800,
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
        fontWeight: 800
    },
    optionUrl: {
        textDecoration: 'none',
        fontSize: '22px',
        color: 'black',
    }
}));

type HeadingProps = {
    title: string,
    subtitle?: string,
    links?: HeadingLink[]
}

function Heading({ title, subtitle="", links = [] }: HeadingProps){
    const classes = useStyles();

    const getOption = (optionUrl: string, optionName: string) => {
        return <NavLink exact 
                        className={classes.optionUrl} 
                        activeClassName={classes.selectedOption} 
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

            {subtitle !== "" ? <h4>{subtitle}</h4> : null}

            <ul className={classes.options}>
                {headingLinks}
            </ul> 
            
            <hr className={classes.divider}/>
        </div>
    );
}

export default Heading;
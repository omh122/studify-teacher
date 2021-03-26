import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from "react-share";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.5),
    },
}));

export default function SocialMediaButtons(props) {
    const { assignment } = props;
    const classes = useStyles();
    return (
        <Grid container >
            <Grid item xs={4} className={classes.root}>
                <FacebookShareButton
                    data-testid="fb-button"
                    quote={"Enter game code: " + assignment._id + " to access " + assignment.name + "."}
                    hashtag="#studify"
                    url={"https://youtu.be/i-QyW8D3ei0"}
                // className={classes.socialMediaButton}
                >
                    <FacebookIcon size={36} round={true} />
                </FacebookShareButton>
            </Grid>
            <Grid item xs={4} className={classes.root}>
                <TwitterShareButton
                    data-testid="twt-button"
                    title={"Enter game code: " + assignment._id + " to access " + assignment.name + "."}
                    hashtags={["studify"]}
                    url={"https://youtu.be/i-QyW8D3ei0"}
                // className={classes.socialMediaButton}
                >
                    <TwitterIcon size={36} round={true} />
                </TwitterShareButton>
            </Grid>
            <Grid item xs={4} className={classes.root}>
                <EmailShareButton
                    data-testid="email-button"
                    subject={"Studify " + assignment.name}
                    body={"Enter game code: " + assignment._id + " to access " + assignment.name + "."}
                    separator={"\n \n"}
                    url={""}
                // className={classes.socialMediaButton}
                >
                    <EmailIcon size={36} round={true} />
                </EmailShareButton>
            </Grid>
        </Grid>

    );
}
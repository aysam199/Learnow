import React, { useState, useEffect } from 'react';
import './SelectedCourseGroups.css';
import GroupChat from '../GroupChat/GroupChat';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CreateGroup from '../CreateGroup/CreateGroup';
import RequestLogin from '../RequestLogin/RequestLogin';
import axiosGet from '../../utils/axiosGet.js';
import axiosPost from '../../utils/axiosPost';
import { useAuth0 } from '../../react-auth0-spa';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#433d3d',
  },
  gridList: {
    width: '95vw',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function SelectedCourseGroups({ state, setState }) {
  const classes = useStyles();
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reqErr, setReqErr] = useState(false);
  const [tileData, setTileData] = useState([]);
  const [columns, setColumns] = useState(Math.floor(window.innerWidth / 350));
  const [group, setGroup] = useState(null);
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const [err, setErr] = useState(null);

  window.addEventListener('resize', () =>
    setColumns(Math.floor(window.innerWidth / 350)),
  );

  const switchCreating = () => setCreating(creating => !creating);

  const joinChat = tile => {
    if (!isAuthenticated) {
      loginWithPopup();
    } else {
      setGroup(tile);
      axiosPost('/groups/join', {
        groupId: tile.id,
        userId: user.sub.split('|')[1],
      })
        .then(console.log)
        .catch(console.log);
    }
  };

  const updateData = () => {
    axiosGet(`/groups/get/courseid=${state.selectedCourse.id}`)
      .then(res => {
        setTileData(
          res.data.map(group => ({
            id: group.id,
            img: '/res/group-logo.jpg',
            name: group.name,
            creator: group.creator_name,
            description: group.description,
            activity: group.updated_at,
          })),
        );
        setLoading(false);
      })
      .catch(err => setReqErr(reqErr => (reqErr = `Failed to get groups`)));
  };

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    updateData();
  }, [creating]);

  if (group) {
    return <GroupChat user={user} group={group} setGroup={setGroup} />;
  }

  if (reqErr) {
    return <span>{reqErr}</span>;
  }

  if (loading) {
    return <span>Loading groups . . . </span>;
  }
  return (
    <div className='groups-container-bg'>
      {tileData.length === 0 && (
        <div style={{ marginLeft: '1.2rem', paddingBottom: '1rem' }}>
          <h3 className='group-title'>No groups exist for this course yet</h3>
          <span className='group-desc'>Feel free to start you own!</span>
        </div>
      )}
      <button onClick={switchCreating} className='createGroup grow'>
        Create group
      </button>

      {creating && isAuthenticated && (
        <div className='form-container'>
          <CreateGroup
            courseId={state.selectedCourse.id}
            setCreating={setCreating}
          />
        </div>
      )}
      {creating && !isAuthenticated && <RequestLogin />}

      <div className={classes.root}>
        <GridList
          cols={columns}
          spacing={30}
          cellHeight={420}
          className={classes.gridList}
        >
          {tileData.map(tile => (
            <GridListTile key={tile.id}>
              <img className='group-img' src={tile.img} alt={tile.name} />
              <ListSubheader>
                {
                  <div>
                    <h2 className='group-name'>{tile.name}</h2>
                    <p className='group-desc'>{tile.description}</p>
                  </div>
                }
              </ListSubheader>
              <GridListTileBar
                name={`Latest activity ${tile.activity}`}
                subtitle={<span>by: {tile.creator}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.name}`}
                    className={classes.icon}
                    onClick={() => joinChat(tile)}
                  >
                    <QuestionAnswerIcon htmlColor='#f5f6f8' />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default SelectedCourseGroups;

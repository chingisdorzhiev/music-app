import { useContext, useState, useEffect} from 'react'
import styles from "./playbarStyles.module.scss"
import { AudioContext } from '../../context/AudioContext'
import { Slider, IconButton } from '@mui/material'
import { Pause, PlayArrow } from '@mui/icons-material'
import secondsToMMSS from '../../utils/secondsToMMSS'

const TimeControls = () => {
    const { audio, currentTrack } = useContext(AudioContext);
    const { duration } = currentTrack;

    const [currentTime, setCurrentTime] = useState(0);
    const currentTimeFormated = secondsToMMSS(currentTime);
    const sliderCurrentTime = Math.round((currentTime / duration) * 100);

    const handleChangeCurrentTime = (_, value) => {
        const time = Math.round((value / 100) * duration);
        setCurrentTime(time);
        audio.currentTime = time;
    };

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 1000);

        return () => {
            clearInterval(timeInterval)
        }
      }, []);

    return (
        <>
            <p>{currentTimeFormated}</p>
            <Slider
                step={1}
                min={0}
                max={100}
                value={sliderCurrentTime}
                onChange={handleChangeCurrentTime}
                />
        </>
    )
}

const Playbar = () => {
  const { currentTrack, isPlaying, handleToggleAudio } = useContext(AudioContext);

  const { title, artists, preview, duration } = currentTrack;

  const durationFormated = secondsToMMSS(duration);

  return (
    <div className={styles.playbar}>
      <img className={styles.preview} src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={styles.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={styles.slider}>
        <TimeControls />
        <p>{durationFormated}</p>
      </div>
    </div>
  )
}

export default Playbar

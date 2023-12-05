import styles from "./trackStyles.module.scss"
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import cn from "classnames"

const Track = (track) => {
  const {preview, title, artists, duration} = track;

  const { currentTrack, isPlaying, handleToggleAudio } = useContext(AudioContext);

  const isCurrentTrack = currentTrack.id === track.id;

  const durationFormated = secondsToMMSS(duration)

  return (
    <div className={cn(styles.track, isCurrentTrack && styles.playing)}>
        <IconButton onClick={() => handleToggleAudio(track)}>
            {isCurrentTrack && isPlaying ? <Pause/> : <PlayArrow/>}
        </IconButton>
        <img className={styles.preview} src={preview} alt="" />
        <div className={styles.credits}>
            <b>{title}</b>
            <p>{artists}</p>
        </div>
        <p>{durationFormated}</p>
    </div>
  )
}

export default Track

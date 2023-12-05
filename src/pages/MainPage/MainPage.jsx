import { useState } from "react"
import tracksList from "../../assets/tracksList"
import Track from "../../components/track/Track"
import styles from "./mainPage.module.scss"
import { Input } from "@mui/material"

const runSearch = (query) => {
  if (!query) {
    return tracksList;
  }
  const loweredQuery = query.toLowerCase();

  return tracksList.filter(track => {
    return (track.title.toLowerCase().includes(loweredQuery) ||
    track.artists.toLowerCase().includes(loweredQuery))
  })
}

const MainPage = () => {
  const [tracks, setTracks] = useState(tracksList);

  const handleChange = (event) => {
    const foundTracks = runSearch(event.target.value);
    setTracks(foundTracks);
  }

  return (
    <div className={styles.search}>
        <Input className={styles.input} placeholder="Search" onChange={handleChange}/>
        <div className={styles.list}>
            {tracks.map(track => (
                <Track {...track} key={track.id}></Track>
            ))}
        </div>
    </div>
  )
}

export default MainPage

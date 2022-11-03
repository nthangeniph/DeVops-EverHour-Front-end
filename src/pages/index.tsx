import type { NextPage } from 'next'
import DragDrop from '../components/DragDrop'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <div className={styles.container}>

     <DragDrop/>
    </div>
  )
}

export default Home

import type { NextPage } from 'next'
import Image from 'next/image'
import DragDrop from '../components/DragDrop'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.coverView}>
      {/* <table className="table-passengers-not-injured" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th><span>Tasks</span></th>
            <th>{<span>Monday <br/>oct 3</span>}</th>
            <th>{<span>Tuesday <br/>oct 4</span>}</th>
            <th>{<span>Wednsday <br/>oct 5</span>}</th>
            <th>{<span>Thursday <br/>oct 6</span>}</th>
            <th>{<span>Friday <br/>oct 7</span>}</th>
            <th>{<span>Saturday <br/>oct 8</span>}</th>
            <th>{<span>Sunday <br/>oct 9</span>}</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>
              <span>Implementation</span>
  
            </td>
            <td>
              <span>Implementation</span>
  
            </td>
            <td>
              <span>Implementation</span>
  
            </td>
            <td>
              <span>Implementation</span>
  
            </td>
            <td>
              <span>Implementation</span>
  
            </td>
            <td>
              <span>Implementation</span>
  
            </td>
            <td>
              <span>Implementation</span>
            </td>
            <td>
              <span>Implementation</span>
  
            </td>
            <td>
              <span>Implementation</span>
  
            </td>
           </tr> 
        </tbody>
      </table> */}
      <DragDrop/>
        
      </div>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

import type { NextPage } from 'next'
import DragDrop from '../components/DragDrop'
import styles from '../styles/Home.module.css'
import {Layout} from 'antd';
import style from './style.module.scss'
import { LoginOutlined } from '@ant-design/icons';
import { withAuth } from '../hocs/withAuth';
import { useBeforeunload } from "react-beforeunload";
import { refreshAccessToken } from '../utils/auth';
import { useAuth } from '../providers/auth';

const Home: NextPage = () => {
  const {logoutUser}=useAuth();
  useBeforeunload(() => refreshAccessToken());

  return (
    <div className={styles.container}>

     <DragDrop/>


     <Layout.Footer className={style.footer}>
     
      <span 
         style={{cursor:'pointer'}}
          onClick={()=>logoutUser()}> <LoginOutlined style={{marginRight:'5px',cursor:'pointer'}}/> Sign Out</span> </Layout.Footer>
    </div>
    
  )
}

export default withAuth(Home)

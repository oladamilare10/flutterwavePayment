import React, { useEffect } from 'react'
import Forms from '../components/Forms';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Invalid from '../components/Invalid';

const Home = () => {
    const [validPay, setValidPay] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    const [userData, setData] = React.useState(null)
    const [userError, SetError] = React.useState(null)
    const urlParams = useParams()

    const checkAll = () => {
        setTimeout(() => {
            
            if (!urlParams.userValidation) {
                setValidPay(false)
                setIsLoading(false)
            }else
            if(urlParams.viewEliment !== "mobviderse"){
                setValidPay(false)
                setIsLoading(false)
            }else{
                setValidPay(true)
                const url = 'https://api.allbillsarena.com.ng/profile.php';
                const urlHeader = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                const method = 'POST'
                const urlBody = JSON.stringify(
                    {
                    user_id: urlParams.userValidation
                    }
                )

                fetch(url, {
                    method: method,
                    headers: urlHeader,
                    body: urlBody
                })
                .then(res => {
                    if (!res.ok) {
                    throw Error('Could not fetch Data for this particular resource.')
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.status === 'error') {
                        throw Error(data.message)
                    }
                    setData(data.data.data);
                    setIsLoading(false)
                    SetError(null)
                })
                .catch(err => {
                    SetError(err.message)
                    setIsLoading(null)
                    setData(null)
                })
            }

        }, 800);
    }

    useEffect(() => {
        checkAll()
    }, [])
  return (
    <>
      {
        isLoading ? 
            <Loading />
            :
            validPay ? 
                userData && <Forms userInfo={userData} userId={urlParams.userValidation} />
                :
                <Invalid>No Valid Credentials available</Invalid>   
      }
    </>
  )
}

export default Home

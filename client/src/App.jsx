import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserApi from './entities/UserApi'
import { setAccessToken } from './shared/lib/axiosInstance' 
import { UserValidator } from './entities/users/User.validator'

const defaultValue = {
  login: "",
  mail: "",
  password: "",
  id: 0,
};

function App() {
  const [count, setCount] = useState(0)
  const [ user, setUser ] = useState({})
    const [orders, setOrders] = useState([]);
  const [inputs, setInputs] = useState(defaultValue);
  const [validateError, setValidateError] = useState('')

  useEffect(() => {
    console.log('Зашли в useEffect')
    const getUser = async () => {
      try {
        const data = await UserApi.refresh()
        console.log("refresh data:", data)
        if (data.statusCode === 200 && data.data.accessToken) {
          // ! ! ! ! ! !
          setUser((pre) => ({...pre, ...data.data.user}))
          setAccessToken(data.data.accessToken)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const { isValid, error } = UserValidator.validate(inputs)
      
      if (isValid) {
        const data = await UserApi.register(inputs)
        if (data.statusCode === 200 && data.data.accessToken) {
          setOrders((orders) => [...orders, data.data.user])
          setInputs(defaultValue);
          setValidateError('')
        } else {
          console.log(error)
        }
      } else {
        setValidateError(error)
        console.log('Ошибка из валидатора', error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function inputsHandler(e) {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  }

  return (
    <>
      
    </>
  )
}

export default App

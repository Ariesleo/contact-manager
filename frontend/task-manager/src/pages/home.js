import { useEffect, useState } from "react";
import axios from 'axios';

export const Home = () => {
    const [contact, setContact] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/contacts`)
            .then(res => {
                console.log(res.data)
                setContact(res.data)
      }).catch((e) => {
          console.log({e})
      })
    }, [])
    contact.forEach((elem, key) => {
          console.log(elem)
      })
    return (<>
        {contact.map((elem, key) => {
            return (<h4 key={key}>{elem.name}</h4>)
        })}
    </>)
}


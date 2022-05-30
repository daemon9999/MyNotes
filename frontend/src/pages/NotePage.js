import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'


import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
const NotePage = () => {
   
    let {id} = useParams()
    let navigate = useNavigate()
    const [note, setNote] = useState(null)
    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async () => {
        if (id === 'new') return
        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json()
        setNote(data) 
    }

    let updateNote = async () => {
        fetch(`/api/notes/${note.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

        navigate('/')
    }

    let createNote = async () => {
        
        fetch('/api/create-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }) 
               
        
        navigate('/')
        
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${note.id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if ( id !== 'new' && note.body === ''){
            deleteNote()
        }
        else if ( id !== 'new') {
            updateNote()
        }
        else if ( id === 'new' && note.body !== '') {
            createNote()
        }
        navigate('/')
    }




  return (
    <div className='note'>
        <div className="note-header">
            <h3>
                
                <ArrowLeft onClick={handleSubmit}/>
                
            </h3>
            {id !== 'new'
            ?(
                <button onClick={deleteNote}>Delete</button>
            ) 
            :(
                
                <button onClick={handleSubmit}>Done</button>
            )}
            
        </div>
        <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
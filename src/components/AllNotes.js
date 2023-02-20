import React from 'react';
import Notes from './notes/Notes';

const AllNotes = (props) => {
    const { showAlert } = props;
  return (
    <div className='container'>
    <Notes showAlert={showAlert} />
      
    </div>
  )
}

export default AllNotes

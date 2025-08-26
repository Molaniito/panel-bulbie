import React from 'react'

function ModalMatchImage({Emoji, Name, Definition}) {
  return (
    <div>
        <h1>{Emoji}</h1>
        <h2>{Name}</h2>
        <p>{Definition}</p>
    </div>
  );
}

export default ModalMatchImage
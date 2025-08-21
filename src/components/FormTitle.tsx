import React from 'react'

function FormTitle({ MainTitle, SecondTitle }) {
    return (
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{MainTitle}</h2>
            <p className="text-gray-600">{SecondTitle}</p>
        </div>
    )
}

export default FormTitle
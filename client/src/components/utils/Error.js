import React, { useEffect, useState } from 'react'

export const Error = ({ error }) => {

    const [displayError, setDisplayError] = useState(false); 

    useEffect(() => {
        if (error) {
            setDisplayError(true); 
            const timeOutId = setTimeout(() => {
                setDisplayError(false);
            }, 2000);

            return () => {
                clearTimeout(timeOutId);
                setDisplayError(false);
            }
        }
    }, [error]);


    return (
        <>
            {displayError &&
                <div className='error'>
                    <button className='error-btn'>{error}</button>
                </div>}
        </>
    )
}

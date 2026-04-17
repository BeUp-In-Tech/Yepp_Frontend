import React from 'react';

const Title = ({ children }) => {
    return (
        <div className='text-2xl font-bold text-[#4BBCCE] mb-3'>
            {children}
        </div>
    );
};

export default Title;
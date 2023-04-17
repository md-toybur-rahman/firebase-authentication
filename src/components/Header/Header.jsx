import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link className='text-decoration-none fs-5 me-4' to='/login'>Login</Link>
            <Link className='text-decoration-none fs-5' to='/register'>Register</Link>
        </div>
    );
};

export default Header;
import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn){
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className='f4 link dim white underline pa3 pointer fw1'>Sign Out</p>
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f4 link dim white underline pa3 pointer fw1'>Sign In</p>
				<p onClick={() => onRouteChange('register')} className='f4 link dim white underline pa3 pointer fw1'>Register</p>
			</nav>
			)
	}

}

export default Navigation;
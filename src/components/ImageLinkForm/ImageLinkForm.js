import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className='pt3'>
			<p className='f2 fw6'>
				{'This MAGIC BRAIN will detect faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input 
						className='f4 pa2 w-70 center bg-lightest-blue ba b--gold bw2 br2' 
						type='tex' 
						onChange={onInputChange} />
					<button 
						className='w-30 grow f4 link ph3 pv2 dib bg-light-blue ba b--gold bw2 br2'
						onClick={onButtonSubmit}
						>Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;
import React from 'react';
import './loader.styles.scss';
import LoaderImage from '../../assets/loader.gif';

const Loader = () => (
	<div className='loader-container'>
		<img src={LoaderImage} alt=""/>
	</div>
);

export default Loader;
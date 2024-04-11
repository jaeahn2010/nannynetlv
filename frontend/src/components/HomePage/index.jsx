import Gallery from '../Gallery'
import { useState, useEffect } from 'react'

export default function HomePage({babysitters, loginStatus, username, languages, setLanguages, zipCodes, setZipCodes}) {

	function handleSubmit(evt) {
		evt.preventDefault()
		setLanguages([])
		setZipCodes(zipCodes)
	}

	function handleInputChange(evt) {
		console.log(evt.target.name)
	}

	return (
		<>
			<h1>Welcome to NannyNetLV!</h1>
			<h2>Search for your ideal babysitter according to your preferences.</h2>
			<div>
				<p>SEARCH CRITERIA</p>
				<form onSubmit={handleSubmit}>
					<div>
						<p>Zip codes:</p>
						<div>
						{
							zipCodes.map(zip => {
								return (
									<p key={zip}>
										<input
											name={zip}
											id={zip}
											type="checkbox"
											onChange={handleInputChange}
										/>
										<label htmlFor={zip}>{zip}</label>
										<br/>
									</p>
								)
							})
						}
						</div>
					</div>
					<div>
						<p>Preferred languages:</p>
						<div>
							{
								languages.map(language => {
									return (
										<p key={language}>
											<input
												name={language}
												id={language}
												type="checkbox"
												onChange={handleInputChange}
											/>
											<label htmlFor={language}>{language}</label>
										</p>
									)
								})
							}
						</div>
					</div>
				</form>
			</div>
			<Gallery
				babysitters={babysitters}
				loginStatus={loginStatus}
				username={username}
			/>
		</>
	)
}
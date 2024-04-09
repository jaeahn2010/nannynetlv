import Gallery from '../Gallery'
import { useState, useEffect } from 'react'

export default function HomePage({babysitters, loginStatus, username}) {
	let zipCodesList = [89002, 89005, 89011, 89012, 89014, 89015, 89030, 89031, 89032, 89044, 89052, 89054, 89074, 89081, 89084, 89086, 89087, 89101, 89102, 89103, 89104, 89106, 89107, 89108, 89109, 89110, 89113, 89115, 89117, 89118, 89119, 89120, 89121, 89122, 89123, 89124, 89128, 89129, 89130, 89131, 89134, 89135, 89138, 89139, 89141, 89142, 89143, 89144, 89145, 89146, 89147, 89148, 89149, 89156, 89158, 89161, 89166, 89169, 89178, 89179, 89183, 89191]
	let countriesList = []

	const [zipcodes, setZipCodes] = useState([])
	const [languages, setLanguages] = useState([])

	async function getLanguages() {
		const url = 'https://list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com/languages';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '8e7a3c20e0mshfcf7b64583b7672p1f4e2bjsnc2fc0f0fba3a',
				'X-RapidAPI-Host': 'list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com'
			}
		};

		try {
			const response = await fetch(url, options);
			const result = await response.clone().json()
			for (let countryObj of result) {
				countriesList.push(countryObj.name)
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getLanguages()
	}, [])

	return (
		<h1>Home Page</h1>
	)
}
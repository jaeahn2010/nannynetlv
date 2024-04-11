import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import AboutPage from '../AboutPage'
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import AuthFormPage from '../AuthFormPage'
import ProfilePage from '../ProfilePage'
import { getBabysitters } from '../../../utils/backend'
import './styles.css';

export default function App() {
	const [babysitters, setBabysitters] = useState([])
	const [loginStatus, setLoginStatus] = useState(false)
	const [username, setUsername] = useState('')
	const [detailsData, setDetailsData] = useState({})
	const [languages, setLanguages] = useState([])
	const [zipCodes, setZipCodes] = useState([])
	const navigate = useNavigate()
	const zipCodesList = [89002, 89005, 89011, 89012, 89014, 89015, 89030, 89031, 89032, 89044, 89052, 89054, 89074, 89081, 89084, 89086, 89087, 89101, 89102, 89103, 89104, 89106, 89107, 89108, 89109, 89110, 89113, 89115, 89117, 89118, 89119, 89120, 89121, 89122, 89123, 89124, 89128, 89129, 89130, 89131, 89134, 89135, 89138, 89139, 89141, 89142, 89143, 89144, 89145, 89146, 89147, 89148, 89149, 89156, 89158, 89161, 89166, 89169, 89178, 89179, 89183, 89191]
	let languagesList = []

	async function getData() {
		const data = await getBabysitters()
		setBabysitters(data)
	}

	async function getUserData() {
		const currentUserData = await getUserByToken()
		setUsername(`${currentUserData.firstName} ${currentUserData.lastName}`)
	}

	async function getLanguages() {
		const url = 'https://list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com/languages';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '8e7a3c20e0mshfcf7b64583b7672p1f4e2bjsnc2fc0f0fba3a',
				'X-RapidAPI-Host': 'list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com'
			}
		}

		try {
			const response = await fetch(url, options);
			const result = await response.clone().json()
			for (let countryObj of result) {
				languagesList.push(countryObj.name)
			}
			setLanguages(languagesList)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		getData()
		getLanguages()
		setZipCodes(zipCodesList)
		if (loginStatus) getUserData()
	}, [])

	let authLink = 
		<div>
			<Link to='/auth/signup'>
				<h2>Sign Up</h2>
			</Link>
			<Link to='/auth/login'>
				<h2>Log In</h2>
			</Link>
		</div>
	let profileLink
	let userGreeting = ''

	if (loginStatus) {
		authLink = 
			<div>
				<button
					onClick={() => {
						if (confirm("Are you sure you would like to log out?")) {
							localStorage.clear()
							setLoginStatus(false)
							navigate('/')
						}
					}}>
					Log Out
				</button>
			</div>
		userGreeting = 
			<h1>
				Logged in as {username}
			</h1>
		if (localStorage.getItem("userCategory") === "Babysitter") {
			profileLink = 
				<div>
					<Link to={'/profile/babysitter/' + localStorage.getItem("userToken")}>
						<h2>My Babysitter Profile</h2>
					</Link>
				</div>
		} else {
			profileLink = 
				<div>
					<Link to={'/profile/parent/' + localStorage.getItem("userToken")}>
						<h2>My Parent Profile</h2>
					</Link>
				</div>
		}
	} else if (localStorage.userToken) {
		setLoginStatus(true)
	}

	return (
		<>
			<nav>
				<Link to='/'>
					<h1>NannyNetLV</h1>
				</Link>
				<Link to='/about'>
					<h1>About</h1>
				</Link>
				{profileLink}
				{authLink}
			</nav>
			{userGreeting}
			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							babysitters={babysitters}
							loginStatus={loginStatus}
							username={username}
							languages={languages}
							setLanguages={setLanguages}
							zipCodes={zipCodes}
							setZipCodes={setZipCodes}
						/>
					}
				/>
				<Route
					path="/profile/babysitter/:babysitterId"
					element={
						<ProfilePage
							babysitters={babysitters}
							loginStatus={loginStatus}
							username={username}
						/>
					}
				/>
				<Route
					path="/profile/parent/:parentId"
					element={
						<ProfilePage
							babysitters={babysitters}
							loginStatus={loginStatus}
							username={username}
						/>
					}
				/>
				<Route
					path="/auth/:formType"
					element={
						<AuthFormPage
							setLoginStatus={setLoginStatus}
							languages={languages}
							setLanguages={setLanguages}
							zipCodes={zipCodes}
							setZipCodes={setZipCodes}
						/>
					}
				/>
				<Route
					path="/about"
					element={<AboutPage/>}
				/>
				<Route
					path="/details/:babysitterId"
					element={
						<DetailsPage
							babysitter={detailsData}
							loginStatus={loginStatus}
						/>
					}
				/>
			</Routes>
		</>
	)
}

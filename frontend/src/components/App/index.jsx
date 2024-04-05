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
	const navigate = useNavigate()

	async function getData() {
		const data = await getBabysitters()
		//add filters here
		setBabysitters(data)
	}

	async function getUserData() {
		const currentUserData = await getUserByToken()
		setUsername(`${currentUserData.firstName} ${currentUserData.lastName}`)
	}

	useEffect(() => {
		getData()
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

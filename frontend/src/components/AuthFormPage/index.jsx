import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend"

export default function AuthFormPage({ setLoginStatus, languages, setLanguages, zipCodes, setZipCodes }) {
	const { formType } = useParams()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

	async function handleSubmit(event) {
        event.preventDefault()
        if (formType === 'login') {
            try {
                const userCredentials = await logIn(formData)
                localStorage.setItem('userToken', userCredentials.token)
                localStorage.setItem('userCategory', userCredentials.category)
                setLoginStatus(true)
                navigate('/')
            } catch(error) {
                alert(error)
                navigate('/auth/login')
            }
        } else {
            try {
                const userCredentials = await signUp(formData)
                localStorage.setItem('userToken', userCredentials.token)
                localStorage.setItem('userCategory', userCredentials.category)
                setLoginStatus(true)
                navigate('/')
            } catch(error) {
                alert(error) 
                navigate('/auth/login')
            }
        }
    }

	const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

	let actionText
    formType === 'login' ? actionText = 'Log In' : actionText = 'Sign Up'
    let signupFieldsPage1
	let signupFieldsPage2
	let signupFieldsPage3

	if (formType !== 'login') {
		signupFieldsPage1 =
			<div>
				<div>
					<label htmlFor="firstName">First name</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						required
						placeholder="Your first name"
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="lastName">Last name</label>
					<input
						id="lastName"
						name="lastName"
						type="text"
						required
						placeholder="Your last name"
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						placeholder="Your email"
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Choose a password</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						onChange={handleInputChange}
					/>
				</div>
			</div>
		signupFieldsPage2 = 
			<div>
				<div>
					<p>Please tell us a little bit about yourself.</p>
				</div>
				<div>
					<label htmlFor="gender">Your gender</label>
					<select
						name="gender"
						id="gender"
						defaultValue='none'
						onChange={handleInputChange}
					>
						<option key='0' value='none' disabled>
							Select a gender
						</option>
						<option key='1' value='male'>Male</option>
						<option key='2' value='female'>Female</option>
						<option key='3' value='nonBinary'>Non-binary</option>
						<option key='4' value='noAnswer'>Prefer not to say</option>
					</select>
				</div>
				<div>
					<p>Languages spoken:</p>
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
				<div>
					<label htmlFor="willTravel">Can you travel to clients' desired location(s)?</label>
					<select
						name="willTravel"
						id="willTravel"
						defaultValue='none'
						onChange={handleInputChange}
					>
						<option key='0' value='none' disabled>
							Select an option
						</option>
						<option key='yesTravel' value={true}>Yes</option>
						<option key='noTravel' value={false}>No</option>
					</select>
				</div>
				<div>
					<p>Zip codes available:</p>
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
			</div>
		signupFieldsPage3 =
			<div>
				<div>
					<p>Please specify your general weekly availability.</p>
				</div>
				<div>
					{
						days.map(day => {
							return (
								<div key={day}>
									<p>{day}:</p>
									<label htmlFor={`startTime${day}`}>Start time:</label>
									<input
										name={`startTime${day}`}
										id={`startTime${day}`}
										type="time"
										onChange={handleInputChange}
									/>
									<label htmlFor={`endTime${day}`}>End time:</label>
									<input
										name={`endTime${day}`}
										id={`endTime${day}`}
										type="time"
										onChange={handleInputChange}
									/>
								</div>
							)
						})
					}
				</div>
			</div>
	}

	return (
		<div>
			<h1>AuthForm Page Test</h1>
			{signupFieldsPage1}
			{signupFieldsPage2}
			{signupFieldsPage3}
		</div>
		
	)
}
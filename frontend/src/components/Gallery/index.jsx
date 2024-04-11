import Card from '../Card'
import { useState } from 'react'

export default function Gallery({babysitters, loginStatus, username}) {
	const [endDisplayIndex, setEndDisplayIndex] = useState(5)
    let galleryContent = <p>No babysitters found that match your current criteria.</p>

    if (babysitters.length > 0) {
        galleryContent = babysitters
            .slice(0, endDisplayIndex)
            .map(babysitter => 
				<Card
					key={babysitter._id}
					babysitter={babysitter}
					loginStatus={loginStatus}
					username={username}
				/>)
    }

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && endDisplayIndex < babysitters.length) {
            setEndDisplayIndex(endDisplayIndex + 5)
        }
    }
	return (
		<div>
			{galleryContent}
		</div>
	)
}
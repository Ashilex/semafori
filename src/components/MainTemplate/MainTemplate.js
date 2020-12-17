import React from 'react'
import Footer from '../Footer/Footer'
import Header from "../Header/Header";

function MainTemplate(props) {
	const {children, footerCourseName, footerCourseLink, navItems, logo} = props
	return(
		<>
			<Header
				logo={logo}
				navItems={navItems} />
			{children}
			<Footer
				courseName={footerCourseName}
				courseLink={footerCourseLink}
				navItems={navItems} />
		</>
	)
}

export default MainTemplate
import React, { useState } from 'react';
import {NavLink as RouterLink} from 'react-router-dom'
import style from './Header.module.css'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavbarText
} from 'reactstrap';

const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const {logo, navItems} = props
	const toggle = () => setIsOpen(!isOpen);
	const itemList = navItems.map(item => {
		return (
			<NavItem key={item.url}
					 // className={style.navItem}
			>
				<RouterLink exact={item.exact}
							// activeClassName={style.active}
							to={item.url}
							className="nav-link">
					{item.text}
				</RouterLink>
			</NavItem>
		)
	});


	return (
		<div>
			<Navbar className={style.navBar} light expand="md">

				<NavbarBrand href="/">
					<RouterLink to="/">
						<img className={style.logo} src={logo} alt=""/>
					</RouterLink>
				</NavbarBrand>

				<NavbarToggler onClick={toggle} />

				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						{itemList}
					</Nav>
					<NavbarText>Simple Text</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Header;
import React from 'react'
import { useCallback } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export function SystemFileNav({ data, active, handleNavItemClick }) {


    const navRenderer = useCallback((item, index) => {

        const { id, name } = item;
        const className = index === active ? 'active' : '';

        return <NavItem style={{ cursor: "pointer" }} key={id}>
            <NavLink className={className} onClick={handleNavItemClick?.(index)}>
                <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                    {name}
                </span>
            </NavLink>
        </NavItem>
    }, [active]);


    return <div className="col-12">
        <Nav tabs>
            {data.map(navRenderer)}
        </Nav>
    </div>
}

import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return(
            <div>
                <header className="app-header">
                    <div className="app-logo">
                        Image Viewer
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;
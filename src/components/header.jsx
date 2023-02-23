import logo from '../logo.svg';

function Header() {
    return (
        <header>
            <div className='logo'>
                <img src={logo} alt="React Todo logo" />
                <span>React Todo</span>
            </div>
            
        </header>
    );
}

export default Header;
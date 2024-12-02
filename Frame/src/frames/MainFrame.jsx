import '../sass/output.css'
const MainFrame = () => {
    const loginStatus = 1;
    const userName = "Allenhnn_";
    return (
        <div className="mainFrame">
            <nav id='FrameNavbar'>
                <h1 className='logo'>PigSystem</h1>
                <div className='searchBar'>
                    <div className="home"></div>
                    <input type="text" />
                </div>
                {loginStatus == 0 ?
                    // 登入
                    <div className='memberBar'>
                        <div className="memberImg"></div>
                        <h3>{userName}</h3>
                    </div>
                    :
                    // 未登入
                    <div className='memberBar'>
                        <div className='loginBtn'>註冊</div>
                        <div className='loginBtn'>登入</div>
                    </div>
                }

            </nav>
            <div className='container'>
                <div className="navSide"></div>
                <div className="mainSide"></div>
                <div className="infoSide"></div>
            </div>
        </div>
    )
    // npm start
    // sass xx.scss output.css
}
export default MainFrame;
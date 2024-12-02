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
                <div className="mainSide">
                    <div className="banner"></div>
                    <div className="blockes_container">
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                        <div className="block_outer">
                            <div className="block_img"></div>
                            <div className="texts">
                                <h3>Tittleeeee</h3>
                                <h4>allen </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="infoSide"></div>
            </div>
        </div>
    )
    // npm start
    // sass xx.scss output.css
}
export default MainFrame;
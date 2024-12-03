import { useState } from 'react';
import '../sass/output.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPause, faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'


const MainFrame = () => {
    const [loginStatus, setLoginStatus] = useState(0);

    const userName = "Allenhnn_";
    return (
        <div className="mainFrame">
            <nav id='FrameNavbar'>
                <h1 className='logo'>PigSystem</h1>
                <div className='searchBar'>
                    <div className="home"><FontAwesomeIcon icon={faHouse} /></div>
                    <input type="text" />
                </div>
                {loginStatus == 0 ?
                    // 未登入
                    <div className='memberBar'>
                        <div className='loginBtn'>註冊</div>
                        <div className='loginBtn'>登入</div>
                    </div>
                    :
                    // 登入
                    <div className='memberBar'>
                        <div className="memberImg"></div>
                        <h3>{userName}</h3>
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

            <div className="playBar">
                <div className="songBar">
                    <div className="songImg"></div>
                    <div className='texts'>
                        <h3>SongNameName</h3>
                        <h4>Singer</h4>
                    </div>
                </div>
                <div className="control_container">
                    <div className="controls">
                        <div className='icon'><FontAwesomeIcon icon={faBackwardStep} /></div>
                        <div className='icon'><FontAwesomeIcon icon={faPause} /></div>
                        <div className='icon'><FontAwesomeIcon icon={faForwardStep} /></div>
                    </div>
                    <div className="progression">
                        <div className="progression_line" />
                    </div>
                </div>
                <div className="volumn">

                </div>
            </div>

        </div>
    )
    // npm start
    // sass xx.scss output.css
}
export default MainFrame;
import { useEffect, useRef, useState } from 'react';
import '../sass/output.css'
import image from "../images/seeThat.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPause, faForwardStep, faBackwardStep, faExpand, faCompress, faVolumeLow, faPlay, faBook, faMusic, faVideo } from '@fortawesome/free-solid-svg-icons';



const MainFrame = () => {
    const [loginStatus, setLoginStatus] = useState(0);
    const [volumnStatus, setVolumnStatus] = useState(0);
    const [fullScreenStatus, setFullScreenStatus] = useState(false);
    const [playBtn, setPlayBtn] = useState(false);
    const [volumn, setVolumn] = useState(75);
    // const screen_element = useRef();
    const userName = "Allenhnn_";
    // events
    const changeVolumn = e => {
        setVolumn(e.target.value);
    }
    const playBtnStatus = () => {
        if (playBtn) {
            setPlayBtn(false);
        }
        else {
            setPlayBtn(true);
        }
    }
    const fullScreen = () => {
        fullScreenStatus ? setFullScreenStatus(false) : setFullScreenStatus(true);

        if (document.fullscreenElement == null || document.webkitFullscreenElement != null) {
            enter()
        }
        else {
            exit()
        }
        function exit() {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
        }
        function enter() {
            if (
                !document.fullscreenElement && // alternative standard method
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement &&
                !document.msFullscreenElement
            ) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT,
                    );
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    }

    return (
        <div className="mainFrame">
            <nav id='FrameNavbar'>
                <h1 className='logo f1'>PigSystem</h1>
                <div className='searchBar'>
                    <div className="home"><FontAwesomeIcon icon={faHouse} /></div>
                    <input type="text" placeholder='查詢想要的音樂...' />
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
                <div className="navSide">
                    <div className="userInfo" >
                        <div className="userImg"></div>
                        <h2>Allenhnn</h2>
                    </div>
                    <div className="funcitons">
                        <div>
                            <FontAwesomeIcon icon={faHouse} />
                            <h4>主頁</h4>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faVideo} />
                            <h4>影片</h4>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faMusic} />
                            <h4>音樂</h4>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBook} />
                            <h4>電子書</h4>
                        </div>
                    </div>
                </div>
                <div className="mainSide">
                    <div className="banner"></div>

                    <div className="blockes_container">
                        <div className="blockes_info">
                            <h1>精選推薦音樂</h1>
                            <h3>查看更多</h3>
                        </div>
                        <div className="blockes_outer_container">
                            <div className="blockes_outer_container">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div className="block_outer" key={i}>
                                        <div className="block_img"></div>
                                        <div className="texts">
                                            <h3>Title</h3>
                                            <h4>Bllen</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="blockes_container">
                        <div className="blockes_info">
                            <h1>發燒影片</h1>
                            <h3>查看更多</h3>
                        </div>
                        <div className="blockes_outer_container">
                            <div className="blockes_outer_container">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div className="block_outer" key={i}>
                                        <div className="block_img"></div>
                                        <div className="texts">
                                            <h3>Title</h3>
                                            <h4>Allen</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="blockes_container">
                        <div className="blockes_info">
                            <h1>線上電子書</h1>
                            <h3>查看更多</h3>
                        </div>
                        <div className="blockes_outer_container">
                            <div className="blockes_outer_container">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div className="block_outer" key={i}>
                                        <div className="block_img"></div>
                                        <div className="texts">
                                            <h3>Title</h3>
                                            <h4>Allen</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>




                </div>
                <div className="infoSide">
                    <div className="songInfo">
                        <img src={image} alt="" />
                        <div className="songName">
                            <h2>See that?</h2>
                            <h4>NMIXX</h4>
                        </div>
                    </div>
                    <div className="nextSong">
                        <h3>為您推薦</h3>
                        <div className='nextSongs'>
                            <div className="suggestSong">
                                <img src={image} alt="" />
                                <div className='suggestSongName'>
                                    <h4>See that?</h4>
                                    <h5>NMIXX</h5>
                                </div>
                            </div>
                            <div className="suggestSong">
                                <img src={image} alt="" />
                                <div className='suggestSongName'>
                                    <h4>See that?</h4>
                                    <h5>NMIXX</h5>
                                </div>
                            </div>
                            <div className="suggestSong">
                                <img src={image} alt="" />
                                <div className='suggestSongName'>
                                    <h4>See that?</h4>
                                    <h5>NMIXX</h5>
                                </div>
                            </div>
                            <div className="suggestSong">
                                <img src={image} alt="" />
                                <div className='suggestSongName'>
                                    <h4>See that?</h4>
                                    <h5>NMIXX</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="playBar">
                <div className="playBar_container">
                    <div className="songBar">
                        <img src={image} className="songImg"></img>
                        <div className='texts'>
                            <h3>See that?</h3>
                            <h4>NMIXX</h4>
                        </div>
                    </div>
                    <div className="control_container">
                        <div className="controls">
                            <div className='icon'><FontAwesomeIcon icon={faBackwardStep} /></div>
                            {!playBtn ? <div className='icon' onClick={playBtnStatus}><FontAwesomeIcon icon={faPause} /></div> : <div className='icon' onClick={playBtnStatus}><FontAwesomeIcon icon={faPlay} /></div>}

                            <div className='icon'><FontAwesomeIcon icon={faForwardStep} /></div>
                        </div>
                        <div className="progression">
                            <div className="progression_line" />
                        </div>
                    </div>
                    <div className="volumn">
                        <FontAwesomeIcon className='crp' icon={faVolumeLow} />
                        {/* <div className="volumn_progression"> */}
                        <input type="range" className='volumn_adjust' min={0} max={100} value={volumn} onChange={changeVolumn} style={{
                            background: `linear-gradient(to right, white ${volumn}%, #ffffff37 ${volumn}%)`,
                        }} />
                        {/* </div> */}
                        {!fullScreenStatus ?
                            <FontAwesomeIcon className='crp' icon={faExpand} onClick={fullScreen} /> :
                            <FontAwesomeIcon className='crp' icon={faCompress} onClick={fullScreen} />

                        }
                    </div>
                </div>
            </div>

        </div>
    )
    // npm start
    // sass xx.scss output.css
}
export default MainFrame;
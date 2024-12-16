import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import '../sass/output.css'
import image from "../images/seeThat.jpg"
import testmusic from "../video/1.mp3";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPause, faForwardStep, faBackwardStep, faExpand, faCompress, faVolumeLow, faPlay, faBook, faMusic, faVideo, faG, faXmark, faDisplay, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const IntegrationFrame = () => {
    const [loginStatus, setLoginStatus] = useState(1);
    const [volumnStatus, setVolumnStatus] = useState(0);
    const [loginFrameStatus, setLoginFrameStatus] = useState(1);
    const [loginFrame, setLoginFrame] = useState(1);
    const [fullScreenStatus, setFullScreenStatus] = useState(false);
    const [playBtn, setPlayBtn] = useState(false);
    const [volumn, setVolumn] = useState(75);
    const [frameTime, setFrameTime] = useState(50);
    const audioMusic = useRef();
    console.log("current", audioMusic.current)

    const [musicFrame, setMusicFrame] = useState(false);
    // form 
    const [loginData, setLoginData] = useState({ account: "", createAccount: "", email: "", password: "", createPassword: "", createPassword_c: "", logStatus: "" })
    const URL = "http://localhost:8000/login";
    const userName = "Allenhnn_";

    const cookie = Cookies.get("csrftoken");
    // const csrftoken ="DyN0BqI3CN2YNAD9LMwkIrPP6V0PNtiJ";

    // cookie
    // const csrftoken = Cookies.get('csrftoken')
    // const cookies = new Cookies();
    // console.log(csrftoken ,"csrftoken")


    // form events
    const inputChange = e => {
        // setLoginData((prevData)=>)
        const { name, value } = e.target
        setLoginData((prevData) => ({ ...prevData, [name]: value }))
    }
    console.log(cookie)

    const formSubmit = (arg) => async (e) => {
        setLoginData((prevData) => ({ "logStatus": arg }))
        e.preventDefault();
        console.log("loginData", JSON.stringify(loginData))
        const POSTdata = JSON.stringify(loginData);
        try {
            const response = await axios.post(URL, POSTdata, {
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': cookie
                },
                withCredentials: true
            });
        } catch (error) {
            console.error("Error:", error);
        }
        // setLoginData({ account: "", createAccount: "", email: "", password: "", createPassword: "", createPassword_c: "" , logStatus : ""})
    };
    // const formSubmit = async (e) => {
    //     console.log(e)
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(URL, loginData, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'X-CSRFToken': cookie
    //             },
    //             withCredentials: true 
    //         });
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

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

    // events
    const changeVolumn = e => {
        setVolumn(e.target.value);
    }
    const changeFrameTime_f = e => {
        setFrameTime(e.target.value);
    }
    const playBtnStatus = () => {
        if (playBtn) {
            setPlayBtn(false);
        }
        else {
            setPlayBtn(true);
        }
    }
    
    const playMusic = () => {
        if (audioMusic.current) {
            audioMusic.current.play()
            console.log(audioMusic.current.currentTime)
            console.log(audioMusic.current.duration/60)
        }
    }
    const pauseMusic = () => {
        if (audioMusic.current) {
            audioMusic.current.pause()
            console.log(audioMusic.current.duration)
        }
    }


    return (
        <div className="integrationFrame">
            <nav id='FrameNavbar'>
                <h1 className='logo f1'>PigSystem</h1>
                <div className='searchBar'>
                    <div className="home"><FontAwesomeIcon icon={faHouse} /></div>
                    <input type="text" placeholder='查詢想要的音樂...' />
                </div>
                {loginStatus == 0 ?
                    // 未登入
                    <div className='memberBar'>
                        <div className='loginBtn' onClick={() => { setLoginFrameStatus(1); setLoginFrame(0) }}>註冊</div>
                        <div className='loginBtn' onClick={() => { setLoginFrameStatus(1); setLoginFrame(1) }}>登入</div>
                    </div>
                    :
                    // 登入
                    <div className='memberBar logout' onClick={() => { setLoginStatus(0) }}>
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
                        </div>
                        <div className="blockes_outer_container">
                            <div className="blockes_outer_container">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div className="block_outer" key={i} onClick={() => setMusicFrame(true)}>
                                        <div className="hoverPlay"><FontAwesomeIcon icon={faPlay} /></div>
                                        <div className="block_img"><img src={`${image}`} alt="" /></div>
                                        <div className="texts">
                                            <h3>Title</h3>
                                            <h4>Bllen</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className={`full_music ${!musicFrame ? "slideDown" : "slideUp"}`}>
                <div className="cls" onClick={!musicFrame ? () => setMusicFrame(true) : () => setMusicFrame(false)}><FontAwesomeIcon icon={faUpRightFromSquare} /></div>
                <div className="black_cover" />
                <div className="music_intro">
                    <div className="music_img" style={{ background: `url(${image})center center` }} />
                    <div className="music_text">
                        <h1>See That?</h1>
                        <h3>NMIXX</h3>
                    </div>
                </div>
                <div className="playBar">
                    <div className="playBar_container">
                        <div className="control_container">
                            <div className="progression">
                                <span>0:43</span>
                                <input type="range" className='volumn_adjust' min={0} max={100} value={frameTime} onChange={changeFrameTime_f} style={{
                                    background: `linear-gradient(to right, white ${frameTime}%, #ffffff37 ${frameTime}%)`,
                                }} />
                                <span>2:42</span>
                            </div>
                            <div className="control_bar">

                                <div className="controls">
                                    <div className='icon'><FontAwesomeIcon icon={faBackwardStep} /></div>
                                    {!playBtn ? <div className='icon' onClick={() => { playBtnStatus(); playMusic() }} ><FontAwesomeIcon icon={faPlay} /></div> : <div className='icon' onClick={()=>{playBtnStatus() ; pauseMusic()}}><FontAwesomeIcon icon={faPause} /></div>}

                                    <div className='icon'><FontAwesomeIcon icon={faForwardStep} /></div>
                                </div>
                                <div className="volumn">
                                    <FontAwesomeIcon className='crp' icon={faVolumeLow} />
                                    {/* <div className="volumn_progression"> */}
                                    <input type="range" className='volumn_adjust' min={0} max={100} value={volumn} onChange={changeVolumn} style={{
                                        background: `linear-gradient(to right, white ${volumn}%, #ffffff37 ${volumn}%)`,
                                    }} />

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


            <audio ref={audioMusic}>
                <source src={testmusic} type="audio/ogg" />
            </audio>

        </div>



    )
    // npm start
    // sass xx.scss output.css
}
export default IntegrationFrame;
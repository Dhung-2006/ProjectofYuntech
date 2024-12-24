import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/output.css'
import image from "../images/seeThat.jpg";
import fish from "../images/fish.jpg";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCircleHalfStroke, faBook, faMusic, faVideo, faG, faXmark, faUser } from '@fortawesome/free-solid-svg-icons';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true


const MainFrame = () => {
    const navigate = useNavigate()

    const [loginStatus, setLoginStatus] = useState(0); // 登入狀態
    const [volumnStatus, setVolumnStatus] = useState(0);
    const [loginFrameStatus, setLoginFrameStatus] = useState(0);  // 登入畫面
    const [loginFrame, setLoginFrame] = useState(0); // 登入框
    const [fullScreenStatus, setFullScreenStatus] = useState(false);
    const [playBtn, setPlayBtn] = useState(false);
    const [volumn, setVolumn] = useState(75);
    const [rotate, setRotate] = useState(0);
    const [userInfo, setUserInfo] = useState({ userImg: "", userName: "請登入帳號" });

    // verify
    const [VerifyFrameStatus, setVerifyFrameStatus] = useState(0); // 驗證框
    const verify = () => {
        if (loginStatus == 0) {
            return false;
        }
        else if (loginStatus == 1) {
            return true;
        }
    }

    const [verifyCode, setVerifyCode] = useState({ c_1: "", c_2: "", c_3: "", c_4: "" });

    // form 
    const [loginData, setLoginData] = useState({

        userAccount: "", // 帳號
        userPassword: "", //密碼

        // // // // // // // // // // // // // // // // 

        userCreateAccount: "", // 創建帳號
        userCreateEmail: "", // Email
        userCreatePassword: "", // 創建密碼
        userCreatePassword_c: "",  // 創建密碼(確定)

        // // // // // // // // // // // // // // // // 

        logStatus: ""

    })
    const URL = "http://localhost:8000/login";
    const userName = "Allenhnn_";

    const cookie = Cookies.get("csrftoken");

    // const csrftoken ="DyN0BqI3CN2YNAD9LMwkIrPP6V0PNtiJ";
    const changeCode = (e) => {
        const { name, value } = e.target;
        if (value.length > 1) {
            e.preventDefault()
        }
        else {
            setVerifyCode((prevData) => ({ ...prevData, [name]: value }));
        }
    }

    // form events
    const inputChange = e => {
        // setLoginData((prevData)=>)
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    }
    // console.log(cookie)

    const formSubmit = async (arg, event) => {
        event.preventDefault();
        setLoginData((prevData) => ({ ...prevData, "logStatus": arg }));
    };
    const handleSubmit = () => {
        if (loginData.logStatus) {
            console.log(loginData.logStatus);
            console.log("loginData", loginData)

            console.log("loginData", JSON.stringify(loginData));
            const POSTdata = JSON.stringify(loginData);
            try {
                const response = axios.post(URL, POSTdata, {
                    headers: {
                        "Content-Type": "application/json",
                        'X-CSRFToken': cookie
                    },
                    withCredentials: true
                });


            } catch (error) {
                console.error("Error:", error);
            }
            setLoginData({

                userAccount: "", // 帳號
                userPassword: "", //密碼
        
                // // // // // // // // // // // // // // // // 
        
                userCreateAccount: "", // 創建帳號
                userCreateEmail: "", // Email
                userCreatePassword: "", // 創建密碼
                userCreatePassword_c: "",  // 創建密碼(確定)
        
                // // // // // // // // // // // // // // // // 
        
                logStatus: ""
        
            })
        }
    }

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

    // useEffect 
    useEffect(() => {
        handleSubmit();
    }, [loginData.logStatus])


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
                        <div className='loginBtn' onClick={() => { setLoginFrameStatus(1); setLoginFrame(0) }}>註冊</div>
                        <div className='loginBtn' onClick={() => { setLoginFrameStatus(1); setLoginFrame(1) }}>登入</div>
                    </div>
                    :
                    // 登入
                    <div className="memberBarOuter">
                        <div className='memberBar logout' onClick={() => { setLoginStatus(0) }}>
                            <div className="memberImg"></div>
                            <h3>{userName}</h3>
                        </div>
                        <div className={`DarkLight`} onClick={rotate == 0 ? () => setRotate(180) : () => setRotate(0)} style={{ transform: rotate == 180 ? `rotate(${0}deg)` : `rotate(${180}deg)`, backgroundColor: rotate === 0 ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)" }}><FontAwesomeIcon icon={faCircleHalfStroke} /></div>
                    </div>
                }

            </nav>

            <div className='container'>
                <div className="navSide">
                    <div className="userInfo" style={{ background: `url(${userInfo.userImg}) center center` }}>
                        <div className="backdrop"></div>
                        <div className="infoOuter">
                            <div className="userImg" style={{ background: `url(${userInfo.userImg}) center center` }}>
                                {!loginStatus ? <FontAwesomeIcon icon={faUser} /> : ""}
                            </div>
                            <h2>{userInfo.userName}</h2>
                        </div>
                    </div>
                    <div className="funcitons">
                        <div onClick={loginStatus ? () => navigate("/") : () => alert("您尚未登入")}>
                            <FontAwesomeIcon icon={faHouse} />
                            <h4>主頁</h4>
                        </div>
                        <div onClick={loginStatus ? () => navigate("/videoFrame") : () => alert("您尚未登入")}>
                            <FontAwesomeIcon icon={faVideo} />
                            <h4>影片</h4>
                        </div>
                        <div onClick={loginStatus ? () => navigate("/frame_2") : () => alert("您尚未登入")}>
                            <FontAwesomeIcon icon={faMusic} />
                            <h4>音樂</h4>
                        </div>
                        <div onClick={loginStatus ? () => navigate("/EbookFrame") : () => alert("您尚未登入")}>
                            <FontAwesomeIcon icon={faBook} />
                            <h4>電子書</h4>
                        </div>
                    </div>
                </div>
                <div className="mainSide">
                    <div className="banner"><img src={fish} alt="" /></div>

                    <div className="blockes_container">
                        <div className="blockes_info">
                            <h1>精選推薦音樂</h1>
                            <h3>查看更多</h3>
                        </div>
                        <div className="blockes_outer_container">
                            <div className="blockes_outer_container">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div className="block_outer" key={i} onClick={loginStatus ? () => navigate("/frame_2") : () => alert("您尚未登入")}>
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
                                    <div className="block_outer" key={i} onClick={loginStatus ? () => navigate("/VideoFrame") : () => alert("您尚未登入")}>
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
                                    <div className="block_outer" key={i} onClick={loginStatus ? () => navigate("/EbookFrame") : () => alert("您尚未登入")}>
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

            {/* <div className="playBar">
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
                        <input type="range" className='volumn_adjust' min={0} max={100} value={volumn} onChange={changeVolumn} style={{
                            background: `linear-gradient(to right, white ${volumn}%, #ffffff37 ${volumn}%)`,
                        }} />
                        {!fullScreenStatus ?
                            <FontAwesomeIcon className='crp' icon={faExpand} onClick={fullScreen} /> :
                            <FontAwesomeIcon className='crp' icon={faCompress} onClick={fullScreen} />

                        }
                    </div>
                </div>
            </div> */}

            {/* 
    email  > 多重驗證


    account
    password
    password_c

*/}

            <div className={`login_frame ${loginFrameStatus === 0 ? "opNone" : ""}`} >
                <div className='login_container' >
                    <div className="close" onClick={() => setLoginFrameStatus(0)}><FontAwesomeIcon icon={faXmark} /></div>
                    <div className="logo">PigSystem</div>
                    <div className='log_reg'>
                        <div className={loginFrame !== 1 ? "clicked" : ""} onClick={() => setLoginFrame(0)} >註冊</div>
                        <div className={loginFrame === 1 ? "clicked" : ""} onClick={() => setLoginFrame(1)} >登入</div>
                    </div>
                    <form id='login_form' action='' className={`fadeInout ${loginFrame === 0 ? "op0" : ""}`} onSubmit={(event) => formSubmit("sign", event)}>
                        <div className='user_data'>
                            <input type="text" name='userAccount' value={loginData.userAccount} placeholder='帳號' onChange={inputChange} />
                            <input type="password" name='userPassword' value={loginData.userPassword} placeholder='密碼' onChange={inputChange} />
                        </div>
                        <div className='signInBtns'>
                            <button type='submit' className='signInBtn'>登入</button>
                            {/* <div className='signInBtn'><FontAwesomeIcon icon={faG} style={{ marginRight: "1rem" }} /> 使用 Google 登入  </div> */}
                        </div>
                    </form>
                    <form id='regist_form' action='' className={`fadeInout ${loginFrame === 1 ? "op0" : ""}`}
                        onSubmit={
                            event => {
                                formSubmit("regist", event);
                                setVerifyFrameStatus(1);
                            }}>

                        <div className='user_data'>
                            <input type="text" name='userCreateAccount' value={loginData.userCreateAccount} onChange={inputChange} placeholder='使用者名稱' required />
                            <input type="email" name='userCreateEmail' value={loginData.userCreateEmail} onChange={inputChange} placeholder='E-mail' required />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <input type="password" name='userCreatePassword' value={loginData.userCreatePassword} onChange={inputChange} placeholder='密碼' required />
                                <input type="password" name='userCreatePassword_c' value={loginData.userCreatePassword_c} onChange={inputChange} placeholder='確認密碼' required />
                            </div>
                        </div>
                        <div className='signInBtns'>
                            <button type='submit' className='signInBtn' >傳送驗證碼</button>
                        </div>
                    </form>

                    <form className={`verify_frame ${!VerifyFrameStatus ? "opNone" : ""}`}>
                        <div className="title">
                            <h1>驗證碼認證</h1>
                            {/* <p>我們傳送驗證碼至 <span>{loginData.userCreateEmail}</span></p> */}
                        </div>
                        <div className="codes">
                            {/* <input type="number" name="input_1" min={1} max={9} pattern={[1-9]} required/> */}
                            <input type="number" name="c_1" value={verifyCode.c_1} onChange={changeCode} />
                            <input type="number" name="c_2" value={verifyCode.c_2} onChange={changeCode} />
                            <input type="number" name="c_3" value={verifyCode.c_3} onChange={changeCode} />
                            <input type="number" name="c_4" value={verifyCode.c_4} onChange={changeCode} />
                        </div>
                        <div className="resendOuter">
                            <p>沒收到驗證碼？ <span className="resend">點擊重新重送</span></p>
                        </div>
                        <div className="buttons">
                            <div onClick={() => setVerifyFrameStatus(0)}>取消</div>
                            <div>驗證</div>
                        </div>
                    </form>

                </div>

            </div>
        </div>


    )
    // npm start
    // sass xx.scss output.css
}
export default MainFrame;
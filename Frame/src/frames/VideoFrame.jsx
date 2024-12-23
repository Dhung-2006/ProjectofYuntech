import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/output.css'
import image from "../images/seeThat.jpg"
import testmusic from "../video/1.mp3";
import fish from "../images/fish.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPause, faForwardStep, faBackwardStep, faVolumeLow, faPlay, faBook, faMusic, faVideo, faUpRightFromSquare, faEllipsis, faPlus, faTrash, faGear } from '@fortawesome/free-solid-svg-icons';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const VideoFrame = () => {
    const navigate = useNavigate()

    // class
    const [opN, setopN] = useState("");

    const [loginStatus, setLoginStatus] = useState(1);
    const [fullScreenStatus, setFullScreenStatus] = useState(false);
    const [playBtn, setPlayBtn] = useState(false);
    const [volumn, setVolumn] = useState(75);

    // music
    const [frameTime, setFrameTime] = useState(0); // 時間(軸)
    const [musicLong, setmusicLong] = useState(0);  // 總長
    const [musicDuration, setmusicDuration] = useState(0);  // 時長
    const audioMusic = useRef(null);
    const [musicFrame, setMusicFrame] = useState(false);
    const [songInfo, setSongInfo] = useState({ songName: "Luther (with sza)", songAuthor: "Kendrick Lanmar", songImgRoute: "sdf" });

    // form 
    const [loginData, setLoginData] = useState({ account: "", createAccount: "", email: "", password: "", createPassword: "", createPassword_c: "", logStatus: "" })
    const URL = "http://localhost:8000/login";
    const userName = "Allenhnn_";


    // cookie
    const cookie = Cookies.get("csrftoken");
    // const csrftoken ="DyN0BqI3CN2YNAD9LMwkIrPP6V0PNtiJ";
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
   
   

   
   

  

   


    // useEffect

    useEffect(() => {
        const timer = setTimeout(() => {
            setopN("opNone");
        }, 1500);

        return () => clearTimeout(timer);
    }, [])


    // render
    return (
        <div className="VideoFrame">
            <div className={`loader_outer ${opN}`} >
                <div className="loader"></div>
            </div>
            <div className="navSide">
                <div className="userInfo" >
                    <div className="userImg"></div>
                    <div>
                        <h2>Allenhnn</h2>
                        <div className="status">
                            <div className="circle"></div>
                            &nbsp;
                            &nbsp;
                            <p>Online</p>
                        </div>
                    </div>

                </div>
                <div className="nav_line"></div>
                <div className="funcitons">
                    <div onClick={() => navigate("/")}>
                        <FontAwesomeIcon icon={faHouse} />
                        <h4>主頁</h4>
                    </div>
                    <div className="bgP">
                        <FontAwesomeIcon icon={faVideo} />
                        <h4>影片</h4>
                    </div>
                    <div onClick={() => navigate("/frame_2")}>
                        <FontAwesomeIcon icon={faMusic} />
                        <h4>音樂</h4>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBook} />
                        <h4>電子書</h4>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faGear} />
                        <h4>設定</h4>
                    </div>
                </div>

                {/* <div className="listenTime">
                    <div className="black_drop"></div>
                    <div className="texts">
                        <h1>您已經聽了</h1>
                        <h1>1024</h1>
                        <h1>分鐘</h1>
                    </div>
                </div> */}

            </div>


            <div className='container'>
                <nav id='FrameNavbar'>
                    <div className="careInfo">
                        <h1>晚安 {userName}</h1>
                    </div>
                    <div className='searchBar'>
                        {/* <div className="home" onClick={() => navigate('/')}><FontAwesomeIcon icon={faHouse} /></div> */}
                        <input type="text" placeholder='查詢想要的音樂...' />
                        <div className="userFunc">
                            <div className="moreBtn"><FontAwesomeIcon icon={faEllipsis} />
                                <div className="hidden_item">
                                    <div><FontAwesomeIcon icon={faTrash} /></div>
                                    <div><FontAwesomeIcon icon={faPlus} /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className='memberBar logout' onClick={() => { setLoginStatus(0) }}>
                        <div className="memberImg"></div>
                        <h3>{userName}</h3>
                    </div> */}

                </nav>
                <div className="mainSide">
                    <div className="banner"><img src={fish} alt="" /></div>

                    <div className="blockes_container">
                        <div className="blockes_info">
                            <h1>屬於您的精選影片</h1>
                        </div>
                        <div className="blockes_outer_container">
                            <div className="blockes_outer_container">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div className="block_outer" key={i} onClick={() => setMusicFrame(true)}>
                                        <div className="black_drop"></div>
                                        <div className="block_img"><img src={`${fish}`} alt="" /></div>
                                        <div className="hoverPlay"><FontAwesomeIcon icon={faPlay} /></div>
                                        <div className="absolute_con">
                                            <div className="texts">
                                                <h3>Songname</h3>
                                                <h4>Allen</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className={`full_music ${!musicFrame ? "slideDown" : "slideUp"}`} >
                <div className="cls" onClick={()=>setMusicFrame(false)}><FontAwesomeIcon icon={faUpRightFromSquare} /></div>
                <div className="black_cover" />
                <video src="/ania.mov" controls></video>
                <div className="music_intro">
                    <div className="music_text">
                        <h1>{songInfo.songName}</h1>
                        {/* <h3>{songInfo.songAuthor}</h3> */}
                    </div>
                </div>

            </div>




        </div>



    )
    // npm start
    // sass xx.scss output.css
}
export default VideoFrame;
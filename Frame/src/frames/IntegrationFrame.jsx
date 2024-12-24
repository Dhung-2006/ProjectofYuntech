import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/output.css'
import image from "../images/seeThat.jpg"
import testmusic from "../video/1.mp3";
// import ania from "../../public/ania.mov";
import fish from "../images/fish.jpg";

// json
import SongList from "../jsons/songList.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPause, faForwardStep, faUser, faBackwardStep, faVolumeLow, faPlay, faBook, faMusic, faVideo, faUpRightFromSquare, faCircleHalfStroke, faEllipsis, faPlus, faTrash, faGear, faXmark, faG, faAdd, faImage, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const IntegrationFrame = () => {
    const navigate = useNavigate()

    // class
    const [opN, setopN] = useState("");

    const [loginStatus, setLoginStatus] = useState(1);
    const [fullScreenStatus, setFullScreenStatus] = useState(false);
    const [playBtn, setPlayBtn] = useState(false);
    const [volumn, setVolumn] = useState(75);

    const [loginFrameStatus, setLoginFrameStatus] = useState(0);  // 登入畫面
    const [loginFrame, setLoginFrame] = useState(0); // 登入框

    // delete & create
    const [deleteBtn, setDeleteBtn] = useState(0);
    const [createBtn, setCreateBtn] = useState(0);

    const [alertFrame, setAlertFrame] = useState(0);

    // music
    const [frameTime, setFrameTime] = useState(0); // 時間(軸)
    const [musicLong, setmusicLong] = useState(0);  // 總長
    const [musicDuration, setmusicDuration] = useState(0);  // 時長
    const audioMusic = useRef(null);
    const [musicFrame, setMusicFrame] = useState(false);
    const [songInfo, setSongInfo] = useState({ songName: "Luther (with sza)", songAuthor: "Allen Huang", songImgRoute: "", songSource: "" });

    // search 

    const searchEvent = () => {

    }

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

    const [newFormDatas, setNewFormDatas] = useState({

        upload_title: "", // 標題
        upload_author: "", // 作者
        upload_inner: "",
        upload_img: "",
        select_file: null

    })
    const [uploadDataName, setUploadDataName] = useState("");
    const [deleteDataName, setDeleteDataName] = useState("");

    const URL = "http://localhost:8000/login";
    const userName = "Allenhnn_";

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

    const newFormUpload = async(e) => {
        e.preventDefault();
        const POSTdata = JSON.stringify(newFormDatas);
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
    }

    
    const uploadImgFile = (event) => {
        const file = event.target.files[0];
        setUploadDataName(file.name);
        setNewFormDatas((prev) => ({ ...prev, select_file: file }));

    }

    const deleteUploadFile = async() =>{
        // 分頁 <==> 管理系統的 同步
        // 刪除json
        const POSTdata = deleteDataName;
        try {
            const response = await axios.post(URL, POSTdata, {
                headers: {
                    "Content-Type": "application/text",
                    'X-CSRFToken': cookie
                },
                withCredentials: true
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }



    // events
    const changeVolumn = e => {
        setVolumn(e.target.value);
    }
    const changeFrameTime_f = e => {
        setFrameTime(e.target.value);
        audioMusic.current.currentTime = e.target.value / 100 * musicLong; // 要重新渲染
        setmusicDuration(e.target.value / 100 * musicLong);
        console.log("--------------value", e.target.value / 100 * musicLong);

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
            // console.log(audioMusic.current.currentTime)
            // console.log(audioMusic.current.duration / 60)
        }
    }
    const pauseMusic = () => {
        if (audioMusic.current) {
            audioMusic.current.pause()
            console.log(audioMusic.current.duration)
        }
    }

    const handleMusicDuration = () => {
        if (audioMusic.current) {
            let cTime = audioMusic.current.currentTime;
            let timeLine = (cTime / audioMusic.current.duration) * 100;
            console.log("cTime", cTime)
            console.log((cTime / audioMusic.current.duration) * 100)
            // let timeLine = cTime / 
            setmusicDuration(cTime);

            setFrameTime(timeLine)
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const ClearInputValue = () => {
        setMusicFrame(false);
        setFrameTime(0);
        setmusicDuration(0);
        audioMusic.current.currentTime = 0;
        setPlayBtn(false)
    }


    // useEffect

    useEffect(() => {
        const timer = setTimeout(() => {
            setopN("opNone");
        }, 1500);

        return () => clearTimeout(timer);
    }, [])


    // render
    return (
        <div className="integrationFrame">
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
                    <div onClick={() => navigate("/videoFrame")} >
                        <FontAwesomeIcon icon={faVideo} />
                        <h4>影片</h4>
                    </div>
                    <div className="bgP">
                        <FontAwesomeIcon icon={faMusic} />
                        <h4>音樂</h4>
                    </div>
                    <div onClick={() => navigate("/EbookFrame")}>
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
                        <input type="text" placeholder='查詢想要的音樂...' onChange={searchEvent} />
                        <div className="userFunc">
                            <div className="moreBtn"><FontAwesomeIcon icon={faEllipsis} />
                                <div className="hidden_item">
                                    <div onClick={() => setLoginFrameStatus(1)} ><FontAwesomeIcon icon={faUser} /></div>
                                    <div><FontAwesomeIcon icon={faCircleHalfStroke} /></div>
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
                    <div className="banner"><img src="" alt="" /></div>

                    <div className="blockes_container">
                        <div className="blockes_info">
                            <h1>您獨特的音樂品味</h1>
                        </div>
                        <div className="blockes_outer_container">
                            <div className="blockes_outer_container">
                                {
                                    SongList.map((value, index) => {
                                        return (
                                            <div className="block_outer" key={index} onClick={() => { setMusicFrame(true); setSongInfo({ songName: value.songName, songAuthor: value.songAuthor, songImgRoute: value.songImg, songSource: value.songRoute }) }}>
                                                <div className="black_drop"></div>
                                                <div className="block_img"><img src={`${value.songImg}`} alt="" /></div>
                                                <div className="hoverPlay"><FontAwesomeIcon icon={faPlay} /></div>
                                                <div className="absolute_con">
                                                    <div className="texts">
                                                        <h3>{value.songName}</h3>
                                                        <h4>{value.songAuthor}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {/* {Array.from(SongList).map((_, i) => (
                                    <div className="block_outer" key={i} onClick={() => { setMusicFrame(true); setSongInfo({ songName: "SigmaBoi (with sza)", songAuthor: "Kendrick Lanmar", songImgRoute: { image } }) }}>
                                        <div className="black_drop"></div>
                                        <div className="block_img"><img src={`${i.songRoute}`} alt="" /></div>
                                        <div className="hoverPlay"><FontAwesomeIcon icon={faPlay} /></div>
                                        <div className="absolute_con">
                                            <div className="texts">
                                                <h3>Songname</h3>
                                                <h4>Allen</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className={`full_music ${!musicFrame ? "slideDown" : "slideUp"}`} style={{ background: `url('${songInfo.songImgRoute}') center center` }}>
                <div className="cls" onClick={() => { ClearInputValue(); pauseMusic() }}><FontAwesomeIcon icon={faUpRightFromSquare} /></div>
                <div className="black_cover" />
                <div className="music_intro">
                    <div className="music_img" style={{ background: `url("${songInfo.songImgRoute}") center center` }} />
                    <div className="music_text">
                        <h1>{songInfo.songName}</h1>
                        <h3>{songInfo.songAuthor}</h3>
                        {/* <h3>{songInfo.songImgRoute}</h3> */}
                    </div>
                </div>
                <div className="playBar">
                    <div className="playBar_container">
                        <div className="control_container">
                            <div className="progression">
                                <span>{formatTime(musicDuration)}</span>
                                <input type="range" className='volumn_adjust' min={0} max={100} value={frameTime} onChange={changeFrameTime_f} style={{
                                    background: `linear-gradient(to right, white ${frameTime}%, #ffffff37 ${frameTime}%)`,
                                }} />
                                <span>{formatTime(musicLong)}</span>
                            </div>
                            <div className="control_bar">

                                <div className="controls">
                                    <div className='icon'><FontAwesomeIcon icon={faBackwardStep} /></div>
                                    {!playBtn ? <div className='icon' onClick={() => { playBtnStatus(); playMusic() }} ><FontAwesomeIcon icon={faPlay} /></div> : <div className='icon' onClick={() => { playBtnStatus(); pauseMusic() }}><FontAwesomeIcon icon={faPause} /></div>}

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


            <audio ref={audioMusic}
                key={songInfo.songSource}
                onLoadedMetadata={() => {
                    if (audioMusic.current) {
                        setmusicLong(audioMusic.current.duration)
                    }
                }}
                onTimeUpdate={handleMusicDuration}
            >

                <source
                    src={songInfo.songSource}
                    type="audio/ogg" />

            </audio>

            {/* /////////////////////////////////////////////////////////////////////////// */}

            <div className={`login_frame ${loginFrameStatus === 0 ? "opNone" : ""}`} >
                <div className='login_container' >

                    <div className="logo">音樂管理系統</div>
                    <div className='log_reg'>
                        <div className={`log_btn ${deleteBtn ? "log_btn_click" : ""} ${loginFrame === 1 ? "clicked" : ""}`} onClick={deleteBtn ? () => setDeleteBtn(0) : () => setDeleteBtn(1)} >刪除 <FontAwesomeIcon icon={faTrash} style={{ marginLeft: "0.65rem" }} /> </div>
                        <div className={`log_btn ${createBtn ? "log_btn_click_2" : ""} ${loginFrame !== 1 ? "clicked" : ""}`} onClick={createBtn ? () => setCreateBtn(0) : () => setCreateBtn(1)}>新增 <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "0.65rem" }} /></div>
                    </div>
                    <form id='login_form' action='' className={`fadeInout ${loginFrame === 0 ? "op0" : ""}`} onSubmit={(event) => formSubmit("sign", event)}>
                        <div className='user_data'>
                            <input type="text" name='userAccount' value={loginData.userAccount} placeholder='帳號' onChange={inputChange} />
                            <input type="password" name='userPassword' value={loginData.userPassword} placeholder='密碼' onChange={inputChange} />
                        </div>
                        <div className='signInBtns'>
                            <button type='submit' className='signInBtn'>登入</button>
                            <div className='signInBtn'><FontAwesomeIcon icon={faG} style={{ marginRight: "1rem" }} /> 使用 Google 登入  </div>
                        </div>
                    </form>
                    <form id='regist_form' action='' className={`fadeInout ${loginFrame === 1 ? "op0" : ""}`}
                        onSubmit={
                            event => {
                                formSubmit("regist", event);
                                setVerifyFrameStatus(1);
                            }}>
                        <div className="frame_overflow">
                            {
                                SongList.map((value, index) => {
                                    return (
                                        <div className="song_info">
                                            <div className="song_img"><img src={value.songImg} alt="" /></div>
                                            <div className="song_detail">
                                                <h3>{(value.songName).length > 5 ? String(value.songName).substring(0, 8) + " ..." : value.songName}</h3>
                                                <h4>{(value.songAuthor).length > 5 ? String(value.songAuthor).substring(0, 8) + " ..." : value.songAuthor}</h4>
                                            </div>
                                            <div className="songType">音樂</div>
                                            <div className={`delete ${!deleteBtn ? "opNone" : ""}`} onClick={() => {setAlertFrame(1);setDeleteDataName(value.songName)}}><FontAwesomeIcon icon={faTrash} /></div>
                                        </div>
                                    )
                                })
                            }




                        </div>

                        <div className='signInBtns'>
                            <button type='submit' className='signInBtn' onClick={() => setLoginFrameStatus(0)}>取消</button>
                            {/*<button type='submit' className='signInBtn' >更新</button>*/}
                        </div>



                    </form>


                    <form method="POST" onSubmit={newFormUpload} className={`addSongFrame ${!createBtn ? "opNone" : ""}`}>
                        {/* 照片 */}
                        <div className="FrameContainer">
                            <label className="inner" for="upload_img">
                                <div className={`addSongImg ${!uploadDataName == "" ? "bgFull" : ""}`}>
                                    {uploadDataName == "" ?
                                        <FontAwesomeIcon icon={faImage} style={{fontSize:"2.5rem"}}/>
                                        :
                                        uploadDataName
                                    }
                                </div>
                                <h3>上傳照片 (*.jpg *.png)</h3>
                                <h4>上傳可以清楚表達內容的圖片</h4>
                                {/* <p>file : {uploadDataName}</p> */}
                            </label>
                            <div className="inner">
                                {/* 標題 */}
                                <div>
                                    <h3>標題</h3>
                                    <input type="text" name="new_upload_title" required />
                                </div>
                                {/* 作者 */}
                                <div>
                                    <h3>作者</h3>
                                    <input type="text" name="new_upload_author" required />
                                </div>
                                {/* 內文 */}
                                <div>
                                    <h3>內容</h3>
                                    <textarea type="textarea" name="new_upload_inner" required />
                                </div>
                            </div>
                        </div>
                        <div className="frameBtns">
                            <div className="frameBtn" onClick={() => setCreateBtn(0)}>取消</div>
                            <button className="frameBtn" type="submit">送出</button>
                        </div>
                        <input type="file" id="upload_img" name="post_img" style={{ display: "none" }} onChange={uploadImgFile} />
                    </form>

                </div>
            </div>
            {/* <video src="/ania.mov" controls></video> */}
            <div className="setting">

            </div>
            <div className={`full_absolute ${!alertFrame ? "opNone" : ""}`}>
                <div className="alertFrame">
                    <div className="alert_icon"><FontAwesomeIcon icon={faTriangleExclamation} /></div>
                    <div className="alert_text">
                        <h1>您確定要刪除此檔案嗎？</h1>
                        <h3>( 刪除後即無法復原 )</h3>
                    </div>
                    <div className="alert_btns">
                        <div className="alert_btn" onClick={() => setAlertFrame(0)}>取消</div>
                        <div className="alert_btn" onClick={deleteUploadFile}>確定</div>
                    </div>
                </div>
            </div>

        </div>



    )
    // npm start
    // sass xx.scss output.css
}
export default IntegrationFrame;
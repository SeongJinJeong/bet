import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Drawer from "@material-ui/core/Drawer";
import moment from "moment";

const betRangePlus = [32, 64, 128, 256, 512, 1024, 2048, 100];
const betRangeMinus = [-32, -64, -128, -256, -512, -1024, -2048, -100];

const GameScene = (props) => {
  const [userData, setUserData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [logArray, setLogArray] = useState([]);

  useEffect(() => {
    const userArray = [];
    for (var i = 0; i < props.player; i++) {
      userArray.push({
        PID: i,
        userName: i + 1,
        chips: 0,
        // money: userArray[i].chips * userArray[i].chipPrice,
        chipPrice: props.chipPrice,
      });
    }
    setUserData(userArray);
  }, [props.chipPrice, props.player]);

  console.log(props);

  const handleUserData = {
    setUserName: (pid, i) => {
      let tmpArray = userData;
      tmpArray[pid].userName = i;
      setUserData(tmpArray);
    },
    setUserChips: (pid, i) => {
      let tmpArray = userData;
      tmpArray[pid].chips = tmpArray[pid].chips + i;
      setUserData(tmpArray);
    },
    setUserMoney: (pid) => {
      let tmpArray = userData;
      // tmpArray[pid].money = tmpArray[pid].money + i;
      tmpArray[pid].money = tmpArray[pid].chips * tmpArray[pid].chipPrice;
      setUserData(tmpArray);
    },
  };

  const handleLogArray = {
    add: (player, money) => {
      let tmp = logArray;
      tmp.push(
        `${moment().format(
          "ddd, h:mm:ss A"
        )} : ${player} 의 칩이 ${money} 만큼 합산됨`
      );
      setLogArray(tmp);
    },
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return userData.length > 0 ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          width: "90%",
          height: "90%",
          border: "2px solid white",
        }}>
        <button
          style={{
            position: "absolute",
            width: "8vh",
            height: "5vh",
            right: 0,
            top: 0,
          }}
          onClick={toggleDrawer}>
          See Log
        </button>
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
          <LogBox logArray={logArray} />
        </Drawer>
        {userData.map((value, index) => {
          return (
            <>
              <UserBox
                userData={value}
                handleUserData={handleUserData}
                handleLogArray={handleLogArray}
                pid={index}
              />{" "}
              {/* UserBox 컴포넌트에 해당 유저의 정보 객체로 전달, 유저 데이터 정보 수정 함수 전달 */}
            </>
          );
        })}
      </div>
    </>
  ) : (
    <p style={{ color: "white" }}>"LOADING"</p>
  );
};

const LogBox = ({ logArray }) => {
  return logArray.length > 0 ? (
    <div className="asdf">
      {logArray.map((value, index) => {
        return <LogLine log={value} />;
      })}
    </div>
  ) : (
    <p>log is empty</p>
  );
};

const LogLine = ({ log }) => {
  return <p style={{ color: "black", fontWeight: "bold" }}>{log}</p>;
};

const UserBox = ({ userData, handleUserData, handleLogArray, pid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(userData);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            backgroundColor: "yellowgreen",
            borderRadius: "10%",
            margin: "20px",
          }}
          onClick={handleModalOpen}>
          <span
            style={{
              margin: "10px",
              fontSize: "20px",
              color: "darkblue",
              fontWeight: "bolder",
            }}>
            {userData.userName}
          </span>
        </div>

        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ModalBody
            pid={pid}
            handleUserData={handleUserData}
            userData={userData}
            handleModalClose={handleModalClose}
            handleLogArray={handleLogArray}
          />
        </Modal>
      </div>
      <span
        style={{
          color: "white",
          marginTop: "-10px",
          fontSize: "20px",
          fontWeight: "bolder",
          float: "left",
        }}>
        {"₩ " + numberWithCommas(userData.chips * userData.chipPrice)}
      </span>
    </>
  );
};

const ModalBody = ({
  pid,
  handleUserData,
  userData,
  handleModalClose,
  handleLogArray,
}) => {
  console.log(pid);
  return (
    <div
      style={{
        width: "80%",
        height: "80%",
        backgroundColor: "white",
        // margin: "10% 10%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      className={pid}>
      <h1
        style={{
          fontWeight: "bolder",
          color: "red",
        }}>
        창을 껏다켜야 동기화가 됩니다.
      </h1>
      <p
        onClick={() => {
          let name = prompt("이름을 입력하세요.", userData.userName);
          if (name == null) {
            alert("Canceled!");
          } else {
            alert("Confirmed!");
            handleUserData.setUserName(pid, name);
          }
        }}>
        이름 : {userData.userName}
      </p>
      <p>보유 칩 : {userData.chips}</p>
      <p>
        소지금 : {"₩ " + numberWithCommas(userData.chips * userData.chipPrice)}
      </p>
      <button
        onClick={() => {
          let num = prompt("칩 갯수를 입력하세요.", 0);
          let mount = parseInt(num);
          if (mount !== 0 && typeof mount === "number" && !isNaN(mount)) {
            handleUserData.setUserChips(pid, mount);
            handleLogArray(userData.userName, mount);
            alert("Confirmed!");
          } else {
            alert("Fuck You!");
            return;
          }
        }}>
        칩 입력
      </button>
      <p />
      <ChipEditor
        handleUserData={handleUserData}
        userData={userData}
        handleLogArray={handleLogArray}
      />
      <button onClick={handleModalClose}>닫기</button>
    </div>
  );
};

const ChipEditor = ({ userData, handleUserData, handleLogArray }) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {betRangePlus.map((value, index) => {
          return (
            <ChipDiv
              betPrice={value}
              isPlus={true}
              handleUserData={handleUserData}
              userData={userData}
              handleLogArray={handleLogArray}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "10px",
        }}>
        {betRangeMinus.map((value, index) => {
          return (
            <ChipDiv
              betPrice={value}
              isPlus={false}
              handleUserData={handleUserData}
              userData={userData}
              handleLogArray={handleLogArray}
            />
          );
        })}
      </div>
    </>
  );
};

const ChipDiv = ({
  betPrice,
  isPlus,
  handleUserData,
  userData,
  handleLogArray,
}) => {
  const setUserChip = () => {
    const isConf = window.confirm(betPrice + " 만큼의 금액을 추가함?");
    if (isConf == true) {
      handleUserData.setUserChips(userData.PID, betPrice);
      handleLogArray.add(userData.userName, betPrice);
      // props.handleUserData.setUserMoney(props.userData.PID);
    } else {
      return;
    }
    console.log(userData);
  };
  return (
    <button
      style={{
        backgroundColor: isPlus ? "green" : "palevioletred",
        marginRight: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        border: "1px solid ",
        minWidth: "10%",
        minHeight: "10%",
        marginBottom: isPlus ? null : "10px",
      }}
      onClick={setUserChip}>
      <p style={{ color: "black", fontWeight: "bolder" }}>{betPrice}</p>
    </button>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const mapStateToProps = (state) => ({
  player: parseInt(state.settingState.data.player),
  chipPrice: parseInt(state.settingState.data.chipPrice),
});

export default connect(mapStateToProps, null)(GameScene);

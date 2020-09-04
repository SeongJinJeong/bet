import React, { useState } from "react";
import { connect } from "react-redux";

import { setSettingsData, setChipPrice } from "../redux/settingsAction";

function Settings(props) {
  const [money, setMoney] = useState(null);
  const [person, setPerson] = useState(null);

  const handleChipPriceChange = (e) => {
    setMoney(e.target.value);
  };

  const handlePersonChange = (e) => {
    setPerson(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("MONEY : " + money + " PERSON : " + person);
    if (money && person !== null) {
      props.setSettingsData(person, money);
      props.history.push("/gameScene");
    } else {
      alert("정확한 값을 입력해주세요!");
      setMoney(null);
      setPerson(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}>
      <img src="/betPage/nyang.png" style={{ width: "50%", height: "20%" }} />
      <h1 style={{ color: "greenyellow", fontSize: "400%" }}>준비하기</h1>
      <input
        type="number"
        placeholder="플레이어 수를 입력하세요"
        value={person}
        onChange={handlePersonChange}
        style={{
          width: "80%",
          height: "10%",
          borderRadius: "10px 10px 10px 10px",
          fontSize: "30px",
          textAlign: "center",
        }}
      />
      <input
        type="number"
        placeholder="칩당 금액을 입력하세요"
        value={money}
        onChange={handleChipPriceChange}
        style={{
          width: "80%",
          height: "10%",
          borderRadius: "10px 10px 10px 10px",
          fontSize: "30px",
          textAlign: "center",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10%",
          minWidth: "60px",
          minHeight: "30px",
        }}>
        시작!
      </button>
      <p />
      <p />
      <p
        style={{
          color: "White",
        }}>
        " This App only run on AOS "
      </p>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setSettingsData: (player, chipPrice) =>
    dispatch(setSettingsData(player, chipPrice)),
  setChipPrice: (price) => dispatch(setChipPrice(price)),
});

export default connect(null, mapDispatchToProps)(Settings);

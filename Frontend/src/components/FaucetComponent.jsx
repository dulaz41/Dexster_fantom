import { useState } from "react";
import "../index.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function FaucetComponent(props) {
  const [amountOfDai, setAmountOfDai] = useState(0);
  const [amountOfFtm, setAmountOfFtm] = useState(0);

  const onChangeAmountOfFtm = (e) => {
    setAmountOfFtm(e.target.value);
  };

  const onChangeAmountOfDai = (e) => {
    setAmountOfDai(e.target.value);
  };

  // Funds the account with given amount of Tokens
  async function onClickFund() {
    if (props.contract === null || !props?.activeAccount?.address) {
      alert("Connect your wallet");
      return;
    }
    if (["", "."].includes(amountOfDai) || ["", "."].includes(amountOfFtm)) {
      alert("Amount should be a valid number");
      return;
    }
    try {
      await props.contract.tx
        .faucet(
          { value: 0, gasLimit: -1 },
          amountOfDai * PRECISION,
          amountOfFtm * PRECISION
        )
        .signAndSend(
          props.activeAccount.address,
          { signer: props.signer },
          async (res) => {
            if (res.status.isFinalized) {
              await props.getHoldings();
              alert("Tx successful");
            }
          }
        );
      alert("Tx submitted");
      setAmountOfDai(0);
      setAmountOfFtm(0);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    <div className="tabBody">
      <div className="tabHeader">Faucet</div>
      <BoxTemplate
        leftHeader={"Amount of DAI"}
        right={<div className="coinWrapper">DAI</div>}
        value={amountOfDAI}
        onChange={(e) => onChangeAmountOfDai(e)}
      />
      <BoxTemplate
        leftHeader={"Amount of FTM"}
        right={<div className="coinWrapper">FTM</div>}
        value={amountOfFtm}
        onChange={(e) => onChangeAmountOfFtm(e)}
      />
      <div className="bottomDiv">
        <div className="btn" onClick={() => onClickFund()}>
          Fund
        </div>
      </div>
    </div>
  );
}

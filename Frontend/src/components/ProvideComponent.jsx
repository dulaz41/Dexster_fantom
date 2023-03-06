import { MdAdd } from "react-icons/md";
import { useState } from "react";
import "../index.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function ProvideComponent(props) {
  const [amountOfDAI, setAmountOfDAI] = useState(0);
  const [amountOfFTM, setAmountOfFTM] = useState(0);
  const [error, setError] = useState("");

  // Gets estimates of a token to be provided in the pool given the amount of other token
  const getProvideEstimate = async (token, value) => {
    if (["", "."].includes(value)) return;
    if (props.contract !== null && props?.activeAccount?.address) {
      try {
        if (token === "DAI") {
          await props.contract.query
            .getEquivalentToken2Estimate(
              props.activeAccount.address,
              { value: 0, gasLimit: -1 },
              value * PRECISION
            )
            .then((res) => (res = res.output.toHuman()))
            .then((res) => {
              console.log(res);
              if (res.Err) {
                if (res.Err.includes("ZeroLiquidity")) {
                  setError(
                    "Message: Empty pool. Set the initial conversion rate."
                  );
                } else {
                  alert(res.Err);
                  console.log(res.Err);
                }
              } else {
                setAmountOfFTM(res.Ok.replace(/,/g, "") / PRECISION);
              }
            });
        } else {
          await props.contract.query
            .getEquivalentToken1Estimate(
              props.activeAccount.address,
              { value: 0, gasLimit: -1 },
              value * PRECISION
            )
            .then((res) => (res = res.output.toHuman()))
            .then((res) => {
              if (res.Err) {
                if (res.Err.includes("ZeroLiquidity")) {
                  setError(
                    "Message: Empty pool. Set the initial conversion rate."
                  );
                } else {
                  alert(res.Err);
                  console.log(res.Err);
                }
              } else {
                setAmountOfDAI(res.Ok.replace(/,/g, "") / PRECISION);
              }
            });
        }
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const onChangeAmountOfDAI = (e) => {
    setAmountOfDAI(e.target.value);
    getProvideEstimate("DAI", e.target.value);
  };

  const onChangeAmountOfFTM = (e) => {
    setAmountOfFTM(e.target.value);
    getProvideEstimate("FTM", e.target.value);
  };

  // Adds liquidity to the pool
  const provide = async () => {
    if (["", "."].includes(amountOfDAI) || ["", "."].includes(amountOfFTM)) {
      alert("Amount should be a valid number");
      return;
    }
    if (props.contract === null || !props?.activeAccount?.address) {
      alert("Connect your wallet");
      return;
    } else {
      try {
        await props.contract.query
          .provide(
            props.activeAccount.address,
            { value: 0, gasLimit: -1 },
            amountOfDAI * PRECISION,
            amountOfFTM * PRECISION
          )
          .then((res) => {
            if (res.result.toHuman().Err?.Module?.message)
              throw new Error(res.result.toHuman().Err.Module.message);
            else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              try {
                await props.contract.tx
                  .provide(
                    { value: 0, gasLimit: -1 },
                    amountOfDAI * PRECISION,
                    amountOfFTM * PRECISION
                  )
                  .signAndSend(
                    props.activeAccount.address,
                    { signer: props.signer },
                    async (res) => {
                      if (res.status.isFinalized) {
                        await props.getHoldings();
                        alert("Tx successful");
                        setError("");
                      }
                    }
                  );
                setAmountOfDAI(0);
                setAmountOfFTM(0);
                alert("Tx submitted");
              } catch (err) {
                alert(err);
                console.log(err);
              }
            } else {
              console.log(res.Err);
              alert(res.Err);
            }
          });
      } catch (err) {
        alert(err);
        console.log("Couldn't provide :- ", err);
      }
    }
  };

  return (
    <div className="tabBody">
      <div className="tabHeader">Provide</div>
      <BoxTemplate
        leftHeader={"Amount of DAI"}
        value={amountOfDAI}
        showBalance={true}
        balance={props.holding["amountOfDAI"]}
        onChange={(e) => onChangeAmountOfDAI(e)}
      />
      <div className="alignCenter">
        <div className="tabIcon middleIcon" tabIndex={0}>
          <MdAdd className="plusIcon" />
        </div>
      </div>
      <BoxTemplate
        leftHeader={"Amount of FTM"}
        value={amountOfFTM}
        showBalance={true}
        balance={props.holding["amountOfFTM"]}
        onChange={(e) => onChangeAmountOfFTM(e)}
      />
      <div className="error">{error}</div>
      <div className="bottomDiv">
        <div className="btn" onClick={() => provide()}>
          Provide
        </div>
      </div>
    </div>
  );
}

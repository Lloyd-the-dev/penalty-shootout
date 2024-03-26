import { useState, useEffect } from "react"


function Homepage(){
    const [stake, setStake] = useState(null)
    const[hasStaked, setHasStaked] = useState(false)
    const[cashout, setCashout] = useState(null)
    const[cashoutDisplaying, setCashoutDisplaying] = useState(false)
    const[goaliePosition, setGoaliePosition] = useState(null)
    const[balance, setBalance] = useState(1000)
    const [odds, setOdds] = useState([
        { value: 1, display: "1x" },
        { value: 2, display: "2x" },
        { value: 3, display: "3x" },
        { value: 4, display: "4x" },
        { value: 1.5, display: "1.5x" },
        { value: 0.5, display: "0.5x" },
        { value: 2.5, display: "2.5x" },
        { value: 2.2, display: "2.2x" },
        { value: 1, display: "1x" },
        { value: 3.5, display: "3.5x" },
        { value: 6, display: "6x" },
        { value: 1.01, display: "1.01x" }
    ])



    const handleStake = (e) => {
        const stakeAmount = parseFloat(e.target.value);
        
        if (!isNaN(stakeAmount)) {
            
            if (stakeAmount <= balance) {
                setStake(stakeAmount)
                
            } else {
                alert("Insufficient balance")
            }
        }
        
    }
 
  
    const handleOddsClick = (index) => {
        const goaliePosition = Math.floor(Math.random() * 12)
        if(index === goaliePosition){
            setCashout(0)
          
        } else{
            setCashout(stake * odds[index].value)
        
        }
        setCashoutDisplaying(!cashoutDisplaying)
        
    }
    const openGrid = () => {
        setHasStaked(!hasStaked)
    }
    const closeBtn = () => {
        setCashoutDisplaying(false)
    }

    return(
        <div>
            <h1 className="text-white text-3xl text-right m-8 font-bold">Balance: {balance}</h1>
            <div className="p-16 flex flex-col items-center m-8">
                <h1 className="text-white text-3xl font-bold">PapaMax's PK Shoout-out!</h1>
                <form className="m-8 flex flex-col">
                        <input type="number" placeholder="₦1,000,000.00" value={stake} onChange={handleStake} required className="p-4 rounded-lg bg-transparent border text-white"/>
                        <button className="bg-green-500 mt-4 rounded-lg p-2" type="button" onClick={openGrid}>Stake</button>
                </form>
                <div className={`border-t-8 border-x-8 p-8  ${hasStaked ? "block" : "hidden"} ${cashoutDisplaying ? "blur-lg" : ""}`}>
                    <h4 className="text-center text-white mb-4 font-bold tracking-widest text-2xl">{stake}</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-8">
                            {odds.map((odd, index) => (
                                <input
                                    key={index}
                                    value={odd.display}
                                    readOnly
                                    className="sm:py-12 sm:px-2 py-4 px-2 cursor-pointer rounded-lg text-center hover:bg-gray-400 transition-all ease-in-out duration-300"
                                    onClick={() => handleOddsClick(index)}
                                />
                            ))}
                        </div> 
                </div>
                <div className={`bg-white rounded-lg p-8 sm:w-1/5 sm:ml-32 -mt-64 absolute bottom-32  flex flex-col items-start ${cashoutDisplaying ? "block" : "hidden"}`}>
                        <h4 className="font-bold text-black">{cashout ? `Congratulations, you won ${cashout} 🥳` : `aww🥺, Goalkeeper Save`}</h4>
                        <button className="bg-red-600 mt-4 py-2 px-8 rounded-lg text-white font-bold" onClick={closeBtn}>Close</button>
                    </div>
            </div>
        </div>
    )
}
export default Homepage
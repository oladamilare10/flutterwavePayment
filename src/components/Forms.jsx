import React from 'react';
import Logo from '../assets/favicon.png';
import useBalance from './useBalance';

let Naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN'
})


const Forms = ({ userInfo, userId }) => {

  const [amount, setAmount] = React.useState(0)
  const [message, setMessage] = React.useState({
    state: false, 
    status: null, 
    message: null
  })
  const dateData = new Date();

  const generateTransactionRef = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `aba_tx_ref_${result}`;
  };

  const handleCheckValidAmount = ()=> {
    if(amount === '' || amount === 0) {
      setMessage({state: true, status: 'error', message: 'you did not specify any amount yet...'})
    } else
    if(amount < 500) {
      setMessage({state: true, status: 'error', message: "minimum deposit is N500..."})
    }else{
      setMessage({state: false, status: 'success', message: ""})
    }
  }
  const handlePayment = ()=> {
    if(message.status === 'success') {
      makePayment()
    }else{
      setMessage({state: true, status: 'error', message: "make sure field are valid..."})
    }
  }
    
  const {balance} = useBalance(userId)
  let newBal = 0
  if (balance){
    const addBal = (a, b) => a + b;
     newBal = addBal(Number(balance.w_balance), Number(amount));
  }

function makePayment() {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
    tx_ref: generateTransactionRef(12),
    amount: amount,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    meta: {
      source: "docs-inline-test",
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: userInfo.email,
      phone_number: userInfo.phone,
      name: userInfo.f_name +' ' + userInfo.l_name,
    },
    customizations: {
      title: "All Bills Arena",
      description: "All Bills Arena Wallet Refill",
      logo: "https://pay.allbillsarena.com/assets/favicon-DkPsxn-1.png",
    },
    callback: function(payment) {
      if(payment.status === "completed"){
        handleWalletUpdate(payment.tx_ref)
      }else{
        console.log("could not complete Payment")
      }
      modal.close();
    },
  });
}

const url = 'https://api.website.com/update_wallet.php'
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    

const handleWalletUpdate = (value)=>{
  const body = JSON.stringify(
    {
      user_id: userId,
      new_balance: newBal,
      t_amount: amount,
      desc: "Wallet TopUp",
      t_id: value,
      date: dateData
    }
  )
  fetch(url, {
    method: "POST",
    header: header,
    body: body
  })
  .then(res => {
    return res.json();
  })
  .then(msg => {
    setBalMsg(msg.result.data)
  })
}

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto fill-green-500 overlay"
            src={Logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Fund Your All Bills Wallet
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="amount" className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                Enter Amount
                <div>{Naira.format(amount)}</div>
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  type="number"
                  onBlur={handleCheckValidAmount}
                  placeholder='Enter Amount'
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm outline-none sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handlePayment}
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Pay {amount > 0 && Naira.format(amount)}
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            {message.state && 
              message.status === 'error' ? 
              <div className=' text-red-600'>{message.message}</div>
              :
              <div>{message.message}</div>
            }
          </p>
        </div>
      </div>
    </>
  )
}


export default Forms
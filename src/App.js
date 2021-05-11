import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
function loadScript(src){
  return new Promise(resolve =>{

  
  const script = document.createElement('script')
  script.src = src
  script.onload = ()=>{ resolve(true);}
  script.onerror = () =>{resolve(false);}
  document.body.appendChild(script);
})
}
const __DEV__ = document.domain === 'localhost'
function App() {
  const [name,setName] = useState('Disha Bahal');
   async function displayRazorpay(){
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
    if(!res){
      alert('Razorpay SDK failed to Load!Are you Online?')
      return
    }

    const data = await fetch('http://localhost:1337/razorpay',{method:'POST'}).then((t)=>t.json())
    console.log(data)


    const options = {
    key: __DEV__?'rzp_test_n5dHo3lkFh2iLN' : 'Production', // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      order_id:data.id,
      name: "Donation",
      description: "Thankyou!!",
      image: "http://localhost:1337/logo.svg",
     // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      prefill: {
          name}
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate 5 Rupees
        </a>
      </header>
    </div>
  );
}

export default App;

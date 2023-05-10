//helper function for getting 
function getValue(id) {
    var value = document.getElementById(id).value;
    if (value == "" || isNaN(value)) {
      return 0;
    } else {
      return parseFloat(value);
    }
  }
  
  function calculate() {
  
    // The price of about 3oz of gold
    var amt_nisab = 5301; 
    var amt_home = getValue("amount_home");
    var amt_bank = getValue("amount_bank");
    var amt_shares = getValue("amount_shares");
    var amt_merchandise = getValue("amount_merchandise");
    var amt_gold = getValue("amount_gold");
    var amt_property = getValue("amount_property");
    var amt_other = getValue("amount_other");
    var amt_debts = getValue("amount_debts");
    var amt_expenses = getValue("amount_expenses");
    
    // The sum of all of your different assets that you've had for the last
    // lunar year
    var amt_assets_gross = amt_home + amt_bank + amt_shares + amt_merchandise + amt_gold + amt_property + amt_other;
    
    // Gross assets minus the liabilities you have. Again these are typically
    // immediate liabilities. Not the totality of a large loan like a mortgage
    var amt_assets_net = amt_assets_gross - amt_debts - amt_expenses; 
    var amt_eligable = 0; 
  
    // If this net amount is bigger than the nisab, then it's eligible
    // to have Zakat assessed against it
    if (amt_assets_net > amt_nisab ); {
      amt_eligable = Math.ceil(amt_assets_net);
    }
  
    // Zakat is 2.5% of ones eligible wealth if it above 
    // Nisab
    var amt_zakat = Math.ceil(amt_eligable * .025);
  
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  
    // Write the values back for the user
    document.getElementById("amount_eligable").value = formatter.format(amt_eligable);
    document.getElementById("amount_zakat").value = formatter.format(amt_zakat);
  
    // If the user is eligible to contribute Zakat, set up a Funraise donation
    // button with their Zakat amount. Else, just ask them for a $50 one time donation
    if(amt_zakat > 0) {
      document.getElementById("donate_button").innerText = formatter.format(amt_zakat) + ' Zakat';
      document.getElementById("donate_button").dataset.amount = amt_zakat;
    } else {
      document.getElementById("donate_button").text = 'Donate Now';
      document.getElementById("donate_button").dataset.amount = 50;
    }
  
  }
  
  // All of your typical Funraise giving form setup stuff below
  (function(f,u,n,r,a,i,s,e){var data={window:window,document:document,tag:"script",data:"funraise",orgId:f,uri:u,common:n,client:r,script:a};var scripts;var funraiseScript;data.window[data.data]=data.window[data.data]||[];if(data.window[data.data].scriptIsLoading||data.window[data.data].scriptIsLoaded)return;data.window[data.data].loading=true;data.window[data.data].push("init",data);scripts=data.document.getElementsByTagName(data.tag)[0];funraiseScript=data.document.createElement(data.tag);funraiseScript.async=true;funraiseScript.src=data.uri+data.common+data.script+"?orgId="+data.orgId;scripts.parentNode.insertBefore(funraiseScript,scripts)})('1e78fec4-8fd0-4a3e-b82b-866c29012531','https://assets-dev.funraise.io','/widget/common/2.0','/widget/client','/inject-form.js');
  
  window.funraise.push('create', { form: 2426 });
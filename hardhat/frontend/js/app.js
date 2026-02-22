let lastTxHash = null;

document.getElementById('connectWalletBtn').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert('Connected: ' + accounts[0]);
    } catch (error) {
      alert('User rejected the connection');
    }
  } else {
    alert('MetaMask is not installed. Please install it to use this feature.');
  }
});

document.getElementById('fundEthBtn').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    // const sender = document.getElementById('senderAddress').value; // No longer used for validation
    const recipient = document.getElementById('recipientAddress').value;
    const amountInEth = document.getElementById('ethAmount').value;

    // if (!sender || !/^0x[a-fA-F0-9]{40}$/.test(sender)) {
    //   alert('Please enter a valid sender Ethereum address.');
    //   return;
    // }
    if (!recipient || !/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      alert('Please enter a valid recipient Ethereum address.');
      return;
    }
    if (!amountInEth || isNaN(amountInEth) || Number(amountInEth) <= 0) {
      alert('Please enter a valid amount of ETH.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const from = accounts[0];

      const tx = {
        from,
        to: recipient,
        value: (BigInt(parseFloat(amountInEth) * 1e18)).toString(16),
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      lastTxHash = txHash; // Store the hash
      alert('Transaction sent! Hash: ' + txHash);
    } catch (error) {
      alert('Transaction failed: ' + (error.message || error));
    }
  } else {
    alert('MetaMask is not installed. Please install it to use this feature.');
  }
});

document.getElementById('showTxBtn').addEventListener('click', async () => {
  const txInfoDiv = document.getElementById('txInfo');
  if (lastTxHash) {
    txInfoDiv.textContent = 'Loading transaction details...';
    try {
      const tx = await window.ethereum.request({
        method: 'eth_getTransactionByHash',
        params: [lastTxHash],
      });
      if (tx) {
        // Mask the hash and to address for privacy
        const maskHash = (hash) => hash.slice(0, 6) + '****' + hash.slice(-4);
        const maskAddress = (addr) => addr.slice(0, 6) + '****' + addr.slice(-4);
        txInfoDiv.innerHTML = `
          <strong>Transaction Details:</strong><br>
          <b>Hash:</b> ${maskHash(tx.hash)}<br>
          <b>To:</b> ${maskAddress(tx.to)}<br>
          <b>Value:</b> ${parseInt(tx.value, 16) / 1e18} ETH<br>
          <b>Nonce:</b> ${parseInt(tx.nonce, 16)}<br>
          <b>Gas:</b> ${parseInt(tx.gas, 16)}<br>
          <b>Gas Price:</b> ${parseInt(tx.gasPrice, 16) / 1e9} Gwei<br>
        `;
      } else {
        txInfoDiv.textContent = 'Transaction details not found.';
      }
    } catch (e) {
      txInfoDiv.textContent = 'Error fetching transaction details.';
    }
  } else {
    txInfoDiv.textContent = 'No transaction has been sent yet.';
  }
});
export default function getProvider() {
  let provider;
  if (window) {
    if (window?.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    console.log({ provider });
  }
  return provider;
}

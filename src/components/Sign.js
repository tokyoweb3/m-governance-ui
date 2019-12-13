import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';

// const crypto = ["/lib/webcrypto-liner.shim.js", ]
const urls = ["https://peculiarventures.github.io/pv-webcrypto-tests/src/asmcrypto.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js", "https://cdn.rawgit.com/dcodeIO/protobuf.js/6.8.0/dist/protobuf.js", "https://peculiarventures.github.io/webcrypto-local/webcrypto-socket.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/webcrypto-liner.min.js", "https://cdn.rawgit.com/jakearchibald/idb/97e4e878/lib/idb.js"];
// const helpers = ["/lib/pvtsutils.js", "/lib/asn1.min.js", "/lib/pki.min.js", "/lib/helper.js"];

export default function Sign () {
  const [signature, setSignature] = useState({value: ""});
  const [sign, setSign] = useState({ disabled:false });
  const [verification, setVerification] = useState({textContent: ""});
  const initialState = {

  };
  const [formState, setFormState] = useState(initialState);
  const [providers, setProviders] = useState([]);
  const [certificates, setCertificates ] = useState([]);

  
  const onChange = (_, data) => {
    setFormState(FormState => {
      return {
        ...FormState,
        [data.state]: data.value
      };
    });
  }

  const handleSign = async () => {
    console.log("handle sign");
  };

  useEffect(() => { 
    for (const id in urls) {
      let tag = document.createElement('script');
      tag.async = false;
      tag.src = urls[id];
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    }
  },[]); 

  useEffect(() => {
    window.WebcryptoSocket && main();
  }, [window.WebcryptoSocket])

  // const handleSign = async () => {
  //   try {
  //     // Clear fields
  //     setSignature(prev => {return{...prev, value: ""}});
  //     setSignatusetVerification(prev => {return{...prev, textContent: ""}});

  //     const provider = await ws.getCrypto($("providers").value);
  //     const key = await GetCertificateKey("private", provider, $("certificates").value);
  //     if (!key) {
  //       throw new Error("Certificate doesn't have private key");
  //     }
  //     const alg = {
  //       name: key.algorithm.name,
  //       hash: "SHA-256",
  //     };
  //     const message = pvtsutils.Convert.FromUtf8String($("message").value);
  //     const signature = await provider.subtle.sign(alg, key, message);
  //     $signature.value = pvtsutils.Convert.ToHex(signature);
  //     const publicKey = await GetCertificateKey("public", provider, $("certificates").value);
  //     const ok = await provider.subtle.verify(alg, publicKey, signature, message);
  //     $verification.textContent = ok.toString();
  //   }
  //   finally {
  //     $sign.disabled = false;
  //   }
  // }

  return(
    <>
      <Form>
        <Form.Field>
          <Dropdown
              placeholder='Providers'
              fluid
              label="Providers"
              onChange={onChange}
              search
              selection
              state='providers'
              options={providers}
          />
          </Form.Field>
          <Form.Field>
          <Dropdown
              label='Certificates'
              fluid
              onChange={onChange}
              state='certificates'
              placeholder="certificates"
              selection
              options={certificates}
          />
          </Form.Field>
          <Form.Field>
          <Input
              label='Message'
              fluid
              onChange={onChange}
              state='message'
              type='string'
          />
          </Form.Field>
          Verification: 
          <Form.Field>
          <Button
              onClick={handleSign}
              primary
              type='submit'
          >
              Sign
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

function load(url) {
  let tag = document.createElement('script');
    tag.async = false;
    tag.src = url;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
}

async function main() {
  const WebcryptoSocket = window.WebcryptoSocket;
  let ws = new WebcryptoSocket.SocketProvider();
  // let ws = new WebcryptoSocket.SocketProvider({
  //   storage: await WebcryptoSocket.BrowserStorage.create(),
  // });

  ws.connect("127.0.0.1:31337")
    .on("error", function (e) {
      console.error(e);
    })
    .on("listening", async (e) => {
      // Check if end-to-end session is approved
      if (! await ws.isLoggedIn()) {
        const pin = await ws.challenge();
        // show PIN
        setTimeout(() => {
          alert("2key session PIN:" + pin);
        }, 100)
        // ask to approve session
        await ws.login();
      }

      ws.info()
        .then(function(info) {
            // print info about each provider
            for (var i=0; i < info.providers.length; i++) {
                var provider = info.providers[i];
                console.log(provider);
            }

            // get first provider
            return ws.getCrypto(provider.id);
        })
        .then(function(crypto){

          console.log(crypto);

        });
      // await FillData();
      // ws.cardReader
      //   .on("insert", updateProvider)
      //   .on("remove", updateProvider);
    });
}

// async function updateProvider() {
//   const $providers = document.getElementById("providers");
//   $providers.innerHTML = "";
//   await FillData();
// }
// async function FillData() {
//   await FillProviderSelect($("providers"));
//   const providerID = $("providers").value;
//   if (providerID) {
//     const crypto = await ws.getCrypto(providerID);
//     fillCertificateSelect(crypto, $("certificates"))
//   }
// }
// $("providers").onchange = async () => {
//   const providerID = $("providers").value;
//   const provider = await ws.getCrypto(providerID)
//   fillCertificateSelect(provider, $("certificates"))
// }
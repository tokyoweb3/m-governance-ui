const types ={
  "ReferenceIndex": "u64",
  "data": "Vec<u8>",
  "Vote": {
    "id": "u64",
    "vote_type": "u8",
    "approved": "bool",
    "creator": "AccountId",
    "when": "BlockNumber",
    "vote_ends": "BlockNumber",
    "concluded": "bool"
  },
  "LockInfo": {
    "deposit": "BalanceOf",
    "duration": "BlockNumber",
    "until": "BlockNumber"
  },
  "Ballot": {
    "_enum": [
      "Aye",
      "Nay"
    ]
  },
  "Certification": {
    "pubkey": "Hash",
    "cert": "Hash",
    "encrypted_account": "Hash"
  }
}

export default types;